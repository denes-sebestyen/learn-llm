import type { DiagnosticScenario } from '../assessment/types';
import { getAssessmentDimension } from '../assessment/dimensions';
import type { ModelMessage } from '../llm/model-provider';
import { EVALUATION_SYSTEM_PROMPT } from './evaluation/system-prompt';
import type { EvaluationTurn } from './evaluation/turns';

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
    { role: 'system', content: EVALUATION_SYSTEM_PROMPT },
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
