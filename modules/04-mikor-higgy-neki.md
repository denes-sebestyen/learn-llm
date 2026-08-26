# 4. modul – Mikor hihetsz neki, és mikor ne?

## Mit fogsz megtanulni?

Az előző modulokban azt néztük meg, hogyan lehet egy LLM-től jobb választ kapni, és hogyan lehet a beszélgetés során fokozatosan eljutni a használható eredményhez.

Most egy másik kérdés kerül előtérbe:

> **Honnan tudhatod, hogy a kapott válasz helyes?**

A rövid válasz az, hogy sokszor nem tudhatod pusztán a válasz szövegéből.

A modul végére:

- felismered, miért nem bizonyíték a magabiztos megfogalmazás;
- ismerni fogsz néhány gyakori LLM-hibát;
- különbséget tudsz tenni olyan feladatok között, ahol egy tévedés alig számít, és olyanok között, ahol komoly következménye lehet;
- tudni fogod, milyen jelek esetén érdemes különösen óvatosnak lenni;
- és kialakítasz egy egyszerű kockázatalapú gondolkodásmódot a válaszok kezelésére.

A következő modulban majd azt is részletesen megnézzük, **hogyan lehet ellenőrizni** egy választ. Itt először azt tanuljuk meg felismerni, **mikor van erre szükség**.

---

# 1. A jól hangzó válasz nem feltétlenül igaz

Az LLM-ek egyik legmegtévesztőbb tulajdonsága éppen az, amiben nagyon jók: természetes, gördülékeny szöveget tudnak létrehozni.

Hasonlítsd össze ezt a két mondatot:

> Talán 1987 körül jelenhetett meg, de ebben nem vagyok biztos.

és:

> A könyv első magyar kiadása 1987-ben jelent meg az Európa Könyvkiadónál, Kovács András fordításában.

A második sokkal megbízhatóbbnak **hangzik**. Pontos évszámot, kiadót és nevet tartalmaz.

De ezek a részletek önmagukban semmit nem bizonyítanak.

Ha a modell téves információt állított elő, a konkrét részletek akár még veszélyesebbé is tehetik a választ, mert hitelesebbnek tűnik.

> **A nyelvi magabiztosság és a tényszerű megbízhatóság két külön tulajdonság.**

Ez különösen fontos, mert emberekkel beszélgetve sokszor használjuk a beszélő bizonytalanságát jelző nyelvi jeleket. Ha valaki azt mondja, hogy „nem emlékszem pontosan”, tudjuk, hogy érdemes ellenőrizni.

Egy LLM azonban téves állítást is megfogalmazhat teljesen természetes és határozott módon.

---

# 2. Mi az a hallucináció?

Az első modulban már találkoztunk a **hallucináció** kifejezéssel.

Ezzel általában azt a jelenséget nevezzük meg, amikor a modell valótlan vagy nem megalapozott információt állít elő úgy, mintha az tényszerű válasz lenne.

Például elképzelhető, hogy egy nem létező:

- könyvcímet;
- tanulmányt;
- idézetet;
- személyt;
- jogszabályhelyet;
- eseményt;
- webcímet

ad meg.

Vagy valós dolgokat kapcsol össze tévesen: létező könyvhöz rossz szerzőt, létező eseményhez rossz dátumot, valódi személyhez olyan mondatot, amelyet soha nem mondott.

A hallucináció nem feltétlenül látványos képtelenség.

Sőt, gyakran éppen azért nehéz felismerni, mert **hihető**.

## Nem hazugság a szó hétköznapi értelmében

A „hallucináció” szó sem tökéletes, de érdemes kerülni azt a mentális modellt, hogy az LLM „hazudik”.

A hazugság általában azt jelenti, hogy valaki tudja vagy hiszi, hogy valami nem igaz, mégis szándékosan mást állít.

Egy LLM hibás válaszánál nem szükséges ilyen szándékot feltételeznünk.

A gyakorlati következmény azonban ugyanaz marad:

> **attól, hogy a modell állít valamit, az állítás még ellenőrzésre szorulhat.**

---

# 3. Nem minden hiba hallucináció

Az LLM többféleképpen adhat rossz vagy használhatatlan választ.

Fontos ezt felismerni, mert a „hallucinálhat” figyelmeztetés önmagában túl szűk képet ad.

