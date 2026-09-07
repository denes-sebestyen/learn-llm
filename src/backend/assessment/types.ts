import type { EvaluationDimension } from './dimensions';

export type TurnRole = 'user' | 'assistant';

export type ConversationTurn = {
  id: number;
  role: TurnRole;
  content: string;
};

export type AssessmentMessageRequest = {
  scenarioId: string;
  transcript: ConversationTurn[];
};

export type AssessmentMessageResponse = {
  turn: {
    role: 'assistant';
    content: string;
  };
};

export type AssessmentProgressRequest = {
  scenarioId: string;
  transcript: ConversationTurn[];
};

export type DimensionObservability = {
  dimension: EvaluationDimension;
  observability: number;
};

export type AssessmentProgressResponse = {
  evidenceSufficient: boolean;
  dimensions: DimensionObservability[];
  maxTurnsReached: boolean;
};

export type ScenarioEvaluationPlan = {
  targetBehaviors: string[];
  sufficientWhen: string;
};

export type DiagnosticScenario = {
  id: string;
  title: string;
  prompt: string;
  conversationSetup: string;
  initialTranscript?: ConversationTurn[];
  modules: number[];
  focus?: EvaluationDimension[];
  evaluator_notes?: string[];
  evaluationPlan?: ScenarioEvaluationPlan;
};
