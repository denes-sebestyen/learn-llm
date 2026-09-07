import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import { getAssessmentDimension } from '../assessment/dimensions';
import type { ModelMessage } from '../llm/model-provider';

const SYSTEM_PROMPT = `You are the progress evaluator for an LLM-use diagnostic assessment.

Your only task is to estimate how observable each requested evaluation dimension is from the learner's behavior so far. You do NOT decide whether the conversation should stop, whether there is sufficient evidence overall, or whether the learner performed well.

For every dimension listed in scenario.focus, return an observability score from 0 to 1:
- 0 means the learner's behavior provides essentially no usable evidence for judging that dimension.
- 1 means the transcript contains strong usable behavioral evidence for judging that dimension reliably.

Treat observability as cumulative evidence across the full learner transcript, not as confidence in a single current interpretation of the learner. Earlier usable evidence remains evidence when later messages are added. Later contradictory, inconsistent, weak, unsafe, or incorrect behavior is normally additional evidence about the learner rather than a reason to discard earlier evidence. Therefore, do not lower observability merely because later behavior changes, contradicts, or complicates the apparent strategy. Lower confidence in a particular performance interpretation is a matter for the final evaluator, not this progress estimate.

Each requested dimension includes a definition describing the skill being measured and progressGuidance describing specifically what observability means for that dimension. Use both when estimating observability. Do not use scoringGuidance or infer a performance score.

Observability is NOT a performance score. Incorrect, weak, unsafe, or uncritical behavior can have very high observability if it clearly reveals the learner's skill or strategy. Do not reward correctness, verbosity, or agreement with an expected answer when estimating observability.

Use scenario.evaluatorNotes and scenario.evaluationPlan only as scenario-specific context for understanding what kinds of learner behavior make the requested dimensions observable. They do not replace the dimension definitions, they are not a scoring rubric, and you must not decide whether their conditions are sufficient to terminate the scenario.

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
  const focus = scenario.focus ?? [];
  const dimensions = focus.map((dimension) => {
    const { definition, progressGuidance } = getAssessmentDimension(dimension);

    return {
      dimension,
      definition,
      progressGuidance,
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
        learnerTranscript,
      }),
    },
  ];
}