## Félreértheti a kérdést

Lehet, hogy a válasz önmagában helyes, csak nem arra a kérdésre válaszol, amelyre gondoltál.

Például:

> Melyik a legjobb bankkártya külföldre?

A „legjobb” jelentheti a legalacsonyabb devizaváltási költséget, a legjobb utasbiztosítást, a legszélesebb elfogadottságot vagy valami mást.

Ha a modell rosszul találja ki a szempontodat, akár teljesen helyes információkból is számodra rossz ajánlás születhet.

## Lehet hiányos

A válasz tartalmazhat igaz állításokat, miközben kihagy egy fontos körülményt.

Ez különösen összehasonlításoknál és döntési helyzeteknél veszélyes. Ha öt fontos szempontból négyet bemutat, az eredmény ettől még lehet félrevezető.

## Túlságosan leegyszerűsíthet

Az egyszerű magyarázat hasznos, de néha egy fontos kivétel vagy feltétel eltűnik belőle.

Ezért jó kérdés lehet:

> Mit egyszerűsítettél le ebben a magyarázatban?

vagy:

> Van fontos kivétel, amit a rövidség kedvéért kihagytál?

## Lehet elavult

Egy állítás korábban igaz lehetett, de mára megváltozhatott.

Különösen ilyenek:

- árak;
- menetrendek;
- nyitvatartások;
- jogszabályok;
- tisztségviselők;
- termékek és szolgáltatások;
- szoftverek működése;
- hírek és aktuális események.

Azt, hogy az adott LLM vagy alkalmazás mennyire friss információhoz fér hozzá, nem érdemes automatikusan feltételezni.

## Hibásan következtethet

A kiinduló adatok akár helyesek is lehetnek, de a belőlük levont következtetés hibás lehet.

Ez matematikai, logikai, tervezési vagy összehasonlítási feladatoknál is előfordulhat.

Vagyis nem elég mindig csak azt kérdezni:

> „Igazak-e a felhasznált adatok?”

Néha azt is ellenőrizni kell:

> „Valóban következik-e belőlük ez az eredmény?”

---

# 4. Az LLM nem feltétlenül tudja jól, mit nem tud

Nagyon értékes tulajdonság lenne, ha egy rendszer minden esetben pontosan felismerné saját bizonytalanságát.

Az LLM-ek erre bizonyos helyzetekben képesek: mondhatják, hogy nem biztosak valamiben, kérhetnek további információt vagy jelezhetik, hogy ellenőrzés szükséges.

Erre azonban nem lehet tökéletesen támaszkodni.

Előfordulhat, hogy:

- helyes válaszban bizonytalan;
- hibás válaszban magabiztos;
- felismeri, hogy nincs elég információja;
- vagy éppen kitölti a hiányt egy hihető feltételezéssel.

Ezért a következő kérdés:

> Biztos vagy benne?

hasznos lehet arra, hogy a modell újragondolja a válaszát, de **nem ellenőrzési módszer**.

Ha erre azt válaszolja:

> Igen, biztos vagyok benne.

attól még nem kaptunk új bizonyítékot.

És ha azt mondja:

> Igazad van, tévedtem.

az sem bizonyítja automatikusan, hogy a felhasználó javítása volt helyes.

A következő modulban részletesen foglalkozunk majd azzal, hogyan kérhetünk valódi ellenőrizhető alapot egy állításhoz.

---

# 5. A kérdésedben is lehet hiba

Nemcsak az LLM tévedhet.

Tegyük fel, hogy ezt kérdezed:

> Miért tiltották be 2019-ben Kovács Péter könyvét Franciaországban?

A kérdés már tartalmaz egy állítást: azt, hogy a könyvet 2019-ben Franciaországban betiltották.

Mi történjen, ha ez valójában nem igaz?

Egy jó válasz először megkérdőjelezheti vagy ellenőrizheti az előfeltevést.

De előfordulhat, hogy a modell egyszerűen elfogadja, majd magyarázatot épít rá.

Így akár egy teljesen kitalált eseményhez is születhet hihető háttértörténet.

Ezt **hamis premisszának** vagy hibás előfeltevésnek nevezhetjük.

Érdemes ezért különösen óvatosnak lenni az olyan kérdésekkel, amelyek már magukban hordozzák a választ:

