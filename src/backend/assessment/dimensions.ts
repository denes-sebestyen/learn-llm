export const ASSESSMENT_DIMENSIONS = {
  recognition: {
    definition:
      'The learner notices properties, limitations, uncertainty, assumptions, or warning signs in an LLM interaction that are relevant to deciding how to proceed.',
    progressGuidance:
      'Estimate how clearly the learner behavior reveals what they notice or fail to notice. Do not judge whether their recognition is correct or complete.',
    scoringGuidance:
      'Evaluate whether the learner recognizes the relevant limitations, uncertainty, assumptions, or warning signs and uses that recognition appropriately.',
    minObservability: 0.75,
  },
  risk_assessment: {
    definition:
      'The learner assesses the possible consequences of relying on LLM output and relates the required level of caution to the stakes and context.',
    progressGuidance:
      'Estimate how clearly the learner behavior reveals their assessment of consequences, stakes, and required caution. Unsafe or disproportionate risk assessment can still be highly observable.',
    scoringGuidance:
      'Evaluate whether the learner identifies relevant consequences and calibrates caution proportionately to the stakes and context.',
    minObservability: 0.75,
  },
  verification_strategy: {
    definition:
      'The learner decides whether, what, and how to verify in an LLM interaction, including the choice of sources or other means of validation.',
    progressGuidance:
      'Estimate how clearly the learner behavior reveals their verification strategy. A weak, unnecessary, insufficient, or absent verification strategy can still be highly observable if it is clear from the behavior.',
    scoringGuidance:
      'Evaluate whether the learner chooses verification effort, methods, and sources appropriate to the claim, uncertainty, and stakes.',
    minObservability: 0.75,
  },
  llm_usage_strategy: {
    definition:
      'The learner uses the LLM as part of a process, including providing useful context, iterating on outputs, refining the task, exploring alternatives, and deciding what role the LLM should play.',
    progressGuidance:
      'Estimate how clearly the learner behavior reveals their way of working with the LLM across the interaction. Do not require a good strategy: ineffective, passive, or poorly calibrated use can still be highly observable.',
    scoringGuidance:
      'Evaluate whether the learner uses the LLM deliberately and adaptively, provides relevant context, responds to outputs, iterates when useful, and assigns the LLM an appropriate role in the wider task.',
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
