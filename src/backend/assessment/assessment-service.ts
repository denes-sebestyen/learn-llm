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
  DimensionObservability,
} from './types';

const scenarios = diagnostic.scenarios as DiagnosticScenario[];
const MAX_LEARNER_TURNS = 6;
const MIN_OBSERVABILITY: Record<string, number> = {
  recognition: 0.75,
  risk_assessment: 0.75,
  verification_strategy: 0.75,
  llm_usage_strategy: 0.75,
};
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

function parseProgressResponse(
  value: unknown,
  focus: string[],
): DimensionObservability[] {
  const parsed = value as { dimensions?: unknown } | null;

  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.dimensions)) {
    throw new Error('Progress evaluator returned an invalid response.');
  }

  const dimensions = parsed.dimensions as Partial<DimensionObservability>[];

  if (
    dimensions.length !== focus.length ||
    !dimensions.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        typeof entry.dimension === 'string' &&
        focus.includes(entry.dimension) &&
        typeof entry.observability === 'number' &&
        entry.observability >= 0 &&
        entry.observability <= 1,
    ) ||
    new Set(dimensions.map((entry) => entry.dimension)).size !== focus.length
  ) {
    throw new Error('Progress evaluator returned invalid dimension observability.');
  }

  return dimensions as DimensionObservability[];
}

function hasSufficientEvidence(
  dimensions: DimensionObservability[],
): boolean {
  return dimensions.length > 0 && dimensions.every(
    ({ dimension, observability }) => {
      const minimum = MIN_OBSERVABILITY[dimension];

      if (minimum === undefined) {
        throw new Error(`Missing observability threshold for dimension: ${dimension}`);
      }

      return observability >= minimum;
    },
  );
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

    if (response.content === undefined) {
      throw new Error('Conversation model returned a structured response.');
    }

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
    const focus = scenario.focus ?? [];
    const learnerTurnCount = getLearnerTurnCount(scenario, request.transcript);
    const maxTurnsReached = learnerTurnCount >= MAX_LEARNER_TURNS;
    const messages = buildProgressEvaluationMessages(scenario, request.transcript);
    const response = await this.modelProvider.generate({
      messages,
      maxTokens: PROGRESS_MAX_TOKENS,
      responseFormat: { type: 'json_object' },
    });

    const progress = response.structured !== undefined
      ? response.structured
      : JSON.parse(response.content);
    const dimensions = parseProgressResponse(progress, focus);

    return {
      evidenceSufficient: hasSufficientEvidence(dimensions),
      dimensions,
      maxTurnsReached,
    };
  }
}