> Miért káros X?

> Miért bukott meg Y?

> Hogyan bizonyította Z, hogy...?

Ha magában az alapállításban sem vagy biztos, semlegesebb kérdés jobb lehet:

> Mit tudunk X hatásairól? Milyen bizonyítékok szólnak a káros és a nem káros hatás mellett?

vagy:

> Először ellenőrizd, hogy valóban megtörtént-e ez az esemény. Ha igen, utána magyarázd el az okait.

---

# 6. Az egyetértés nem bizonyíték

Az előző modulban már láttuk, hogy egy LLM-et beszélgetés közben ki lehet javítani.

Ez nagyon hasznos, amikor például a saját helyzetedről adtál rossz adatot:

> Bocsánat, nem tíz, hanem tizenkét vendég lesz.

Ilyenkor természetes, hogy a modell elfogadja az új információt.

Más a helyzet, ha egy külső tényről vitatkoztok:

> Nem 1987-ben jelent meg, hanem 1989-ben.

Ha a modell erre azt mondja:

> Igazad van, elnézést.

az önmagában nem bizonyítja, hogy 1989 a helyes év.

Lehetséges, hogy a felhasználó győzte meg a modellt egy téves állításról.

Ugyanez hosszabb érvelés során is megtörténhet. Ha a beszélgetésben fokozatosan elfogadtatunk bizonyos definíciókat vagy előfeltevéseket, a modell későbbi következtetése ezekből indulhat ki.

Ezután félrevezető lenne úgy idézni a végső választ, mintha az a saját állításunk **független megerősítése** lenne.

> **Ha te adtad a premisszákat, a modell következtetése nem bizonyítja visszamenőleg, hogy a premisszáid igazak voltak.**

Ez nem kizárólag LLM-probléma: ugyanilyen logikai hibát emberekkel folytatott vitában is elkövethetünk. Az LLM-ek együttműködő beszélgetési stílusa azonban különösen könnyűvé teheti.

---

# 7. Nem minden feladatnál ugyanannyira fontos a pontosság

Eddig sokat beszéltünk a hibákról. Ebből könnyű lenne arra következtetni, hogy minden LLM-választ hosszasan ellenőrizni kell.

Ez nem lenne praktikus.

Tegyük fel, hogy ezt kéred:

> Adj tíz fantázianevet egy fekete macskának.

Itt nincs igaz vagy hamis válasz. Ha egyik név sem tetszik, kérsz másikat.

Vagy:

> Fogalmazd át ezt a saját levelemet barátságosabbra.

A végeredményt te magad el tudod olvasni és eldönteni, megfelel-e.

Más helyzet:

> Mikor indul ma az utolsó vonat Bécsből Budapestre?

Ha a válasz téves, lekésheted a vonatot.

És megint más:

> Abbahagyhatom ezt a gyógyszert egyik napról a másikra?

Itt egy rossz válasznak egészségügyi következménye lehet.

A megfelelő óvatosság tehát **a feladat kockázatától függ**.

---

# 8. Tedd fel a kérdést: mi történik, ha téved?

Az első modulban már találkoztunk ezzel a kérdéssel. Most használjuk tudatos módszerként:

> **Mi történik, ha ez a válasz téves?**

Ez segít eldönteni, mennyi ellenőrzés indokolt.

## Alacsony következmény

Például:

- ötletelés;
- címjavaslatok;
- saját szöveg átfogalmazása;
- gyakorló kérdések készítése;
- egy történet szereplőinek kitalálása.

Ha a válasz rossz, általában azonnal észreveszed, vagy egyszerűen nem használod.

## Közepes következmény

Például:

- termék kiválasztása;
- utazás megtervezése;
- történelmi vagy tudományos ismeretek tanulása;
- egy nagyobb vásárlás előkészítése;
- technikai probléma megoldása.

Itt egy hiba időt vagy pénzt veszíthet, illetve téves tudást alakíthat ki. Már érdemes ellenőrizni a döntést érdemben befolyásoló állításokat.

## Magas következmény

Például:

- egészségügyi döntés;
- jogi határidő vagy kötelezettség;
- jelentős pénzügyi döntés;
- veszélyes eszköz vagy anyag használata;
- olyan döntés, amely más ember biztonságát is érinti.

