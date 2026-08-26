# 5. modul – Források és ellenőrzés

## Mit fogsz megtanulni?

Az előző modulban azt vizsgáltuk, mikor érdemes óvatosnak lenned egy LLM válaszával, és hogyan gondolkodhatsz a tévedés kockázatáról.

Most jön a következő kérdés:

> **Ha ellenőrizni szeretnék valamit, hogyan tegyem?**

A modul végére:

- meg tudod különböztetni az állítást a forrástól;
- tudni fogod, miért fontos az eredeti vagy elsődleges forrás;
- felismered, hogy több találat nem feltétlenül jelent több független bizonyítékot;
- tudni fogod, mit érdemes ellenőrizni egy hivatkozáson;
- tudsz LLM-et használni a forráskeresés segítésére anélkül, hogy magát az LLM-et tekintenéd bizonyítéknak;
- és kialakíthatsz egy egyszerű, kockázathoz igazított ellenőrzési rutint.

A cél nem az, hogy minden mondat után nyomozást indíts.

A cél az, hogy amikor **számít a pontosság**, tudd, hogyan lehet az információt ésszerűen ellenőrizni.

---

# 1. Az állítás nem ugyanaz, mint a forrás

Tegyük fel, hogy egy LLM ezt írja:

> A múzeum hétfőnként zárva tart.

Ez egy **állítás**.

Ha alatta szerepel egy hivatkozás a múzeum hivatalos nyitvatartási oldalára, az egy lehetséges **forrás** az állítás ellenőrzéséhez.

A kettőt érdemes fejben különválasztani.

Ugyanez igaz akkor is, ha az információt nem LLM-től kapod.

Egy barátod mondhatja:

> Úgy tudom, hétfőn zárva van.

Egy újságcikk írhatja:

> A múzeum hétfőnként nem látogatható.

Egy közösségi médiás bejegyzés állíthatja ugyanezt.

Ezek mind közölnek egy állítást. Attól azonban még külön kérdés marad:

> **Miből tudjuk, hogy igaz?**

Ez a forráskritika egyik legegyszerűbb, de legfontosabb kérdése.

---

# 2. A forrás nem attól jó, hogy ismert

Könnyű olyan rövid szabályokat kialakítani, mint:

- „a nagy újságok megbízhatók”;
- „a Wikipédia nem megbízható”;
- „a hivatalos oldal mindig igaz”;
- „a közösségi média nem forrás”.

A valóság ennél összetettebb.

Egy forrás értékét mindig az adott állításhoz érdemes vizsgálni.

Ha azt szeretnéd tudni, mikor indul egy adott vonat, a vasúttársaság aktuális menetrendje valószínűleg jobb kiindulópont, mint egy három évvel ezelőtti, egyébként kiváló újságcikk.

Ha azt szeretnéd tudni, hogy egy vállalat szerint milyen szolgáltatásokat nyújt, a vállalat saját oldala elsődleges információforrás lehet.

Ha viszont azt szeretnéd tudni, hogy a szolgáltatással mennyire elégedettek az ügyfelek, ugyanennek a vállalatnak a marketingoldala már nem feltétlenül a legjobb forrás.

> **Nem létezik minden kérdésre egyetlen „megbízható oldalak” lista. A forrásnak az állításhoz kell illeszkednie.**

---

# 3. Elsődleges és másodlagos forrás

Hasznos különbséget tenni **elsődleges** és **másodlagos** források között.

Egyszerűsítve:

- az **elsődleges forrás** közvetlenül kapcsolódik ahhoz az eseményhez, adathoz vagy döntéshez, amelyről információt keresel;
- a **másodlagos forrás** értelmezi, összefoglalja vagy továbbadja az elsődleges információt.

Például ha egy új jogszabály tartalmát szeretnéd ellenőrizni:

- maga a kihirdetett jogszabály elsődleges forrás;
- egy ügyvédi iroda magyarázó cikke másodlagos forrás;
- egy újságcikk, amely összefoglalja a változást, szintén másodlagos forrás lehet.

Ez nem jelenti azt, hogy az elsődleges forrás mindig **hasznosabb**.

Egy jogszabály szövege például pontos lehet, de laikusként nehéz értelmezni. Egy jó szakmai magyarázat sokkal érthetőbbé teheti.

Gyakran a kettő együtt a legerősebb:

> **elsődleges forrás a tény ellenőrzéséhez + jó másodlagos forrás az értelmezéshez.**

## Más példák

Egy kutatás eredményénél:

- az eredeti tanulmány lehet elsődleges forrás;
- az azt bemutató tudományos-ismeretterjesztő cikk másodlagos.

