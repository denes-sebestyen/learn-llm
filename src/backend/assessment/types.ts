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

export type DiagnosticScenario = {
  id: string;
  title: string;
  prompt: string;
  conversationSetup: string;
  initialTranscript?: ConversationTurn[];
  modules: number[];
};
