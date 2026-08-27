# 7. modul – Kockázatos témák

## Mit fogsz megtanulni?

Az eddigi modulokban azt vizsgáltuk, hogyan kérdezz, hogyan ellenőrizd a válaszokat, és hogyan kezeld az aktuális információkat.

Most olyan helyzetek következnek, amelyekben egy tévedésnek **nagyobb következménye lehet**.

Ilyen lehet például:

- egészségügyi döntés;
- jogi ügy;
- pénzügyi döntés;
- fizikai vagy digitális biztonságot érintő kérdés.

A modul végére:

- felismered, hogy a válasz ellenőrzésének szükséges mértéke a következményektől is függ;
- tudod, mire lehet nagyon hasznos egy LLM magas kockázatú témában;
- felismered, mikor nem szabad egyetlen LLM-válaszra alapozni a döntést;
- tudsz jobb kérdéseket feltenni szakértői konzultáció előtt és után;
- megérted a személyre szabott tanács és az általános tájékoztatás közötti különbséget;
- és kialakíthatsz egy egyszerű rutint nagyobb tétű kérdésekhez.

A cél nem az, hogy félj az LLM használatától ezeken a területeken.

Éppen ellenkezőleg: azt szeretnénk megtanulni, **hogyan lehet úgy használni, hogy az előnyeit kihasználd, miközben a tévedés kockázatát ésszerűen csökkented**.

---

# 1. Nem minden tévedés egyformán veszélyes

Tegyük fel, hogy egy LLM tévesen azt mondja, hogy egy film 118 perc hosszú, miközben valójában 121 perc.

Valószínűleg semmi komoly nem történik.

Most képzeld el ugyanezt a magabiztos tévedést egy kérdésnél arról, hogy:

- bevehetsz-e együtt két gyógyszert;
- mikor jár le egy jogi határidő;
- milyen adót kell fizetned;
- biztonságos-e egy sérült elektromos vezetékhez hozzányúlni.

A modell tévedési képessége nem feltétlenül változott.

A **tévedés következménye** változott meg.

Ezért ugyanaz a válaszminőség, amely egy alacsony kockázatú kérdésnél elfogadható, más helyzetben kevés lehet.

> **Minél nagyobb a tévedés lehetséges következménye, annál erősebb ellenőrzés indokolt.**

---

# 2. Kockázat = nem csak valószínűség

A hétköznapi gondolkodásban könnyű csak ezt kérdezni:

> Mekkora az esélye, hogy téved?

De a kockázat másik része:

> Mi történik, ha téved?

Egy nagyon ritka hiba is fontos lehet, ha a következménye súlyos.

Egyszerű gondolkodási modellként használhatod ezt:

> **kockázat ≈ a hiba esélye × a hiba következményének súlyossága**

Ez nem pontos matematikai képlet minden élethelyzetre. Inkább egy gondolkodási segédeszköz.

Ha a következmény:

- nehezen visszafordítható;
- sok pénzt érint;
- egészséget vagy testi épséget érint;
- jogi kötelezettséget hoz létre;
- más embereket is érint;

akkor érdemes magasabbra tenni az ellenőrzés szintjét.

---

# 3. Az LLM magas kockázatú témában is lehet nagyon hasznos

A „ne alapozz mindent az LLM-re” nem azt jelenti, hogy ilyen témában ne használd.

Sőt, sokszor kifejezetten jó előkészítő eszköz.

Segíthet például:

- megérteni egy szakkifejezést;
- összefoglalni egy hosszú dokumentumot;
- kérdéseket összeírni egy szakembernek;
- áttekinteni a lehetséges szempontokat;
- egy szakvéleményt közérthetőbben elmagyarázni;
- összehasonlítani lehetőségeket;
- megmutatni, milyen információ hiányzik még a döntéshez;
- elsődleges vagy hivatalos forrásokat keresni.

Például orvosi vizsgálat előtt kérdezheted:

> Milyen kérdéseket érdemes feltennem az orvosnak ezzel a lelettel kapcsolatban?

Ez egészen más szerep, mint:

> Mondd meg, milyen gyógyszert szedjek.

Az első esetben az LLM **segít felkészülni egy döntésre vagy konzultációra**. A másodikban maga válna a döntés elsődleges alapjává.

