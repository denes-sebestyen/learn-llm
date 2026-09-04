import diagnostic from '../../../assessment/diagnostic.json';
import { buildConversationMessages } from '../prompts/conversation';
import type { ModelProvider } from '../llm/model-provider';
import type {
  AssessmentMessageRequest,
  AssessmentMessageResponse,
  DiagnosticScenario,
} from './types';

const scenarios = diagnostic.scenarios as DiagnosticScenario[];

function getScenario(scenarioId: string): DiagnosticScenario {
  const scenario = scenarios.find((candidate) => candidate.id === scenarioId);

  if (!scenario) {
    throw new Error(`Unknown assessment scenario: ${scenarioId}`);
  }

  return scenario;
}

export class AssessmentService {
  constructor(private readonly modelProvider: ModelProvider) {}

  async continueConversation(
    request: AssessmentMessageRequest,
  ): Promise<AssessmentMessageResponse> {
    const scenario = getScenario(request.scenarioId);
    const messages = buildConversationMessages(scenario, request.transcript);
    const response = await this.modelProvider.generate({ messages });

    return {
      turn: {
        role: 'assistant',
        content: response.content,
      },
    };
  }
}
