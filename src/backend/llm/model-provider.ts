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

export type ModelResponse =
  | {
      content: string;
      structured?: never;
    }
  | {
      content?: never;
      structured: unknown;
    };

export interface ModelProvider {
  generate(request: ModelRequest): Promise<ModelResponse>;
}