Egy vállalat negyedéves eredményénél:

- a vállalat hivatalos pénzügyi jelentése elsődleges forrás;
- egy gazdasági lap elemzése másodlagos.

Egy politikus nyilatkozatánál:

- a teljes beszéd vagy eredeti interjú lehet elsődleges forrás;
- az arról szóló híradás másodlagos.

Az elsődleges forrás különösen hasznos lehet annak ellenőrzésére, hogy **valóban elhangzott vagy le lett-e írva az, amit valaki neki tulajdonít**.

---

# 4. A forrásnak is lehet érdeke

Az, hogy valami elsődleges forrás, nem jelenti azt, hogy semleges.

Ha egy vállalat azt írja:

> Termékünk kategóriájának legjobb választása.

az valóban első kézből mutatja meg, **mit állít a vállalat a saját termékéről**.

De ettől még nem bizonyítja, hogy a termék valóban a legjobb.

Hasonlóképpen egy politikai párt saját közleménye kiváló forrás lehet arra a kérdésre:

> Mit állít erről a párt?

De önmagában gyenge forrás lehet arra:

> Objektíven mi történt?

Érdemes tehát megkérdezni:

> **Milyen helyzetben van a forrás az állításhoz képest, és milyen érdeke lehet?**

Ez nem azt jelenti, hogy az érdekelt forrás automatikusan hazudik.

Azt jelenti, hogy tudnunk kell, **mire bizonyíték**.

---

# 5. Nyisd meg a forrást

Az LLM-ek és a keresőmotorok egyre gyakrabban jelenítenek meg hivatkozásokat közvetlenül a válasz mellett.

Ez nagyon hasznos.

De a hivatkozás puszta jelenléte még nem fejezi be az ellenőrzést.

Tegyük fel, hogy egy válasz ezt állítja:

> Egy 2024-es kutatás szerint a résztvevők 68%-a jobban teljesített az új módszerrel. [forrás]

A hivatkozás léte önmagában nem bizonyítja, hogy:

- a tanulmány valóban létezik;
- valóban ezt mérte;
- valóban 68% szerepel benne;
- a szám ugyanarra a csoportra vonatkozik;
- a tanulmány következtetése valóban az, amit a válasz állít.

Ha az állítás fontos, **nyisd meg a forrást**.

A következőket érdemes megnézni:

1. Valóban oda vezet a hivatkozás, ahová számítasz?
2. Ki készítette a forrást?
3. Mikor készült vagy frissült?
4. Tényleg megtalálható benne az állítás?
5. Ugyanabban az értelemben szerepel benne, ahogy az LLM összefoglalta?

Ez utóbbi különösen fontos.

Egy forrás lehet valódi, miközben a rá épülő összefoglalás téves.

---

# 6. Ellenőrizd a dátumot

Sok információ nem egyszerűen igaz vagy hamis.

**Időhöz kötött.**

Például:

- nyitvatartás;
- ár;
- menetrend;
- tisztségviselő neve;
- jogszabály;
- szoftver funkciói;
- utazási szabályok;
- gazdasági adatok.

Egy öt évvel ezelőtti oldal lehet teljesen hiteles forrás arra, hogy **akkor** mi volt igaz, és teljesen alkalmatlan arra, hogy ma mi igaz.

Ezért aktuális kérdésnél mindig nézd meg:

> **Mikor készült ez az információ, és azóta változhatott-e?**

Nem minden oldalon látszik könnyen a dátum. Ilyenkor érdemes másik, frissebb forrást is keresni.

---

# 7. Két oldal nem feltétlenül két forrás

Tegyük fel, hogy találsz három cikket, amelyek ugyanazt állítják.

Ez elsőre három megerősítésnek tűnhet.

De lehet, hogy:

- a második cikk az elsőt idézi;
- a harmadik ugyanazt a sajtóközleményt dolgozza fel;
- mindhárom ugyanarra az egyetlen kutatásra hivatkozik;
- az egyik oldal egyszerűen átvette a másik szövegét.

Ebben az esetben nem három független bizonyítékod van.

Lehet, hogy valójában **egyetlen információ terjed három helyen**.

Ez különösen gyorsan történhet hírek, közösségi média és látványos statisztikák esetén.

> **A források száma és a független bizonyítékok száma nem ugyanaz.**

Ha egy állítás fontos, érdemes megpróbálni visszakövetni:

> Honnan származik eredetileg?

---

# 8. Az LLM sem több független forrás

Ez az előző modulban látott jelenség egy másik oldala.

