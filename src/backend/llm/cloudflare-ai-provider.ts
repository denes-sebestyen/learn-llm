import type { ModelProvider, ModelRequest, ModelResponse } from './model-provider';

const CONVERSATION_MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';

type WorkersAIChatInput = {
  messages: ModelRequest['messages'];
};

type WorkersAIChatOutput = {
  response?: string;
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
    });

    if (!result.response?.trim()) {
      throw new Error('Workers AI returned an empty response.');
    }

    return {
      content: result.response.trim(),
    };
  }
}