---

# 4. Általános információ és személyre szabott döntés

Fontos különbség van e két kérdés között:

> Mire használják általában ezt a gyógyszert?

és:

> Nekem érdemes elkezdenem ezt a gyógyszert?

Az első általános tájékoztatás.

A második személyre szabott egészségügyi döntés.

Ugyanez más területeken is megjelenik.

Pénzügy:

> Hogyan működik egy kötvény ETF?

szemben ezzel:

> A megtakarításom 70%-át most ebbe tegyem?

Jog:

> Mit jelent általában az elévülés?

szemben ezzel:

> Az én követelésem elévült már?

Biztonság:

> Miért old le egy FI-relé?

szemben ezzel:

> Biztonságos visszakapcsolnom ezt a konkrét hibás rendszert?

Minél személyre szabottabb és következményesebb a kérdés, annál több olyan részlet számíthat, amelyet az LLM nem ismer.

---

# 5. A hiányzó adat veszélyesebb lehet, mint a rossz következtetés

Egy LLM csak abból tud dolgozni, amit:

- megtanult;
- aktuálisan el tud érni;
- és amit te elmondtál neki.

Tegyük fel, hogy megkérdezed:

> Bevehetem ezt a gyógyszert?

A helyes válasz függhet például:

- más gyógyszereidtől;
- allergiától;
- életkortól;
- testsúlytól;
- terhességtől;
- veseműködéstől;
- májműködéstől;
- más betegségektől;
- a pontos dózistól.

A modell akár **helyesen is következtethet a megadott adatokból**, miközben egy el nem mondott körülmény miatt a döntés mégis rossz.

Ez más területeken is igaz.

Egy jogi kérdésnél hiányozhat egy szerződés egyetlen mondata.

Egy pénzügyi kérdésnél hiányozhat egy adózási körülmény.

Egy műszaki problémánál hiányozhat egy olyan részlet, amelyet csak helyszíni vizsgálattal lehet észrevenni.

> **A jó következtetés sem ment meg attól, ha a bemenet hiányos.**

---

# 6. Az LLM nem látja automatikusan a teljes helyzetedet

Beszélgetés közben könnyen kialakulhat az érzés, hogy a rendszer „ismer”.

Lehet, hogy valóban rendelkezik korábbi kontextussal vagy emlékezeti funkcióval.

De ebből nem következik, hogy egy fontos döntéshez **minden szükséges adat rendelkezésére áll**.

Nem biztos, hogy tudja:

- mi változott azóta;
- melyik korábbi információ releváns most;
- mit felejtettél el megemlíteni;
- mely adatot értette félre;
- milyen körülményre nem kérdezett rá.

Magas kockázatú kérdésnél ezért jobb explicit módon megadni a fontos körülményeket, és még ekkor is megkérdezni:

> Milyen további információra lenne szükség a megbízhatóbb válaszhoz?

Ez a kérdés gyakran többet ér, mint az, hogy:

> Biztos vagy benne?

---

# 7. Egészségügy: magyarázatban erős, diagnózisban óvatosság kell

Egészségügyi témában az LLM sokféleképpen segíthet.

Például:

- elmagyarázhat egy leleten szereplő kifejezést;
- segíthet értelmezni, milyen kérdéseket vet fel egy eredmény;
- összefoglalhatja az általános kezelési lehetőségeket;
- segíthet felkészülni az orvosi konzultációra;
- segíthet közérthetőbbé tenni az orvos magyarázatát.

De egy tünet mögött sok különböző ok állhat.

Ugyanaz a fejfájás lehet ártalmatlan és ritkán sürgős kivizsgálást igénylő állapot jele is.

Az LLM ráadásul nem feltétlenül tud:

- fizikális vizsgálatot végezni;
- vérnyomást mérni;
- laborvizsgálatot kérni;
- teljes kórelőzményt felvenni;
- észrevenni minden sürgősségi jelet.

Ezért különösen fontos, hogy ne úgy kezeld, mint egy mindent látó diagnosztikai gépet.

Hasznosabb kérdés lehet:

> Milyen gyakori és milyen komolyabb lehetséges okai vannak ennek a tünetnek, és milyen jelek esetén indokolt sürgősen orvosi segítséget kérni?

