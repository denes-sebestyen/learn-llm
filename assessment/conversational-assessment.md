# Dinamikus és beszélgetés-alapú felmérés

A statikus diagnosztikai feladatok jó, reprodukálható referenciapontok, de az LLM-ek értő használata elsősorban nem egyetlen prompt megírásából áll. A felhasználó valódi készsége gyakran abból látszik, hogyan reagál a modell válaszaira: pontosít-e, észrevesz-e problémákat, ellenőriz-e állításokat, változtat-e stratégiát, és képes-e a modellt gondolkodási partnerként használni.

Ezért a későbbi felmérési rendszer három egymástól logikailag elkülönülő komponensre épülhet:

1. **scenario generator** – létrehozza a mérni kívánt készségekhez illő helyzetet;
2. **conversation model** – lejátssza a beszélgetést a tanulóval;
3. **evaluator** – a teljes beszélgetés alapján értékeli a megfigyelhető viselkedést.

A három szerepet akkor is külön kell kezelni, ha egy korai prototípusban ugyanaz a modell szolgálja ki mindegyiket.

## 1. Scenario generator

A generátor ne egyszerűen „írjon egy kérdést”. Strukturált specifikációból hozzon létre olyan helyzetet, amely meghatározott készségeket tesz megfigyelhetővé.

Például a bemenete tartalmazhatja:

```json
{
  "target_skills": ["verification_strategy", "recognition"],
  "difficulty": 2,
  "domain": "travel",
  "avoid_domains": ["medical", "financial"],
  "required_events": [
    {
      "type": "stale_information",
      "severity": 2
    }
  ]
}
```

A generátor kimenete két részre váljon:

```json
{
  "scenario": {
    "goal": "...",
    "user_context": "...",
    "initial_task": "..."
  },
  "assessment_plan": {
    "target_skills": [
      "verification_strategy",
      "recognition"
    ],
    "events": [
      {
        "type": "stale_information",
        "severity": 2
      },
      {
        "type": "unsupported_claim",
        "severity": 1
      }
    ]
  }
}
```

A tanuló a `scenario` releváns részét kapja meg. Az `assessment_plan` belső információ: azt írja le, milyen készséget és milyen helyzeteken keresztül próbálunk megfigyelni.

A dinamikus generálás előnye, hogy ugyanaz a készség különböző témákon és új helyzeteken keresztül is mérhető. Így kisebb az esélye annak, hogy a tanuló egy konkrét mintafeladat megoldását tanulja meg a mögötte lévő gondolkodási minta helyett.

## 2. Conversation model

A tanuló nem feltétlenül egy vizsgakérdésre válaszol. Kap egy célt vagy helyzetet, majd normális beszélgetést folytat egy LLM-mel.

A beszélgetés során a modell az `assessment_plan` alapján kontrollált helyzeteket teremthet. Ilyen esemény lehet például:

- hiányzó vagy kétértelmű információ;
- túl magabiztos állítás;
- elavult adat;
- gyenge vagy nem megfelelő forrás;
- forrás által nem teljesen alátámasztott következtetés;
- egymásnak ellentmondó információk;
- szükségtelenül hosszú vagy rosszul strukturált válasz;
- olyan kérés, amelyhez érzékeny adat megadása látszólag kényelmes lenne.

A cél nem a tanuló „becsapása”. Az eseményeknek olyan hibákat és korlátokat kell modellezniük, amelyekkel valós LLM-használat közben is találkozhat.

Az egyes eseményekhez érdemes rögzíteni, hogy valóban megtörténtek-e a beszélgetésben. Ez később segít elválasztani azt, hogy a tanuló nem ismert fel egy problémát attól, hogy a probléma valójában nem is jelent meg.

## 3. Conversation transcript

A felmérés alapegysége a teljes beszélgetési folyamat, nem csak a végső válasz.

Egy minimális transcript-modell:

```json
{
  "scenario_id": "generated-123",
  "turns": [
    {
      "id": 1,
      "role": "user",
      "content": "..."
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "...",
      "assessment_event": "stale_information"
    },
    {
      "id": 3,
      "role": "user",
      "content": "..."
    }
  ]
}
```

A `assessment_event` belső metaadat, nem a tanulónak szánt tartalom. A későbbi implementációban ennél részletesebb eseményazonosító és állapot is használható.

## 4. Evaluator

