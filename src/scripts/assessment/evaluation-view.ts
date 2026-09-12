import type {
  AssessmentEvaluationExport,
  AssessmentEvaluationResponse,
  Scenario,
  Turn,
} from './types';
import { downloadJson } from './transcript';

const DIMENSION_LABELS: Record<string, string> = {
  recognition: 'Felismerés',
  risk_assessment: 'Kockázatértékelés',
  verification_strategy: 'Ellenőrzési stratégia',
  llm_usage_strategy: 'LLM-használati stratégia',
};

function readCurrentScenario(): Scenario {
  const scenarioData = document.getElementById('scenario-data');
  const scenarioSelect = document.getElementById('scenario-select') as HTMLSelectElement | null;
  const scenarios = JSON.parse(scenarioData?.textContent ?? '[]') as Scenario[];
  const scenario = scenarios.find((candidate) => candidate.id === scenarioSelect?.value);

  if (!scenario) {
    throw new Error('Could not determine the current assessment scenario.');
  }

  return scenario;
}

function readRenderedTranscript(): Turn[] {
  return Array.from(document.querySelectorAll<HTMLElement>('#messages .message'))
    .filter((message) => !message.classList.contains('thinking'))
    .map((message, index) => {
      const role = message.classList.contains('user') ? 'user' : 'assistant';
      const content = message.querySelectorAll('span')[1]?.textContent ?? '';

      return { id: index + 1, role, content };
    });
}

function createEvaluationExport(
  evaluation: AssessmentEvaluationResponse,
): AssessmentEvaluationExport {
  const scenario = readCurrentScenario();

  return {
    assessmentExportVersion: 1,
    exportedAt: new Date().toISOString(),
    scenario: {
      id: scenario.id,
      title: scenario.title,
      prompt: scenario.prompt,
      modules: [...scenario.modules],
    },
    transcript: readRenderedTranscript(),
    evaluation: {
      dimensions: evaluation.dimensions.map((dimension) => ({
        ...dimension,
        evidence: dimension.evidence.map((evidence) => ({ ...evidence })),
      })),
    },
  };
}

function createExportButton(
  evaluation: AssessmentEvaluationResponse,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button';
  button.textContent = 'Értékelés exportálása';
  button.addEventListener('click', () => {
    const value = createEvaluationExport(evaluation);
    downloadJson(`assessment-${value.scenario.id}-evaluation.json`, value);
  });

  return button;
}

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

  container.replaceChildren(...results, createExportButton(evaluation));
}
