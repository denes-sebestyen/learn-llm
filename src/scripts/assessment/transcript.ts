import type { Scenario, TranscriptExport, Turn } from './types';

function isTurn(value: unknown): value is Turn {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<Turn>;
  return Number.isInteger(candidate.id) &&
    typeof candidate.id === 'number' && candidate.id > 0 &&
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string';
}

export function parseTranscriptExport(
  value: unknown,
  scenarios: Scenario[],
): TranscriptExport {
  if (!value || typeof value !== 'object') {
    throw new Error('Az importált adat nem objektum.');
  }

  const candidate = value as Partial<TranscriptExport>;
  if (
    typeof candidate.scenarioId !== 'string' ||
    !scenarios.some((scenario) => scenario.id === candidate.scenarioId) ||
    !Array.isArray(candidate.transcript) ||
    !candidate.transcript.every(isTurn)
  ) {
    throw new Error('Érvénytelen transcript export.');
  }

  const ids = candidate.transcript.map((turn) => turn.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error('A transcript turn ID-k nem egyediek.');
  }

  return {
    scenarioId: candidate.scenarioId,
    transcript: candidate.transcript.map((turn) => ({ ...turn })),
  };
}

export function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