Ez nem diagnózist kér, hanem **döntéstámogató térképet**.

---

# 8. Jogi kérdések: a pontos hely és idő döntő lehet

A jog különösen érzékeny arra, hogy:

- melyik ország;
- melyik joghatóság;
- milyen dátum;
- milyen szerződés;
- milyen eljárási helyzet;
- milyen kivétel

vonatkozik az ügyre.

Egy általánosan helyes jogi magyarázat ezért egy konkrét ügyben téves lehet.

Például ahelyett, hogy csak ezt kérdezed:

> Mennyi időm van fellebbezni?

fontos lehet megadni:

> Magyarországon, ilyen típusú eljárásban, 2026-ban kaptam ezt a határozatot. Milyen szabály alapján számítják a fellebbezési határidőt? Keress hivatalos forrást, és jelezd, milyen részletek befolyásolhatják a konkrét határidőt.

A végső döntésnél pedig lehet, hogy szakember vagy hatósági tájékoztatás szükséges.

A jogi határidő különösen jó példa arra, amikor egyetlen nap tévedésének is nagy következménye lehet.

---

# 9. Pénzügy: a számolás és a döntés nem ugyanaz

Az LLM hasznos lehet pénzügyi kérdéseknél:

- fogalmak magyarázatára;
- forgatókönyvek összehasonlítására;
- egyszerű számítások előkészítésére;
- kockázatok összegyűjtésére;
- befektetési termékek működésének megértésére.

De az, hogy egy számítás helyes, nem jelenti azt, hogy az abból levont személyes döntés is jó.

Például:

> Ha évi 5%-os hozammal számolunk, mennyi lesz 10 millió forint értéke tíz év múlva?

elsősorban számítási kérdés.

Ezzel szemben:

> Mibe tegyem a 10 millió forintomat?

függhet többek között:

- időtávtól;
- kockázattűréstől;
- más megtakarításoktól;
- várható kiadásoktól;
- adózástól;
- devizakockázattól;
- likviditási igénytől.

Az LLM jó lehet a lehetőségek feltérképezésére, de a **feltételezéseket és a kockázatokat láthatóvá kell tenni**.

---

# 10. Biztonság: néha a helyes válasz az, hogy ne próbáld ki

Műszaki és biztonsági kérdéseknél különösen fontos a fizikai következmény.

Egy LLM részletes, hihető utasítást tud adni olyan feladathoz is, amelyhez:

- szakértelem;
- védőfelszerelés;
- speciális mérőeszköz;
- engedély;
- helyszíni állapotfelmérés

szükséges.

A részletesség itt sem egyenlő a biztonsággal.

Ha például hálózati elektromosságról, gázról, tűzveszélyről, szerkezeti hibáról vagy más veszélyes rendszerről van szó, lehet, hogy a legjobb tanács nem egy javítási lépéssor, hanem:

> **állj meg, tedd biztonságossá a helyzetet, és kérj megfelelő szakembertől segítséget.**

A jó problémamegoldás része annak felismerése is, amikor a feladatot nem érdemes saját kezűleg végrehajtani.

---

# 11. Hivatalos forrás és szakember nem ugyanazt adja

Az előző modulokban sokszor javasoltuk az elsődleges vagy hivatalos forrást.

Magas kockázatú kérdésnél ez továbbra is fontos, de önmagában nem mindig elég.

Egy jogszabály lehet hiteles elsődleges forrás, miközben nehéz megállapítani, hogyan alkalmazandó a konkrét ügyedre.

Egy gyógyszer hivatalos alkalmazási előírása pontos forrás lehet, de nem ismeri a teljes egészségi állapotodat.

Egy befektetési termék hivatalos dokumentációja leírhatja a terméket, de nem mondja meg, hogy neked megfelelő-e.

Ezért két külön kérdés van:

> **Mi az általános, ellenőrizhető információ?**

és

> **Hogyan alkalmazandó ez az én konkrét helyzetemre?**

Az elsőben az LLM és a forráskeresés sokat segíthet. A másodikhoz bizonyos esetekben emberi szakértelemre is szükség lehet.

---

# 12. Használd az LLM-et a szakemberrel való beszélgetés javítására