Ilyenkor az LLM lehet hasznos **segédeszköz**, de a kritikus információt megfelelő, megbízható forrásból vagy szakembertől is ellenőrizni kell.

A határok természetesen nem mindig élesek. Egy egyszerű utazási tanács lehet alacsony kockázatú, egy vízumkövetelmény viszont ugyanazon utazás során már komoly következménnyel járhat.

Nem a témát kell tehát automatikusan besorolni, hanem a **konkrét állítás és döntés következményét**.

---

# 9. Két külön kérdés: mekkora az esélye, és mekkora a következménye?

A kockázatot még pontosabban átgondolhatod két kérdéssel:

1. **Mennyire valószínű, hogy itt tévedés történhet?**
2. **Mekkora baj lenne, ha tévedés történne?**

Például egy egyszerű helyesírási javításnál a modell tévedhet, de a következmény általában csekély, és a hibát könnyű észrevenni.

Egy ritka gyógyszerkölcsönhatásnál lehet, hogy a válasz nagy része helyes, de egyetlen kihagyott részlet következménye is jelentős lehet.

Egy tegnapi sporteredménynél pedig a kérdés önmagában nem veszélyes, de ha a modell nem fér hozzá friss információhoz, nagyobb lehet az elavult vagy téves válasz esélye.

Ezért nem létezik olyan egyszerű szabály, hogy:

> „Az LLM válaszainak 80%-át el lehet hinni.”

A megbízhatóság feladatonként, információnként és körülményenként változik.

---

# 10. Mikor legyen különösen gyanús egy válasz?

Nincs olyan jel, amely önmagában biztosan bizonyítaná, hogy a válasz téves. Vannak azonban helyzetek, amelyekben érdemes megállni egy pillanatra.

## Nagyon konkrét adatot kapsz forrás nélkül

Például pontos:

- dátumot;
- százalékot;
- idézetet;
- oldalszámot;
- jogszabályhelyet;
- tanulmánycímet.

A pontosság látszata nem ugyanaz, mint az ellenőrzött pontosság.

## Kevéssé ismert vagy nehezen ellenőrizhető dologról kérdezel

Minél ritkább az információ, annál kevésbé érdemes arra hagyatkozni, hogy „biztos tudja”.

## Aktuális információról van szó

A „most”, „ma”, „jelenleg”, „legújabb” és hasonló szavak jó emlékeztetők arra, hogy friss forrásra lehet szükség.

## A válasz túl szépen illeszkedik ahhoz, amit hallani szerettél volna

Ez nem bizonyítja, hogy hibás.

De ha egy vitatott kérdésben a modell tökéletesen megerősíti az álláspontodat, érdemes lehet megkérdezni:

> Mi a legerősebb ellenérv ezzel szemben?

vagy:

> Milyen bizonyíték változtatná meg ezt a következtetést?

## A modell megváltoztatja a válaszát pusztán attól, hogy ellentmondasz neki

Ez lehet valódi önkorrekció is.

De ha fontos tényről van szó, az új válasz ugyanúgy ellenőrzést igényel, mint az első.

---

# 11. A forrással ellátott válasz sem automatikusan igaz

Egyes LLM-alapú alkalmazások képesek webes keresésre vagy források megjelölésére.

Ez jelentősen javíthatja az ellenőrizhetőséget.

De a forrás megjelenése még nem jelenti automatikusan, hogy:

- a forrás megbízható;
- a forrás valóban azt állítja, amit a modell neki tulajdonít;
- az információ aktuális;
- a forrás megfelelően értelmezi az eredeti adatot;
- a modell következtetése valóban következik belőle.

A forrás tehát nem egy „igaz” pecsét.

A nagy előnye az, hogy **van mit ellenőrizned**.

A következő modul éppen erről fog szólni: hogyan vizsgáljuk meg a forrásokat és hogyan ellenőrizzük ésszerűen az LLM állításait.

---

# 12. Nem az a cél, hogy ne bízz benne

A forráskritika könnyen átcsúszhat abba a hozzáállásba, hogy:

> „Az AI úgyis hazudik, semmit nem szabad elhinni neki.”

Ez ugyanolyan kevéssé hasznos, mint a feltétlen bizalom.

Ha egy saját szövegedet szeretnéd rövidebbre fogalmazni, látod az eredményt és el tudod dönteni, megfelelő-e.

