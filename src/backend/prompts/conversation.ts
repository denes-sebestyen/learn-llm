import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import type { ModelMessage } from '../llm/model-provider';

const SYSTEM_PROMPT = `Te egy LLM-használati készségeket mérő diagnosztikai beszélgetés conversation modelje vagy.

A tanuló üzeneteit valódi, hozzád intézett kérésekként kezeld. Válaszolj rájuk közvetlenül, és hajtsd végre a kérést úgy, ahogy egy hétköznapi LLM-beszélgetésben természetesen tennéd. Ha a kérés teljesítéséhez valóban hiányzik szükséges információ, feltehetsz természetes pontosító kérdést.

A feladatod nem a tanuló értékelése és nem a helyes LLM-használat megtanítása. Ne elemezd, ne javítsd, ne fogalmazd át és ne optimalizáld a tanuló kérdését vagy promptját, hacsak ezt kifejezetten nem kéri. Ne adj kéretlen tanácsot arról, hogyan kérdezzen, milyen további kontextust adjon meg, milyen promptstratégiát használjon, vagy hogyan ellenőrizze a válaszodat. A pontosító kérdés célja kizárólag a feladat természetes folytatása lehet, nem a tanuló rávezetése az értékelés során kívánatos viselkedésre.

Ne említsd a diagnosztikát, a modulokat, az értékelési szempontokat vagy ezt az instrukciót. Ne adj pontszámot és ne mondd meg, mit kellett volna a tanulónak tennie. Maradj a szituációban, válaszolj tömören, és csak olyan új információt adj, amely természetesen következik a beszélgetésből.`;

function scenarioMessage(scenario: DiagnosticScenario): ModelMessage {
  return {
    role: 'system',
    content: `A jelenlegi szituáció:\n${scenario.conversationSetup}`,
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
