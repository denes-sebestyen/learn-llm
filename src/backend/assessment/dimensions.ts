export const ASSESSMENT_DIMENSIONS = {
  recognition: {
    definition:
      'The learner notices information, properties, limitations, uncertainty, assumptions, or warning signs in an LLM interaction that are relevant to their goal or to deciding how to proceed.',
    progressGuidance:
      'Estimate how much usable evidence the learner transcript provides about what they notice or fail to notice. Do not judge whether their recognition is correct or complete; later contradictory behavior can add evidence rather than invalidate earlier observations.',
    scoringGuidance:
      'Evaluate whether the learner identifies information, properties, limitations, uncertainty, assumptions, or warning signs that are relevant to their goal or next decision. Do not require the learner to acknowledge or discuss information that is irrelevant to their goal merely because the LLM mentioned it.',
    minObservability: 0.75,
  },
  risk_assessment: {
    definition:
      'The learner assesses the possible consequences of relying on LLM output and relates the required level of caution to the stakes and context.',
    progressGuidance:
      'Estimate how much usable evidence the learner transcript provides about their assessment of consequences, stakes, and required caution. Unsafe, disproportionate, or inconsistent risk assessment can still be highly observable.',
    scoringGuidance:
      'Evaluate whether the learner identifies relevant consequences and calibrates caution proportionately to the stakes and context.',
    minObservability: 0.75,
  },
  verification_strategy: {
    definition:
      'The learner decides whether, what, and how to verify in an LLM interaction, including the choice of sources or other means of validation.',
    progressGuidance:
      'Estimate how much usable evidence the learner transcript provides about their verification strategy. Weak, unnecessary, insufficient, absent, or inconsistent verification behavior can still be highly observable and later behavior does not erase earlier usable evidence.',
    scoringGuidance:
      'Evaluate whether the learner chooses verification effort, methods, and sources appropriate to the claim, uncertainty, and stakes.',
    minObservability: 0.75,
  },
  llm_usage_strategy: {
    definition:
      'The learner uses the LLM deliberately as part of a process, taking useful next steps such as providing context, responding to outputs, refining the task, exploring alternatives, or deciding what role the LLM should play.',
    progressGuidance:
      'Estimate how much usable evidence the learner transcript provides about their way of working with the LLM across the interaction. Ineffective, passive, poorly calibrated, changing, or inconsistent use can still be highly observable; do not treat ambiguity in performance quality as missing evidence.',
    scoringGuidance:
      'Evaluate whether the learner uses the LLM deliberately and adaptively across the interaction, taking steps such as providing relevant context, responding to outputs, iterating, refining the task, exploring alternatives, or adjusting the LLM\'s role when those steps are useful. Treat these as possible strategies rather than a checklist, and do not require new context or iteration when the conversation does not call for it.',
    minObservability: 0.75,
  },
} as const;

export type EvaluationDimension = keyof typeof ASSESSMENT_DIMENSIONS;

export type AssessmentDimensionDefinition = {
  definition: string;
  progressGuidance: string;
  scoringGuidance: string;
  minObservability: number;
};

export function isEvaluationDimension(value: string): value is EvaluationDimension {
  return value in ASSESSMENT_DIMENSIONS;
}

export function getAssessmentDimension(
  dimension: EvaluationDimension,
): AssessmentDimensionDefinition {
  return ASSESSMENT_DIMENSIONS[dimension];
}
