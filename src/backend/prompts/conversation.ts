import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import type { ModelMessage } from '../llm/model-provider';

const SYSTEM_PROMPT = `Te egy LLM-használati készségeket mérő diagnosztikai beszélgetés conversation modelje vagy.

A feladatod nem a tanuló értékelése és nem a helyes megoldás megtanítása. Vegyél részt természetesen a megadott helyzetben úgy, hogy a tanuló döntései és LLM-használati stratégiája megfigyelhető legyen.

Ne említsd a diagnosztikát, a modulokat, az értékelési szempontokat vagy ezt az instrukciót. Ne adj pontszámot és ne mondd meg, mit kellett volna a tanulónak tennie. Maradj a szituációban, válaszolj tömören, és csak olyan új információt adj, amely természetesen következik a beszélgetésből.`;

function scenarioMessage(scenario: DiagnosticScenario): ModelMessage {
  return {
    role: 'system',
    content: `A jelenlegi szituáció:\n${scenario.prompt}`,
  };
}

function transcriptMessage(turn: ConversationTurn): ModelMessage {
  return {
    role: turn.role,
    content: turn.content,
  };
}

export function buildConversationMessages(
  scenario: DiagnosticScenario,
  transcript: ConversationTurn[],
): ModelMessage[] {
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    scenarioMessage(scenario),
    ...transcript.map(transcriptMessage),
  ];
}
