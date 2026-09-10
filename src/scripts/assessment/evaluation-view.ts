import type { AssessmentEvaluationResponse } from './types';

const DIMENSION_LABELS: Record<string, string> = {
  recognition: 'Felismerés',
  risk_assessment: 'Kockázatértékelés',
  verification_strategy: 'Ellenőrzési stratégia',
  llm_usage_strategy: 'LLM-használati stratégia',
};

export function renderEvaluation(
  container: HTMLElement,
  evaluation: AssessmentEvaluationResponse,
): void {
  const results = evaluation.dimensions.map((dimension) => {
    const section = document.createElement('section');
    section.className = 'evaluation-result';

    const heading = document.createElement('strong');
    heading.textContent =
      `${DIMENSION_LABELS[dimension.dimension] ?? dimension.dimension}: ${dimension.score}/3`;

    const reason = document.createElement('p');
    reason.textContent = dimension.reason;

    const evidenceList = document.createElement('ul');
    for (const evidence of dimension.evidence) {
      const item = document.createElement('li');
      const impact = evidence.impact === 'positive' ? '+' : '−';
      item.textContent = `${impact} ${evidence.text} — ${evidence.comment}`;
      evidenceList.append(item);
    }

    section.append(heading, reason, evidenceList);
    return section;
  });

  container.replaceChildren(...results);
}
