import type { DiagnosticScenario, ConversationTurn } from '../assessment/types';
import type { ModelMessage } from '../llm/model-provider';

const SYSTEM_PROMPT = `Te egy LLM-használati diagnosztika progress evaluatorja vagy.

A feladatod kizárólag annak eldöntése, hogy a beszélgetésben már van-e elegendő megfigyelhető bizonyíték a scenario releváns értékelési dimenzióinak megítéléséhez. Nem azt döntöd el, hogy a tanuló jól teljesített-e. Gyenge, hibás vagy kritikátlan viselkedés is lehet elegendő bizonyíték.

Ne jutalmazd azt, ha a beszélgetés hosszú. Ne várd el, hogy a tanuló kimondjon egy előre meghatározott helyes választ. Ha egy dimenzió megítélhető a tanuló tényleges viselkedéséből, tekintsd lefedettnek.

Ha a scenario tartalmaz evaluationPlan mezőt, azt privát megfigyelési specifikációként használd. A targetBehaviors azt írja le, milyen viselkedések megfigyelése a scenario célja; a sufficientWhen pedig azt, milyen megfigyelési helyzet után tekinthető elegendőnek a bizonyíték. Ez nem pontozási rubrika: nem szükséges, hogy a tanuló jól hajtsa végre a felsorolt viselkedéseket. Ha például a terv a modell válaszára adott reakció megfigyelését igényli, ne jelöld elegendőnek a bizonyítékot addig, amíg a tanulónak nem volt ilyen lehetősége és nem reagált rá.

Ha nincs evaluationPlan, ne feltételezd, hogy hiányzik valamilyen előre meghatározott lépésszám vagy helyes viselkedés. Ilyenkor a scenario promptja, focus mezője, evaluatorNotes és a tényleges beszélgetés alapján döntsd el, hogy a releváns dimenziók már megítélhetők-e. Ez a fallback a nem előre specifikált vagy dinamikusan létrehozott scenariókhoz.

Csak a tanuló saját, az initial transcript után írt üzeneteit használd a készségeire vonatkozó bizonyítékként. A scenario kezdő beszélgetése kontextus, nem a tanuló teljesítménye.

Kizárólag érvényes JSON-t adj vissza ebben a formában, markdown nélkül:
{"evidenceSufficient":boolean,"coveredDimensions":string[],"missingDimensions":string[],"confidence":number}

A confidence 0 és 1 közötti szám legyen. A coveredDimensions és missingDimensions csak a scenario focus mezőjében szereplő dimenziókat tartalmazhatja.`;

export function buildProgressEvaluationMessages(
  scenario: DiagnosticScenario,
  transcript: ConversationTurn[],
): ModelMessage[] {
  const initialTurnCount = scenario.initialTranscript?.length ?? 0;
  const learnerTranscript = transcript.slice(initialTurnCount);

  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: JSON.stringify({
        scenario: {
          title: scenario.title,
          prompt: scenario.prompt,
          focus: scenario.focus ?? [],
          evaluatorNotes: scenario.evaluator_notes ?? [],
          evaluationPlan: scenario.evaluationPlan,
        },
        initialTranscript: scenario.initialTranscript ?? [],
        learnerTranscript,
      }),
    },
  ];
}
