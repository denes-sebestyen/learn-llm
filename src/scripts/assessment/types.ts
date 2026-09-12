export type Scenario = {
  id: string;
  title: string;
  prompt: string;
  initialTranscript?: Turn[];
  modules: number[];
};

export type TurnRole = 'user' | 'assistant';

export type Turn = {
  id: number;
  role: TurnRole;
  content: string;
};

export type AssessmentMessageResponse = {
  turn: {
    role: 'assistant';
    content: string;
  };
};

export type DimensionObservability = {
  dimension: string;
  observability: number;
};

export type AssessmentProgressResponse = {
  evidenceSufficient: boolean;
  dimensions: DimensionObservability[];
  maxTurnsReached: boolean;
};

export type EvaluationEvidence = {
  text: string;
  impact: 'positive' | 'negative';
  comment: string;
};

export type DimensionEvaluation = {
  dimension: string;
  score: number;
  evidence: EvaluationEvidence[];
  reason: string;
};

export type AssessmentEvaluationResponse = {
  dimensions: DimensionEvaluation[];
};

export type ProgressHistoryEntry = {
  learnerTurn: number;
  result: AssessmentProgressResponse;
};

export type TranscriptExport = {
  scenarioId: string;
  transcript: Turn[];
};

export type AssessmentEvaluationExport = {
  assessmentExportVersion: 1;
  exportedAt: string;
  scenario: {
    id: string;
    title: string;
    prompt: string;
    modules: number[];
  };
  transcript: Turn[];
  evaluation: AssessmentEvaluationResponse;
};

export type DebugReport = TranscriptExport & {
  debugReportVersion: 1;
  progressEvaluations: ProgressHistoryEntry[];
};