Ha ötleteket kérsz, nem feltétlenül létezik egyetlen tényszerűen helyes válasz.

Ha egy dokumentumot összefoglaltatsz, az eredeti dokumentum rendelkezésedre áll az ellenőrzéshez.

Ha viszont egy ismeretlen tényt kérdezel, más a helyzet.

A cél tehát nem az, hogy minden válasszal szemben bizalmatlan legyél, hanem hogy **a megfelelő mértékű bizalmat válaszd az adott feladathoz**.

> **Ne azt kérdezd: „Megbízható-e az AI?”**
>
> **Inkább azt: „Mennyire kell megbízhatónak lennie ennek a válasznak, és miből tudom ezt megállapítani?”**

---

# Gyakorlat – Mennyire ellenőriznéd?

Az alábbi helyzetekben gondold végig:

- mi történhet, ha a válasz téves;
- mennyire könnyű észrevenni a hibát;
- ellenőriznéd-e más forrásból;
- ha igen, mit ellenőriznél belőle.

### 1.

> Írj öt vicces nevet egy kocsmakvíz-csapatnak.

### 2.

> Foglald össze ezt az általam feltöltött, tízoldalas szerződést közérthetően.

### 3.

> Milyen időpontokban indul holnap busz a repülőtérre?

### 4.

> Egy 18. századi magyar költőről olvasok. Melyik művében szerepel ez az idézet?

### 5.

> A növényem levelei barnulnak. Mi lehet az oka?

### 6.

> Ezt írta az orvos a leletemre. Magyarázd el, mit jelent közérthetően.

### 7.

> A szerződésem alapján meddig mondhatom fel kötbér nélkül a szolgáltatást?

### 8.

> Segíts háromféle elrendezést kitalálni a nappalimhoz.

Figyeld meg, hogy nem feltétlenül a teljes feladatot kell „megbízhatónak” vagy „megbízhatatlannak” minősíteni.

Egy szerződés összefoglalása például nagyon hasznos lehet, miközben egy konkrét jogi határidőt már érdemes az eredeti szövegben is ellenőrizni.

---

# Kísérlet – Meg tudod győzni?

Válassz egy egyszerű, könnyen ellenőrizhető tényt, amelyben biztos vagy. Ne válassz egészségügyi, jogi, pénzügyi vagy más kockázatos témát.

Indíts új beszélgetést, és kérdezd meg az LLM-et a tényről.

Ezután állítsd udvariasan az ellenkezőjét:

> Szerintem ez nem így van. Nem lehet, hogy inkább ...?

Ha kitart az eredeti válasz mellett, kérdezd meg, mi alapján teszi.

Ha elfogadja a javításodat, kérdezd meg:

> Mi alapján döntöttél úgy, hogy nekem van igazam?

Végül ellenőrizd a tényt egy megbízható külső forrásból.

A kísérlet célja nem az, hogy „becsapd” a modellt. Azt figyeld meg, hogy **az egyetértés és a tényszerű ellenőrzés nem ugyanaz a folyamat**.

---

# Amit ebből a modulból érdemes megjegyezni

**1. A magabiztos megfogalmazás nem bizonyítja, hogy a válasz helyes.**

**2. Az LLM nemcsak hallucinációval hibázhat.**

Félreértheti a kérdést, kihagyhat fontos részletet, túlzottan leegyszerűsíthet, elavult információt használhat vagy hibás következtetést vonhat le.

**3. A „Biztos vagy benne?” nem helyettesíti az ellenőrzést.**

A modell saját magabiztossága nem külső bizonyíték.

**4. A kérdésed előfeltevése is lehet téves.**

Ne kérj magyarázatot egy állításra anélkül, hogy szükség esetén magát az állítást is ellenőriznéd.

**5. Az LLM egyetértése nem bizonyítja, hogy igazad van.**

Különösen akkor nem, ha a következtetéshez vezető premisszákat te adtad meg.

**6. Nem minden válasz igényel ugyanolyan ellenőrzést.**

Tedd fel a kérdést: **mi történik, ha téved?**

**7. A forrás megjelölése nagy segítség, de nem automatikus garancia.**

A következő modulban azt nézzük meg, hogyan lehet a gyakorlatban **forrásokat vizsgálni és egy LLM állításait ellenőrizni**.