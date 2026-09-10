import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import { getAssessmentDimension } from '../assessment/dimensions';
import type { ModelMessage } from '../llm/model-provider';

export type EvaluationSegment = {
  id: number;
  text: string;
  start: number;
  end: number;
};

export type EvaluationTurn = {
  id: number;
  learnerMessage: {
    text: string;
    segments: EvaluationSegment[];
  };
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

The conversation is provided as interaction turns. Each turn contains a learnerMessage split into numbered segments and, when available, the assistantResponse to it. Only learnerMessage segments are evidence about the learner. assistantResponse is context that may be necessary to interpret learner behavior, but is never evidence of learner skill.

Base every score on concrete learner behavior in the turns. Select only the learner segments that materially contribute to the score; do not cite every segment merely because it is available. Absence of positive evidence is not negative evidence. Select negative evidence only when the learner demonstrates behavior that materially weighs against performance on the current dimension. If a segment is irrelevant to the dimension or merely fails to demonstrate the skill, omit it from the evidence rather than marking it negative. For each evidence item, identify whether it affects the judgment positively or negatively and explain specifically what those selected learner segments themselves demonstrate for the current dimension. You may use the surrounding interaction as context to interpret a selected segment, but the evidence comment MUST NOT attribute an action, statement, intention, strategy, suggestion, or realization to the learner unless it is actually demonstrated by the selected learner segment or segments. Do not transfer behavior from another learner segment or from an assistant response onto the selected evidence. Contradictions and changes in strategy are valid evidence and may affect the score. Do not reward verbosity, stylistic polish, or agreement with the assistant. Judge the learner's decisions and behavior in context.

Use scenario.evaluatorNotes and scenario.evaluationPlan as scenario-specific context. They can clarify which behaviors are relevant, but they do not override the shared dimension definition or scoring guidance.

For each dimension, provide one integer score from 0 to 3, one or more evidence items, and a concise overall reason explaining the score. Each evidence item must contain a turnId, one or more segmentIds from that turn, an impact of either \"positive\" or \"negative\", and a concise comment explaining how those specific segments affect the judgment. Do not quote or reproduce evidence text. Do not recommend learning modules or decide product behavior.

LANGUAGE REQUIREMENT: The learner-facing fields \"reason\" and every evidence \"comment\" MUST be written in the same language as the learner's conversation. This is a required output constraint, not a stylistic preference. Do not use English for these fields when the learner's conversation is in another language. Structural JSON field names and dimension identifiers remain in English; only learner-facing natural-language values follow the learner's language.

Return valid JSON only, without markdown, in exactly this shape:
{"dimensions":[{"dimension":string,"score":number,"evidence":[{"turnId":number,"segmentIds":[number],"impact":"positive"|"negative","comment":string}],"reason":string}]}

Return exactly one entry for every dimension in scenario.focus and no other dimensions.`;

function segmentLearnerMessage(content: string): EvaluationSegment[] {
  const boundaryPattern = /[^.!?\n]+(?:[.!?]+|\n+|$)|[.!?]+(?:\n+|$)/g;
  const matches = [...content.matchAll(boundaryPattern)];

  if (content.length === 0) {
    return [];
  }

  if (matches.length === 0) {
    return [{ id: 1, text: content, start: 0, end: content.length }];
  }

  const segments: EvaluationSegment[] = [];
  let start = 0;

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const nextMatch = matches[index + 1];
    const end = nextMatch?.index ?? content.length;

    if (end <= start) {
      continue;
    }

    segments.push({
      id: segments.length + 1,
      text: content.slice(start, end),
      start,
      end,
    });
    start = end;
  }

  if (start < content.length) {
    segments.push({
      id: segments.length + 1,
      text: content.slice(start),
      start,
      end: content.length,
    });
  }

  return segments;
}

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
      learnerMessage: {
        text: message.content,
        segments: segmentLearnerMessage(message.content),
      },
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
