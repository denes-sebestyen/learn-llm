# Diagnosztikai felmérés

A felmérés célja nem az, hogy a tanuló definíciókat idézzen fel, hanem hogy rövid, valószerű helyzetekben megmutassa, hogyan használna egy LLM-et.

Az eredmény elsősorban **tanulási útvonalat javasol**, nem vizsgajegyet ad. A feladatok ezért nyílt végűek, és többféle jó válasz lehetséges.

## Értékelési modell

Minden feladat négy, 0–3 pontos dimenzió mentén értékelhető. Nem minden dimenzió egyformán fontos minden feladatnál; ezt a feladat `focus` mezője jelzi.

- **felismerés** – észreveszi-e a helyzet lényeges problémáját vagy lehetőségét?
- **kockázatbecslés** – a következményekhez igazítja-e az óvatosságot?
- **ellenőrzési stratégia** – tudja-e, mikor és hogyan kell a választ külső forrással ellenőrizni?
- **LLM-használati stratégia** – jól ad-e kontextust, iterál-e, kér-e alternatívát, kritikát vagy megfelelő formátumot?

### Pontszintek

- **0 – hiányzik:** a válasz nem mutatja a készséget, vagy kifejezetten veszélyes/hibás stratégiát választ.
- **1 – kezdeti:** felismer valamit a problémából, de a megoldás hiányos vagy esetleges.
- **2 – megfelelő:** használható, tudatos stratégiát választ, kisebb hiányosságokkal.
- **3 – erős:** a helyzethez arányos, több lépésből álló és indokolt stratégiát alkalmaz.

Az evaluator ne kulcsszavakat keressen. A pontszámot a válaszban megfigyelhető gondolkodás és cselekvési terv alapján adja, rövid indoklással.

## Kimenet

A felmérés eredménye ne egyetlen százalék legyen. Javasolt kimenet:

1. 2–3 rövid erősség;
2. 1–3 fejlesztendő terület;
3. ajánlott modulok prioritási sorrendben;
4. rövid indoklás arról, miért ezeket érdemes előrevenni.

A modulajánlás a feladatok `modules` mezője és az alacsonyabb rubric-pontok együttese alapján készülhet. Egyetlen gyenge válasz önmagában ne döntsön el egy teljes tanulási útvonalat.

## Első diagnosztikai készlet

A `diagnostic.json` hat helyzetet tartalmaz:

1. rosszul specifikált kérés javítása;
2. magabiztos, de gyanús LLM-válasz kezelése;
3. aktuális információ ellenőrzése;
4. nagy következményű döntés kezelése;
5. LLM használata gondolkodási partnerként;
6. érzékeny adatokat tartalmazó dokumentum kezelése.

Ez még specifikáció, nem végleges tesztmotor. Az első cél az, hogy emberekkel kipróbálható és később LLM-evaluatorral is következetesen értékelhető feladatkészletünk legyen.