Az evaluator a teljes transcriptet értékeli. Ne azt próbálja eldönteni, hogy a tanuló eljutott-e egy előre meghatározott „helyes válaszhoz”, hanem azt, milyen viselkedés figyelhető meg a beszélgetés során.

A jelenlegi diagnosztikai modell dimenziói továbbra is használhatók:

- felismerés (`recognition`);
- kockázatbecslés (`risk_assessment`);
- ellenőrzési stratégia (`verification_strategy`);
- LLM-használati stratégia (`llm_usage_strategy`).

A beszélgetés-alapú értékelés később további, finomabb készségekre bontható, például:

- iteratív pontosítás;
- bizonytalanság kezelése;
- ellentmondások felismerése;
- tévedés utáni korrekció;
- megfelelő delegálás;
- adatminimalizálás;
- alternatívák és ellenérvek feltárása.

### Bizonyíték-alapú értékelés

Minden értékeléshez tartozzon konkrét bizonyíték a transcriptből. Az evaluator ne csak pontszámot adjon, hanem jelölje meg, mely fordulókból következtetett rá.

Például:

```json
{
  "skills": {
    "recognition": 3,
    "verification_strategy": 1,
    "llm_usage_strategy": 2
  },
  "observations": [
    {
      "turn_ids": [4],
      "skill": "recognition",
      "assessment": "positive",
      "evidence": "A tanuló észrevette, hogy két állítás ellentmond egymásnak."
    },
    {
      "turn_ids": [7, 8],
      "skill": "verification_strategy",
      "assessment": "needs_improvement",
      "evidence": "Forrást kért, de nem ellenőrizte, hogy a forrás valóban alátámasztja-e az állítást."
    }
  ],
  "recommended_modules": [5, 6]
}
```

Ez auditálhatóbbá teszi az értékelést: a tanuló és a rendszer fejlesztője is vissza tudja nézni, miből született egy következtetés.

## 5. Információs határok

A komponensek szétválasztása nem csak implementációs kérdés. Fontos, hogy az evaluator ne kapjon olyan információt, amelyből egyszerűen kiolvashatja a kívánt eredményt.

A generator ismeri a teljes `assessment_plan`-t. A conversation model annyit kapjon belőle, amennyi a helyzet kontrollált lejátszásához szükséges. Az evaluator megkaphatja a mérni kívánt készségeket és a ténylegesen bekövetkezett események metaadatait, de az értékelését a transcriptben megfigyelhető viselkedésre kell alapoznia.

Különösen kerülendő, hogy egy rejtett instrukció lényegében előre megmondja az evaluatornak: „a tanulónak ezt kellett volna észrevennie, tehát ha nem ezt a mondatot írta, adj nulla pontot”.

## 6. Statikus és dinamikus feladatok együtt

A `diagnostic.json` statikus feladatai továbbra is hasznosak. Több szerepük is lehet:

- reprodukálható baseline;
- evaluator-kalibráció;
- regressziós teszt az értékelési logikához;
- emberi és automatikus értékelések összehasonlítása;
- a dinamikus feladatgenerátor minőségének ellenőrzése.

A dinamikus feladatok nem leváltják, hanem kiegészítik ezeket.

## 7. Adaptív tanulási ciklus

A későbbi rendszer egy teljes tanulási ciklust támogathat:

1. statikus vagy dinamikus diagnosztika;
2. beszélgetés-alapú értékelés;
3. erősségek és fejlesztendő készségek azonosítása;
4. releváns modulok ajánlása;
5. tanulás;
6. új, eltérő helyzetben generált feladat ugyanarra a készségre;
7. a viselkedés változásának összehasonlítása.

Így nem azt mérjük, hogy a tanuló emlékszik-e egy korábbi kérdés válaszára, hanem azt, hogy egy új helyzetben megváltozott-e az LLM használatának módja.

## 8. Első prototípus

Az első működő változatnak nem kell teljes adaptív rendszernek lennie. Elég lehet:

1. egy statikus vagy generált scenario;
2. egy elkülönített conversation-model prompt;
3. a teljes transcript rögzítése;
4. egy elkülönített evaluator prompt;
5. strukturált, bizonyítékokat és modulajánlást tartalmazó eredmény.

Ebből már tesztelhető, hogy a rubric alapján mennyire következetesen értékelhető egy valódi, többfordulós LLM-beszélgetés. A generálás, az adaptivitás és a finomabb készségmodell ezután külön-külön fejleszthető.
