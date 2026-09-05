import diagnostic from '../../../assessment/diagnostic.json';
import { buildConversationMessages } from '../prompts/conversation';
import { buildProgressEvaluationMessages } from '../prompts/progress';
import type { ModelProvider } from '../llm/model-provider';
import type {
  AssessmentMessageRequest,
  AssessmentMessageResponse,
  AssessmentProgressRequest,
  AssessmentProgressResponse,
  DiagnosticScenario,
} from './types';

const scenarios = diagnostic.scenarios as DiagnosticScenario[];
const MAX_LEARNER_TURNS = 6;
const CONVERSATION_MAX_TOKENS = 1024;
const PROGRESS_MAX_TOKENS = 256;

function getScenario(scenarioId: string): DiagnosticScenario {
  const scenario = scenarios.find((candidate) => candidate.id === scenarioId);

  if (!scenario) {
    throw new Error(`Unknown assessment scenario: ${scenarioId}`);
  }

  return scenario;
}

function getLearnerTurnCount(
  scenario: DiagnosticScenario,
  transcript: AssessmentProgressRequest['transcript'],
): number {
  const initialUserTurns = scenario.initialTranscript?.filter(
    (turn) => turn.role === 'user',
  ).length ?? 0;

  return Math.max(
    0,
    transcript.filter((turn) => turn.role === 'user').length - initialUserTurns,
  );
}

function parseProgressResponse(content: string): Omit<AssessmentProgressResponse, 'maxTurnsReached'> {
  const parsed = JSON.parse(content) as Partial<AssessmentProgressResponse>;

  if (
    typeof parsed.evidenceSufficient !== 'boolean' ||
    !Array.isArray(parsed.coveredDimensions) ||
    !parsed.coveredDimensions.every((dimension) => typeof dimension === 'string') ||
    !Array.isArray(parsed.missingDimensions) ||
    !parsed.missingDimensions.every((dimension) => typeof dimension === 'string') ||
    typeof parsed.confidence !== 'number' ||
    parsed.confidence < 0 ||
    parsed.confidence > 1
  ) {
    throw new Error('Progress evaluator returned an invalid response.');
  }

  return {
    evidenceSufficient: parsed.evidenceSufficient,
    coveredDimensions: parsed.coveredDimensions,
    missingDimensions: parsed.missingDimensions,
    confidence: parsed.confidence,
  };
}

export class AssessmentService {
  constructor(private readonly modelProvider: ModelProvider) {}

  async continueConversation(
    request: AssessmentMessageRequest,
  ): Promise<AssessmentMessageResponse> {
    const scenario = getScenario(request.scenarioId);
    const messages = buildConversationMessages(scenario, request.transcript);
    const response = await this.modelProvider.generate({
      messages,
      maxTokens: CONVERSATION_MAX_TOKENS,
    });

    return {
      turn: {
        role: 'assistant',
        content: response.content,
      },
    };
  }

  async evaluateProgress(
    request: AssessmentProgressRequest,
  ): Promise<AssessmentProgressResponse> {
    const scenario = getScenario(request.scenarioId);
    const learnerTurnCount = getLearnerTurnCount(scenario, request.transcript);
    const maxTurnsReached = learnerTurnCount >= MAX_LEARNER_TURNS;
    const messages = buildProgressEvaluationMessages(scenario, request.transcript);
    const response = await this.modelProvider.generate({
      messages,
      maxTokens: PROGRESS_MAX_TOKENS,
      responseFormat: { type: 'json_object' },
    });

    return {
      ...parseProgressResponse(response.content),
      maxTurnsReached,
    };
  }
}
