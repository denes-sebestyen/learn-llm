import type { ModelProvider, ModelRequest, ModelResponse } from './model-provider';

const CONVERSATION_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';

type WorkersAIChatInput = {
  messages: ModelRequest['messages'];
  max_tokens?: number;
  response_format?: ModelRequest['responseFormat'];
};

type WorkersAIChatOutput = {
  response?: unknown;
};

export type WorkersAI = {
  run(
    model: typeof CONVERSATION_MODEL,
    input: WorkersAIChatInput,
  ): Promise<WorkersAIChatOutput>;
};

export class CloudflareAIProvider implements ModelProvider {
  constructor(private readonly ai: WorkersAI) {}

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const result = await this.ai.run(CONVERSATION_MODEL, {
      messages: request.messages,
      max_tokens: request.maxTokens,
      response_format: request.responseFormat,
    });

    if (typeof result.response === 'string') {
      const content = result.response.trim();

      if (!content) {
        throw new Error('Workers AI returned an empty response.');
      }

      return { content };
    }

    if (result.response !== undefined && result.response !== null) {
      return { structured: result.response };
    }

    throw new Error('Workers AI returned an empty response.');
  }
}
