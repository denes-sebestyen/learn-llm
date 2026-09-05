import { AssessmentService } from '../src/backend/assessment/assessment-service';
import type {
  AssessmentMessageRequest,
  AssessmentProgressRequest,
} from '../src/backend/assessment/types';
import {
  CloudflareAIProvider,
  type WorkersAI,
} from '../src/backend/llm/cloudflare-ai-provider';

type AssetBinding = {
  fetch(request: Request): Promise<Response>;
};

type Env = {
  AI: WorkersAI;
  ASSETS: AssetBinding;
};

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

function logError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`${context}: ${error.name}: ${error.message}`, {
      stack: error.stack,
      cause: error.cause,
    });
    return;
  }

  console.error(`${context}: ${String(error)}`);
}

function isConversationTurn(value: unknown): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const turn = value as Record<string, unknown>;

  return (
    typeof turn.id === 'number' &&
    (turn.role === 'user' || turn.role === 'assistant') &&
    typeof turn.content === 'string' &&
    turn.content.trim().length > 0
  );
}

function isAssessmentRequest(
  value: unknown,
): value is AssessmentMessageRequest | AssessmentProgressRequest {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const request = value as Record<string, unknown>;

  return (
    typeof request.scenarioId === 'string' &&
    Array.isArray(request.transcript) &&
    request.transcript.length > 0 &&
    request.transcript.every(isConversationTurn)
  );
}

async function readAssessmentRequest(request: Request): Promise<
  | { body: AssessmentMessageRequest | AssessmentProgressRequest }
  | { response: Response }
> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { response: json({ error: 'Invalid JSON request body.' }, 400) };
  }

  if (!isAssessmentRequest(body)) {
    return { response: json({ error: 'Invalid assessment request.' }, 400) };
  }

  return { body };
}

async function handleAssessmentMessage(
  request: Request,
  env: Env,
): Promise<Response> {
  const parsed = await readAssessmentRequest(request);

  if ('response' in parsed) {
    return parsed.response;
  }

  try {
    const provider = new CloudflareAIProvider(env.AI);
    const service = new AssessmentService(provider);
    const response = await service.continueConversation(parsed.body);

    return json(response);
  } catch (error) {
    logError('Assessment conversation failed', error);
    return json({ error: 'Could not continue the assessment conversation.' }, 500);
  }
}

async function handleAssessmentProgress(
  request: Request,
  env: Env,
): Promise<Response> {
  const parsed = await readAssessmentRequest(request);

  if ('response' in parsed) {
    return parsed.response;
  }

  try {
    const provider = new CloudflareAIProvider(env.AI);
    const service = new AssessmentService(provider);
    const response = await service.evaluateProgress(parsed.body);

    return json(response);
  } catch (error) {
    logError('Assessment progress evaluation failed', error);
    return json({ error: 'Could not evaluate assessment progress.' }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (
      url.pathname === '/api/assessment/message' ||
      url.pathname === '/api/assessment/progress'
    ) {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed.' }, 405);
      }

      return url.pathname === '/api/assessment/message'
        ? handleAssessmentMessage(request, env)
        : handleAssessmentProgress(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
