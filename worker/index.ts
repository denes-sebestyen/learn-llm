import { AssessmentService } from '../src/backend/assessment/assessment-service';
import type { AssessmentMessageRequest } from '../src/backend/assessment/types';
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

function isAssessmentMessageRequest(
  value: unknown,
): value is AssessmentMessageRequest {
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

async function handleAssessmentMessage(
  request: Request,
  env: Env,
): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON request body.' }, 400);
  }

  if (!isAssessmentMessageRequest(body)) {
    return json({ error: 'Invalid assessment message request.' }, 400);
  }

  try {
    const provider = new CloudflareAIProvider(env.AI);
    const service = new AssessmentService(provider);
    const response = await service.continueConversation(body);

    return json(response);
  } catch (error) {
    console.error('Assessment conversation failed.', error);
    return json({ error: 'Could not continue the assessment conversation.' }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/assessment/message') {
      if (request.method !== 'POST') {
        return json({ error: 'Method not allowed.' }, 405);
      }

      return handleAssessmentMessage(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