Tegyük fel, hogy megkérdezel három különböző LLM-et ugyanarról, és mindhárom ugyanazt válaszolja.

Ez növelheti a bizalmadat abban, hogy az állítás valószínűleg helyes, de **nem tekinthető három független forrásnak**.

A modellek:

- tanulhattak részben ugyanazokból a nyilvános szövegekből;
- ugyanazt a széles körben terjedő tévedést ismerhetik;
- hasonló következtetési hibát követhetnek el;
- ugyanarra a webes forrásra támaszkodhatnak.

Még kevésbé független ellenőrzés, ha ugyanazt a modellt kérdezed meg többször.

> **„Háromszor ugyanazt mondta” nem ugyanaz, mint „három egymástól független forrás megerősítette”.**

Az LLM nagyon hasznos lehet abban, hogy **forrásokat keress**, de az ellenőrzéshez végül érdemes eljutni magukhoz a forrásokhoz.

---

# 9. Az LLM segíthet forrást keresni

Nem kell választanod a „használok LLM-et” és a „forrásból ellenőrzök” között.

A kettő jól kiegészítheti egymást.

Például:

> Milyen elsődleges forrásból tudnám ellenőrizni ezt az állítást?

> Keress hivatalos forrást ehhez az információhoz.

> Ez a cikk egy kutatásra hivatkozik. Segíts megtalálni az eredeti tanulmányt.

> Milyen kulcsszavakkal érdemes rákeresnem az eredeti dokumentumra?

> Mutasd meg, melyik forrás támasztja alá a válaszodnak ezt a részét.

Ha az alkalmazás képes internetes keresésre, akár közvetlenül is segíthet megtalálni ezeket.

De tartsd meg a különbséget:

> **Az LLM segít megtalálni a bizonyítékot. A bizonyíték maga nem az LLM válasza.**

---

# 10. „Honnan tudod?” és „Biztos vagy benne?”

Az előző modulban már láttuk, hogy ez:

> Biztos vagy benne?

nem különösebben erős ellenőrzési módszer.

A modell mondhatja azt, hogy igen, majd továbbra is tévedhet.

Hasznosabb kérdések lehetnek:

> Milyen forrás alapján állítod ezt?

> Van ehhez elsődleges forrás?

> Melyik része biztosan ellenőrzött tény, és melyik a következtetésed?

> Keress olyan forrást is, amely alapján kiderülhetne, hogy ez téves.

> Nyisd meg a forrást, és ellenőrizd, hogy tényleg ezt állítja-e.

Ezek sem teszik tévedhetetlenné a modellt.

Viszont az egyszerű önbizalom-kérdés helyett **ellenőrizhető információ felé terelik a beszélgetést**.

---

# 11. Ne csak megerősítést keress

Tegyük fel, hogy úgy gondolod:

> A kávé kiszárítja a szervezetet.

Ha ezt kérdezed:

> Keress bizonyítékot arra, hogy a kávé kiszárít.

akkor már előre meghatároztad, milyen irányú információt keresel.

Lehet, hogy találni fogsz valamit, ami támogatja az elképzelésedet, miközben figyelmen kívül maradnak az ellenkező bizonyítékok.

Ez nem csak LLM-probléma. Az emberek is hajlamosak könnyebben keresni, észrevenni vagy nagyobb súllyal kezelni azokat az információkat, amelyek megerősítik azt, amit már eleve gondolnak. Ezt a hajlamot **megerősítési torzításnak** nevezzük.

Jobb lehet például:

> Mit mutatnak a megbízható források a kávé és a hidratáció kapcsolatáról? Keress olyan bizonyítékokat is, amelyek ellentmondanak az első következtetésnek.

Vagy:

> Milyen bizonyíték szól az állítás mellett és ellene?

Ez különösen fontos vitatott kérdéseknél.

> **Az ellenőrzés célja nem az, hogy bizonyítékot találjunk arra, amit már gondolunk, hanem hogy kiderítsük, mennyire állja meg a helyét.**

---

# 12. Vigyázz a kérdésbe rejtett állítással

Térjünk vissza egy korábbi problémára.

Tegyük fel, hogy ezt kérdezed:

> Miért tiltották be 2019-ben X könyvét Franciaországban?

A kérdés már tartalmaz egy állítást:

> X könyvét 2019-ben betiltották Franciaországban.

Ha ez nem igaz, akkor az erre épülő magyarázat lehet nagyon részletes és teljesen értéktelen.

Ezért különösen akkor, ha magát az alapállítást sem tudod biztosan, érdemes így kérdezni:

