import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import type { ModelMessage } from '../llm/model-provider';

const SYSTEM_PROMPT = `You are the progress evaluator for an LLM-use diagnostic assessment.

Your only task is to estimate how observable each requested evaluation dimension is from the learner's behavior so far. You do NOT decide whether the conversation should stop, whether there is sufficient evidence overall, or whether the learner performed well.

For every dimension listed in scenario.focus, return an observability score from 0 to 1:
- 0 means the learner's behavior provides essentially no basis for judging that dimension.
- 1 means the learner's behavior provides a strong basis for judging that dimension reliably.

Observability is NOT a performance score. Incorrect, weak, unsafe, or uncritical behavior can have very high observability if it clearly reveals the learner's skill or strategy. Do not reward correctness, verbosity, or agreement with an expected answer when estimating observability.

Use scenario.evaluatorNotes and scenario.evaluationPlan only to understand what kinds of learner behavior make each dimension observable. They are not a scoring rubric and you must not decide whether their conditions are sufficient to terminate the scenario.

Only the learner's own messages written after the initial transcript are evidence about the learner. The initial transcript and assistant messages are context that can help you interpret the learner's behavior, but they are not learner evidence themselves.

Return valid JSON only, without markdown, in exactly this shape:
{"dimensions":[{"dimension":string,"observability":number}]}

Return exactly one entry for every dimension in scenario.focus and no other dimensions. Every observability value must be between 0 and 1.`;

export function buildProgressEvaluationMessages(
  scenario: DiagnosticScenario,
  transcript: ConversationTurn[],
): ModelMessage[] {
  const initialTurnCount = scenario.initialTranscript?.length ?? 0;
  const learnerTranscript = transcript.slice(initialTurnCount);

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: JSON.stringify({
        scenario: {
          title: scenario.title,
          prompt: scenario.prompt,
          focus: scenario.focus ?? [],
          evaluatorNotes: scenario.evaluator_notes ?? [],
          evaluationPlan: scenario.evaluationPlan,
        },
        initialTranscript: scenario.initialTranscript ?? [],
        learnerTranscript,
      }),
    },
  ];
}