Az LLM egyik legerősebb szerepe magas kockázatú témában nem a szakember helyettesítése, hanem a **kommunikáció javítása**.

Konzultáció előtt:

> Foglald össze ezt a leletet közérthetően, és írj öt kérdést, amelyet érdemes feltennem az orvosnak.

> Segíts összegyűjteni, milyen dokumentumokat és tényeket vigyek az ügyvédhez.

> Milyen kérdéseket tegyek fel a pénzügyi tanácsadónak ennek a terméknek a költségeiről és kockázatairól?

Konzultáció után:

> Ezeket jegyeztem fel az orvos magyarázatából. Segíts rendszerezni, és jelöld meg, mely részeket érdemes visszakérdeznem, mert kétértelműek.

> Magyarázd el közérthetően ezt a jogi kifejezést, de ne egészítsd ki olyan részlettel, ami nincs a dokumentumban.

Így az LLM segíthet abban, hogy **jobban használd az emberi szakértelmet**.

---

# 13. Kérj alternatívát és ellenérvet

Nagyobb döntésnél különösen veszélyes lehet, ha az LLM egyszerűen megerősíti az első ötletedet.

Az előző modulban megismert megerősítési torzítás itt komolyabb következményekkel járhat.

Hasznos kérdések:

> Mi a legerősebb érv ez ellen a döntés ellen?

> Milyen alternatívákat hagyok figyelmen kívül?

> Milyen feltételezésre épül a javaslatod, amely ha téves, megváltoztatná a következtetést?

> Milyen információ hiányzik még ahhoz, hogy ezt felelősen el lehessen dönteni?

> Milyen esemény vagy adat lenne ok arra, hogy megváltoztassam a döntést?

Ezekkel az LLM-et nem egyszerűen „tanácsadóként”, hanem **kritikus gondolkodási eszközként** használod.

---

# 14. Ne csak a választ, a feltételezéseket is ellenőrizd

Tegyük fel, hogy egy pénzügyi számítás teljesen hibátlan.

De 6%-os éves hozamot feltételez.

A matematikai eredmény lehet pontos, miközben a 6%-os feltételezés bizonytalan.

Ugyanez előfordulhat más területeken:

- egy jogi válasz feltételezi, hogy egy adott szabály vonatkozik rád;
- egy egészségügyi válasz feltételezi, hogy nincs más gyógyszerkölcsönhatás;
- egy műszaki válasz feltételezi, hogy a hiba oka valóban az, amit leírtál.

Ezért fontos kérdés:

> **Milyen feltételezésekből indultál ki?**

Majd külön:

> Ezek közül melyiket kellene ellenőriznem a döntés előtt?

Ezzel gyakran olyan gyenge pontokat találsz meg, amelyek magában a végső válaszban nem látszanak.

---

# 15. Sürgősség esetén ne a tökéletes prompttal foglalkozz

Ha valaki közvetlen veszélyben van, nem az a cél, hogy hosszú beszélgetésben optimalizáld az LLM válaszát.

Sürgős egészségügyi, tűz-, gáz-, elektromos vagy más veszélyhelyzetben a megfelelő sürgősségi szolgáltatás vagy szaksegítség elérése elsőbbséget élvezhet.

Az LLM ilyenkor legfeljebb kiegészítő szerepet tölthet be.

> **Minél sürgősebb és súlyosabb a helyzet, annál kevésbé érdemes a döntést egy hosszú LLM-beszélgetéstől függővé tenni.**

---

# 16. Egy egyszerű rutin nagyobb tétű kérdésekhez

Ha egy döntésnek komoly következménye lehet, próbáld végig ezt a rövid ellenőrzősort.

## 1. Mi történik, ha a válasz téves?

Ez segít meghatározni, mennyire kell ellenőrizned.

## 2. Általános információt kérek vagy személyes döntést?

A másodikhoz több kontextus és gyakran külső szakértelem kell.

## 3. Milyen adat hiányozhat?

Kérdezd meg az LLM-et is, milyen információ változtatná meg a választ.

## 4. Aktuális és megfelelő forrásból származik az információ?

Használd az előző két modulban tanult forrásellenőrzést.

