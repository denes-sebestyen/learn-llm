export type ModelMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ModelRequest = {
  messages: ModelMessage[];
};

export type ModelResponse = {
  content: string;
};

export interface ModelProvider {
  generate(request: ModelRequest): Promise<ModelResponse>;
}
