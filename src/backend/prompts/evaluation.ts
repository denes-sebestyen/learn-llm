import type { DiagnosticScenario } from '../assessment/types';
import { getAssessmentDimension } from '../assessment/dimensions';
import type { ModelMessage } from '../llm/model-provider';
import { EVALUATION_SYSTEM_PROMPT } from './evaluation/system-prompt';
import type { EvaluationTurn } from './evaluation/turns';

function buildScenarioEvaluationInstructions(scenario: DiagnosticScenario): string {
  const focus = scenario.focus ?? [];
  const dimensions = focus.map((dimension) => {
    const { definition, scoringGuidance } = getAssessmentDimension(dimension);

    return {
      dimension,
      definition,
      scoringGuidance,
    };
  });
  const evaluatorNotes = scenario.evaluator_notes ?? [];
  const targetBehaviors = scenario.evaluationPlan?.targetBehaviors ?? [];

  return [
    'Scenario-specific evaluation instructions:',
    `Scenario title: ${scenario.title}`,
    `Scenario task: ${scenario.prompt}`,
    `Evaluation dimensions: ${JSON.stringify(dimensions)}`,
    evaluatorNotes.length > 0
      ? `Evaluator notes: ${JSON.stringify(evaluatorNotes)}`
      : '',
    targetBehaviors.length > 0
      ? `Target behaviors: ${JSON.stringify(targetBehaviors)}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildFinalEvaluationMessages(
  scenario: DiagnosticScenario,
  turns: EvaluationTurn[],
): ModelMessage[] {
  return [
    {
      role: 'system',
      content: `${EVALUATION_SYSTEM_PROMPT}\n\n${buildScenarioEvaluationInstructions(scenario)}`,
    },
    {
      role: 'user',
      content: JSON.stringify({ turns }),
    },
  ];
}