## 5. Mi szól a válasz ellen?

Kérj alternatívát, ellenérvet és bizonytalanságokat.

## 6. Kell szakember vagy hivatalos megerősítés?

Ha a következmény nagy, ne az LLM legyen az egyetlen döntési pont.

---

# Gyakorlat – Mire használnád az LLM-et?

Minden helyzetnél döntsd el:

- mire lenne hasznos az LLM;
- mit ellenőriznél külön;
- mikor kérnél szakembertől vagy hivatalos forrásból segítséget.

### 1. Laborlelet

Kapsz egy laboreredményt, amelyen több érték mellett csillag szerepel.

Mit kérdeznél az LLM-től, és mit nem bíznál rá egyedül?

### 2. Szerződés

Aláírás előtt állsz egy számodra nehezen érthető szerződéssel.

Hogyan használhatnád az LLM-et úgy, hogy segítsen, de ne keltsen hamis biztonságérzetet?

### 3. Befektetés

Egy ismerősöd ajánl egy számodra új befektetési terméket.

Milyen kérdések feltérképezésére használnád az LLM-et, mielőtt döntesz?

### 4. Elektromos hiba

Egy konnektor környékén égett szagot érzel.

Miért más ez, mint egy szoftverhiba lépésről lépésre történő hibakeresése?

### 5. Orvosi konzultáció után

Sok új információt kaptál, és nem emlékszel pontosan minden összefüggésre.

Mire lehet hasznos az LLM, és mit kellene inkább visszakérdezni az orvostól?

---

# Kísérlet – Változtasd meg a szerepet

Válassz egy alacsony vagy közepes kockázatú, számodra érdekes döntést.

Először kérdezd meg:

> Mit tegyek?

Nézd meg, milyen választ kapsz.

Ezután új beszélgetésben próbáld így:

> Ne dönts helyettem. Segíts feltérképezni a lehetőségeket, a mellettük és ellenük szóló érveket, a bizonytalan feltételezéseket, valamint azt, milyen további információra lenne szükségem a döntéshez.

Hasonlítsd össze a két beszélgetést.

Kérdezd meg magadtól:

- Melyik segített jobban megérteni a problémát?
- Melyik tett láthatóvá több bizonytalanságot?
- Melyik hagyta nálad jobban a döntés felelősségét?
- Volt-e olyan fontos szempont, amely csak a második megközelítésben jelent meg?

A cél nem az, hogy az LLM soha ne ajánljon semmit.

A cél az, hogy **nagyobb tét esetén ne egyetlen magabiztos ajánlást tévessz össze a probléma teljes megoldásával**.

---

# Amit ebből a modulból érdemes megjegyezni

**1. A tévedés következménye számít.**

Minél nagyobb a lehetséges kár, annál erősebb ellenőrzés indokolt.

**2. Magas kockázatú témában is hasznos az LLM.**

Különösen jó lehet magyarázatra, felkészülésre, kérdések összeállítására és lehetőségek feltérképezésére.

**3. Az általános tájékoztatás és a személyre szabott döntés nem ugyanaz.**

A személyes döntéshez olyan adatok is szükségesek lehetnek, amelyekről az LLM nem tud.

**4. A hiányzó információ önmagában kockázat.**

A modell helyesen következtethet a megadott adatokból, és mégis rossz lehet a döntés, ha fontos körülmény hiányzik.

**5. Ellenőrizd a feltételezéseket is.**

Nem csak a végső válasz lehet bizonytalan.

**6. Használd az LLM-et a szakemberrel való kommunikáció javítására.**

Segíthet felkészülni és megérteni, nem csak „választ adni”.

**7. Kérj ellenérvet és alternatívát.**

Különösen akkor, ha a válasz pontosan azt erősíti meg, amit eleve gondoltál.

**8. Sürgős veszélyhelyzetben a megfelelő segítség elérése fontosabb, mint az LLM-mel való hosszú egyeztetés.**

**9. Nagy tét esetén ne az LLM legyen az egyetlen döntési pont.**

A következő modulban az LLM egy másik oldalát nézzük meg: hogyan használható **gondolkodási partnerként** ötleteléshez, összehasonlításhoz, tervezéshez, tanuláshoz és problémamegoldáshoz.