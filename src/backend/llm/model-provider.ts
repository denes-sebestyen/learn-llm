export type ModelMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ModelRequest = {
  messages: ModelMessage[];
  maxTokens?: number;
  responseFormat?: {
    type: 'json_object';
  };
};

export type ModelResponse = {
  content: string;
};

export interface ModelProvider {
  generate(request: ModelRequest): Promise<ModelResponse>;
}
