import diagnostic from '../../../assessment/diagnostic.json';
import { buildConversationMessages } from '../prompts/conversation';
import { buildFinalEvaluationMessages } from '../prompts/evaluation';
import { buildProgressEvaluationMessages } from '../prompts/progress';
import type { ModelProvider } from '../llm/model-provider';
import {
  getAssessmentDimension,
  isEvaluationDimension,
  type EvaluationDimension,
} from './dimensions';
import type {
  AssessmentEvaluationRequest,
  AssessmentEvaluationResponse,
  AssessmentMessageRequest,
  AssessmentMessageResponse,
  AssessmentProgressRequest,
  AssessmentProgressResponse,
  DiagnosticScenario,
  DimensionEvaluation,
  DimensionObservability,
} from './types';

const scenarios = diagnostic.scenarios as DiagnosticScenario[];
const MAX_LEARNER_TURNS = 6;
const CONVERSATION_MAX_TOKENS = 1024;
const PROGRESS_MAX_TOKENS = 256;
const EVALUATION_MAX_TOKENS = 1024;

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

function hasExpectedDimensions(
  dimensions: Array<{ dimension?: unknown }>,
  focus: EvaluationDimension[],
): boolean {
  return dimensions.length === focus.length &&
    dimensions.every(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        typeof entry.dimension === 'string' &&
        isEvaluationDimension(entry.dimension) &&
        focus.includes(entry.dimension),
    ) &&
    new Set(dimensions.map((entry) => entry.dimension)).size === focus.length;
}

function parseProgressResponse(
  value: unknown,
  focus: EvaluationDimension[],
): DimensionObservability[] {
  const parsed = value as { dimensions?: unknown } | null;

  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.dimensions)) {
    throw new Error('Progress evaluator returned an invalid response.');
  }

  const dimensions = parsed.dimensions as Array<{
    dimension?: unknown;
    observability?: unknown;
  }>;

  if (
    !hasExpectedDimensions(dimensions, focus) ||
    !dimensions.every(
      (entry) =>
        typeof entry.observability === 'number' &&
        entry.observability >= 0 &&
        entry.observability <= 1,
    )
  ) {
    throw new Error('Progress evaluator returned invalid dimension observability.');
  }

  return dimensions as DimensionObservability[];
}

function parseEvaluationResponse(
  value: unknown,
  focus: EvaluationDimension[],
): DimensionEvaluation[] {
  const parsed = value as { dimensions?: unknown } | null;

  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.dimensions)) {
    throw new Error('Final evaluator returned an invalid response.');
  }

  const dimensions = parsed.dimensions as Array<{
    dimension?: unknown;
    score?: unknown;
    evidence?: unknown;
    reason?: unknown;
  }>;

  if (
    !hasExpectedDimensions(dimensions, focus) ||
    !dimensions.every(
      (entry) =>
        Number.isInteger(entry.score) &&
        typeof entry.score === 'number' &&
        entry.score >= 0 &&
        entry.score <= 3 &&
        Array.isArray(entry.evidence) &&
        entry.evidence.length > 0 &&
        entry.evidence.every(
          (evidence) => typeof evidence === 'string' && evidence.trim().length > 0,
        ) &&
        typeof entry.reason === 'string' &&
        entry.reason.trim().length > 0,
    )
  ) {
    throw new Error('Final evaluator returned invalid dimension scores.');
  }

  return dimensions as DimensionEvaluation[];
}

function hasSufficientEvidence(
  dimensions: DimensionObservability[],
): boolean {
  return dimensions.length > 0 && dimensions.every(
    ({ dimension, observability }) =>
      observability >= getAssessmentDimension(dimension).minObservability,
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

  async evaluate(
    request: AssessmentEvaluationRequest,
  ): Promise<AssessmentEvaluationResponse> {
    const scenario = getScenario(request.scenarioId);
    const focus = scenario.focus ?? [];
    const messages = buildFinalEvaluationMessages(scenario, request.transcript);
    const response = await this.modelProvider.generate({
      messages,
      maxTokens: EVALUATION_MAX_TOKENS,
      responseFormat: { type: 'json_object' },
    });

    const evaluation = response.structured !== undefined
      ? response.structured
      : JSON.parse(response.content);

    return {
      dimensions: parseEvaluationResponse(evaluation, focus),
    };
  }
}
