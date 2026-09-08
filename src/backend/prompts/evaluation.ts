import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import { getAssessmentDimension } from '../assessment/dimensions';
import type { ModelMessage } from '../llm/model-provider';

export type EvaluationTurn = {
  id: number;
  learnerMessage: string;
  assistantResponse?: string;
};

const SYSTEM_PROMPT = `You are the final evaluator for an LLM-use diagnostic assessment.

Your task is to evaluate the learner's demonstrated behavior on each requested evaluation dimension. Unlike the progress evaluator, you are judging performance quality, not whether enough evidence exists.

Use this four-level scale consistently:
- 0: The demonstrated behavior is absent or clearly problematic for this dimension.
- 1: The learner demonstrates the skill only partially, inconsistently, or with substantial weaknesses.
- 2: The learner demonstrates a generally appropriate approach, with meaningful room for improvement.
- 3: The learner demonstrates a deliberate, well-calibrated, and consistently appropriate approach.

Each requested dimension includes a definition describing the skill and scoringGuidance describing how to judge performance. Use both. Do not use or infer progress observability thresholds.

The conversation is provided as interaction turns. Each turn contains a learnerMessage and, when available, the assistantResponse to it. Only learnerMessage is evidence about the learner. assistantResponse is context that may be necessary to interpret learner behavior, but is never evidence of learner skill.

Base every score on concrete learner behavior in the turns. Contradictions and changes in strategy are valid evidence and may affect the score. Do not reward verbosity, stylistic polish, or agreement with the assistant. Judge the learner's decisions and behavior in context.

Use scenario.evaluatorNotes and scenario.evaluationPlan as scenario-specific context. They can clarify which behaviors are relevant, but they do not override the shared dimension definition or scoring guidance.

For each dimension, provide one integer score from 0 to 3, one or more evidenceTurnIds referring to turns whose learnerMessage supports the judgment, and a concise reason explaining how that evidence maps to the score. Do not quote evidence text. Do not recommend learning modules or decide product behavior.

Return valid JSON only, without markdown, in exactly this shape:
{"dimensions":[{"dimension":string,"score":number,"evidenceTurnIds":[number],"reason":string}]}

Return exactly one entry for every dimension in scenario.focus and no other dimensions.`;

export function buildEvaluationTurns(
  scenario: DiagnosticScenario,
  transcript: ConversationTurn[],
): EvaluationTurn[] {
  const initialTurnCount = scenario.initialTranscript?.length ?? 0;
  const conversation = transcript.slice(initialTurnCount);
  const turns: EvaluationTurn[] = [];

  for (let index = 0; index < conversation.length; index += 1) {
    const message = conversation[index];

    if (message.role !== 'user') {
      continue;
    }

    const response = conversation[index + 1];
    turns.push({
      id: message.id,
      learnerMessage: message.content,
      ...(response?.role === 'assistant'
        ? { assistantResponse: response.content }
        : {}),
    });
  }

  return turns;
}

export function buildFinalEvaluationMessages(
  scenario: DiagnosticScenario,
  turns: EvaluationTurn[],
): ModelMessage[] {
  const focus = scenario.focus ?? [];
  const dimensions = focus.map((dimension) => {
    const { definition, scoringGuidance } = getAssessmentDimension(dimension);

    return {
      dimension,
      definition,
      scoringGuidance,
    };
  });

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: JSON.stringify({
        scenario: {
          title: scenario.title,
          prompt: scenario.prompt,
          focus,
          evaluatorNotes: scenario.evaluator_notes ?? [],
          evaluationPlan: scenario.evaluationPlan,
        },
        dimensions,
        initialTranscript: scenario.initialTranscript ?? [],
        turns,
      }),
    },
  ];
}
