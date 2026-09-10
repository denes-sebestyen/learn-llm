import type { DiagnosticScenario, ConversationTurn } from '../../assessment/types';

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