> Úgy hallottam, hogy X könyvét 2019-ben betiltották Franciaországban. Ellenőrizd először, hogy ez valóban megtörtént-e. Ha igen, magyarázd el az okát.

Ez a gondolat általánosítható:

> **Előbb ellenőrizd a premisszát, csak utána kérj rá épülő magyarázatot.**

---

# 13. Az „AI is elismerte” nem bizonyíték

Egy LLM-mel folytatott beszélgetés során könnyű eljutni egy olyan válaszhoz, amely látszólag megerősíti a saját álláspontodat.

Például hosszabb beszélgetésben közösen kialakítotok egy definíciót:

> Ha X fogalmon olyan tulajdonságot értünk, amelyhez A, B és C szükséges...

majd a modell ebből következtet:

> Ebben az értelemben Y valóban nem tekinthető X-nek.

Ha ezután csak az utolsó mondatot idézed:

> „Az AI is elismerte, hogy Y nem X.”

akkor eltűnik az a feltételrendszer, amelyből a következtetés származott.

Lehetséges, hogy az LLM logikailag teljesen helyesen követte **az általad megadott premisszákat**.

Ez azonban nem teszi ezeket a premisszákat függetlenül igazolttá.

> **Ha te adtad meg a kiinduló feltételeket, az LLM következtetése nem független bizonyíték arra, hogy a kiinduló feltételeid helyesek.**

Ezért egy LLM-beszélgetésből kiragadott mondatnál ugyanúgy fontos a kontextus, mint bármilyen más idézetnél.

Érdemes megkérdezni:

- Milyen kérdésre válaszolt?
- Milyen definíciókat használtak előtte?
- Milyen feltételeket fogadott el a beszélgetésben?
- Ugyanerre jutott volna semleges kiindulópontból is?

---

# 14. Egy idézetet is ellenőrizni kell

Az LLM-ek néha idézőjelben adnak vissza szöveget.

Ez különösen hitelesnek tűnhet:

> „A tudomány célja nem a bizonyosság, hanem a jobb magyarázat.” – Valaki

Az idézőjel azonban nem garancia arra, hogy:

- az illető valóban ezt mondta;
- pontosan így mondta;
- nem egy parafrázis alakult át idézetté;
- a mondat nem került ki az eredeti kontextusából.

Ha egy idézetet tovább szeretnél adni, különösen névvel együtt, érdemes megkeresni az eredeti vagy egy megbízhatóan dokumentált forrást.

Ugyanez vonatkozik statisztikákra és pontos számokra.

A nagyon konkrét részlet **nem bizonyíték arra, hogy ellenőrzött**.

---

# 15. Forráslánc: kövesd vissza, ameddig érdemes

Képzeld el ezt a láncot:

> közösségi médiás bejegyzés → blog → újságcikk → sajtóközlemény → kutatás

Mindegyik oldal hivatkozhat a következőre.

Ha csak a blogig jutsz el, még mindig lehet, hogy ugyanazt az értelmezést olvasod újra.

Fontos állításnál érdemes lehet továbbmenni az eredeti kutatásig.

De nem kell mindig a lánc végéig menni.

Ha egy megbízható szakmai szervezet közérthetően összefoglal egy bonyolult kutatási területet, sok hétköznapi kérdéshez ez teljesen megfelelő forrás lehet.

A kérdés ismét:

> **Mekkora bizonyosságra van szükségem ehhez a döntéshez?**

A forrásellenőrzés is legyen arányos a kockázattal.

---

# 16. Egy egyszerű ellenőrzési rutin

Ha fontos állítással találkozol, használhatsz egy rövid ellenőrzősort.

## 1. Mit állít pontosan?

Válaszd külön a tényt a véleménytől vagy következtetéstől.

## 2. Mi a forrás?

Van hivatkozás? Ki állítja? Honnan származik eredetileg?

## 3. A forrás tényleg alátámasztja?

Nyisd meg, és nézd meg, hogy valóban azt mondja-e.

## 4. Aktuális?

Számít a dátum? Változhatott az információ?

## 5. Független megerősítés kell?

Ha nagy a tét vagy vitatott az állítás, keress más eredetű forrást is.

## 6. Mi szólhat ellene?

Különösen akkor kérdezd meg, ha az eredmény pontosan azt mondja, amit eleve hallani szerettél volna.

Nem minden esetben kell mind a hat lépést végigjárni.

Egy étterem mai nyitvatartásánál lehet, hogy elég a hivatalos oldal friss adata.

Egy komoly egészségügyi vagy pénzügyi döntésnél ennél jóval több ellenőrzés indokolt lehet.

