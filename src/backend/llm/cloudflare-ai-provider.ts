import type { ModelProvider, ModelRequest, ModelResponse } from './model-provider';

type WorkersAIResult = {
  response?: string;
};

export type WorkersAI = {
  run(model: string, input: unknown): Promise<unknown>;
};

const CONVERSATION_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';

export class CloudflareAIProvider implements ModelProvider {
  constructor(private readonly ai: WorkersAI) {}

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const result = (await this.ai.run(CONVERSATION_MODEL, {
      messages: request.messages,
    })) as WorkersAIResult;

    if (!result.response?.trim()) {
      throw new Error('Workers AI returned an empty response.');
    }

    return {
      content: result.response.trim(),
    };
  }
}