---

# Gyakorlat – Melyik forrást választanád?

Minden helyzetnél gondold végig:

1. Mi lenne jó elsődleges forrás?
2. Hasznos lenne-e másodlagos forrás is?
3. Számít-e különösen az információ dátuma?
4. Kell-e független megerősítés?

### 1. Egy múzeum holnapi nyitvatartása

Egy hároméves útikönyv, a múzeum hivatalos oldala, egy utazási blog és egy LLM-válasz áll rendelkezésedre.

Melyikkel kezdenél?

### 2. Egy új törvény rád vonatkozó hatása

Találsz egy közösségi médiás bejegyzést, egy újságcikket, a jogszabály szövegét és egy szakmai magyarázatot.

Melyik mire lehet jó?

### 3. Egy híres embernek tulajdonított idézet

Az idézet száz különböző idézetgyűjtő oldalon szerepel, de egyik sem jelöli meg, mikor és hol hangzott el.

A száz találat száz független bizonyíték?

### 4. Egy látványos egészségügyi statisztika

Egy cikk szerint „egy kutatás bizonyította”, hogy egy bizonyos szokás 70%-kal csökkenti egy betegség kockázatát.

Mit ellenőriznél, mielőtt továbbadnád ezt az állítást?

### 5. Egy LLM háromszor ugyanazt válaszolja

Ugyanazt a kérdést három új beszélgetésben teszed fel, és mindhárom alkalommal ugyanazt a választ kapod.

Mennyivel lett erősebb a bizonyíték?

Mit tehetnél helyette?

---

# Kísérlet – Kövesd vissza a forrást

Válassz egy olyan konkrét tényállítást, amely:

- érdekel;
- nem túl nagy kockázatú;
- és ellenőrizhető nyilvános forrásból.

Például:

> Mikor nyitott meg egy általad ismert múzeum?

> Mekkora egy ismert épület magassága?

> Mikor jelent meg egy könyv első kiadása?

> Melyik évben alapítottak egy céget?

Kérdezz meg róla egy internetes keresésre képes LLM-et.

Ezután ne állj meg a válasznál.

1. Nézd meg, milyen forrásokat adott.
2. Nyiss meg legalább egyet.
3. Keresd meg benne azt a részt, amely az állítást alátámasztja.
4. Nézd meg, hogy a forrás maga hivatkozik-e egy korábbi forrásra.
5. Ha igen, próbálj egy lépéssel közelebb jutni az eredeti információhoz.

Végül kérdezd meg magadtól:

- Az LLM pontosan foglalta össze a forrást?
- A hivatkozás valóban az állítást támasztotta alá?
- Találtál olyan részletet, amely elveszett az összefoglalásban?
- Mennyivel vagy biztosabb az állításban most, mint amikor csak az LLM válaszát láttad?

---

# Amit ebből a modulból érdemes megjegyezni

**1. Az állítás és a forrás két külön dolog.**

Az, hogy valaki vagy egy LLM mond valamit, még nem mutatja meg, miből tudjuk, hogy igaz.

**2. A jó forrás az adott kérdéshez illik.**

Nem létezik egyszerű lista arról, hogy melyik weboldal „mindig megbízható”.

**3. Az elsődleges forrás közelebb vihet az eredeti információhoz, de nem feltétlenül semleges vagy könnyen értelmezhető.**

**4. Nyisd meg a hivatkozást.**

Ellenőrizd, hogy valóban létezik, aktuális, és tényleg azt támasztja alá, amit a válasz állít.

**5. Több találat nem feltétlenül több független bizonyíték.**

Próbáld felismerni, ha több oldal ugyanabból az eredeti forrásból dolgozik.

**6. Több LLM egyetértése sem egyenlő több független forrással.**

**7. Az LLM nagyon hasznos lehet forráskeresésre.**

De a megtalált forrás a bizonyíték, nem az LLM magabiztossága.

**8. Ne csak azt keresd, ami megerősíti a meglévő véleményedet.**

Fontos kérdésnél nézd meg azt is, mi szólhat ellene.

**9. A kérdésed saját premisszáit is ellenőrizd.**

Ha egy magyarázat hamis kiinduló állításra épül, a részletes válasz sem lesz hasznos.

**10. Az ellenőrzés mértéke igazodjon a tét nagyságához.**

Nem kell minden hétköznapi kérdésből kutatási projektet csinálni.

A következő modulban azt nézzük meg részletesebben, hogyan változik mindez, amikor **aktuális információra van szükséged**, és az LLM internetes keresést vagy más friss adatforrást használ.