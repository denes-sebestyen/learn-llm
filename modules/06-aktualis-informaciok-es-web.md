# 6. modul – Aktuális információk és webhasználat

## Mit fogsz megtanulni?

Az előző modulban azt néztük meg, hogyan ellenőrizheted egy válasz forrásait.

Most egy különösen fontos kérdéssel foglalkozunk:

> **Honnan tudhat egy LLM olyasmit, ami tegnap, ma vagy akár néhány perce történt?**

A modul végére:

- megérted a különbséget a modell betanítása és az aktuális információ lekérése között;
- felismered, mely kérdésekhez szükséges friss adatforrás;
- tudni fogod, hogy az internetes keresés képessége alkalmazásonként és helyzetenként eltérhet;
- megérted, hogy a keresést használó LLM sem válik tévedhetetlenné;
- tudsz olyan kérést megfogalmazni, amelyben külön kéred a friss információ ellenőrzését;
- és felismered, amikor nem egyszerű weboldalra, hanem valamilyen speciális, élő adatforrásra van szükség.

---

# 1. Az LLM nem élő másolata az internetnek

Könnyű úgy elképzelni egy LLM-et, mintha egy hatalmas keresőmotor lenne, amely „tudja, mi van az interneten”.

Ez félrevezető kép.

A nagy nyelvi modelleket nagy mennyiségű adaton **betanítják**. A tanulás során nem egy kereshető könyvtárat építenek a forrásokból, hanem olyan mintázatokat sajátítanak el, amelyek alapján szöveget tudnak értelmezni és létrehozni.

Ezért egy önmagában működő LLM nem feltétlenül tudja:

- mi történt ma reggel;
- mennyibe kerül most egy repülőjegy;
- nyitva van-e ma egy üzlet;
- ki nyerte a tegnapi mérkőzést;
- megváltozott-e egy jogszabály;
- melyik egy szoftver legfrissebb verziója.

Ezekhez **friss információra** van szükség.

> **A modellben meglévő tudás és az aktuálisan lekért információ két külön dolog.**

---

# 2. Mi az a tudáshatár?

Egy modell betanításához felhasznált információknak van valamilyen időbeli határa. Gyakran ezt nevezik **tudáshatárnak** vagy angolul *knowledge cutoffnak*.

A pontos működés ennél bonyolultabb lehet: a szolgáltatók később is frissíthetik a modelleket, és az alkalmazás külső adatforrásokat is használhat.

A gyakorlati tanulság azonban egyszerű:

> **Ne feltételezd, hogy egy LLM saját belső tudása naprakész.**

Ha azt kérdezed:

> Ki Franciaország jelenlegi miniszterelnöke?

akkor a „jelenlegi” szó miatt a válasz helyessége attól is függ, **mikor ellenőrizték az információt**.

Ha azt kérdezed:

> Ki volt Franciaország miniszterelnöke 1995. január 1-jén?

az már történeti kérdés. Ehhez általában nincs szükség percre kész információra.

A kérdés tartalma tehát sokszor megmutatja, hogy szükséges-e friss adat.

---

# 3. Mikor gyanakodj arra, hogy friss információ kell?

Bizonyos szavak különösen árulkodók:

- most;
- ma;
- tegnap;
- jelenleg;
- legújabb;
- aktuális;
- idén;
- ezen a héten;
- legutóbbi;
- következő.

De nem mindig szerepel ilyen szó a kérdésben.

Például:

> Mennyibe kerül a belépő a Louvre-ba?

Ez valójában aktuális kérdés, mert az ár változhat.

Ugyanez igaz erre:

> Kell vízum Thaiföldre magyar állampolgárként?

Az utazási szabályok változhatnak, tehát egy régi, valaha helyes válasz ma már veszélyesen pontatlan lehet.

Más gyakori, időérzékeny területek:

- hírek;
- időjárás;
- árfolyamok;
- részvényárak;
- termékárak és készlet;
- menetrendek;
- nyitvatartás;
- események;
- sporteredmények;
- választási eredmények;
- jogszabályok és hatósági szabályok;
- szoftverek és online szolgáltatások aktuális funkciói.

---

# 4. „Keress rá” – amikor az LLM hozzáfér az internethez

Sok mai LLM-alapú alkalmazás képes internetes keresést használni.

Ilyenkor a rendszer leegyszerűsítve két külön feladatot végezhet:

1. **információt keres vagy lekér**, majd
2. **az LLM feldolgozza és összefoglalja** a megtalált információt.

Ez fontos különbség.

A friss tényt nem feltétlenül a modell „emlékezetéből” kapod. A modell lehet, hogy éppen most találta meg egy külső forrásban.

Ez közelebb hozza egymáshoz a keresőmotor és az LLM használatát, de a kettő nem válik ugyanazzá.

A keresőmotor hagyományosan találatokat ad, amelyeket neked kell átnézned. Az LLM képes a találatokat:

- összefoglalni;
- összehasonlítani;
- rendszerezni;
- a kérdésedhez igazítani;
- több forrásból közös választ készíteni.

Ez rendkívül kényelmes, de egy új hibalehetőséget is létrehoz:

> **A megtalált forrás lehet helyes, miközben az LLM rosszul értelmezi vagy foglalja össze.**

Ezért marad fontos az előző modul forráskritikája.

---

# 5. Nem minden LLM és nem minden beszélgetés keres a weben

A „ChatGPT”, „Gemini”, „Claude” vagy más hasonló név mögött nem feltétlenül mindig ugyanaz a képességkészlet működik.

Az internetes keresés függhet például:

- az alkalmazástól;
- a kiválasztott modelltől vagy módtól;
- az előfizetéstől;
- a feladattól;
- az engedélyezett eszközöktől;
- a szolgáltatás aktuális működésétől.

Ezért nem jó általános szabály:

> „Ez az AI tud internetezni.”

Pontosabb kérdés:

> **Ebben a beszélgetésben használ-e friss külső forrást ehhez a válaszhoz?**

Ha ez fontos, kérheted kifejezetten:

> Keress rá a jelenlegi információra, és adj forrásokat.

vagy:

> Ne csak a saját tudásodból válaszolj; ellenőrizd friss forrásból.

Az alkalmazás vagy modell lehet, hogy ezt nem tudja teljesíteni. Ilyenkor ennek kiderülése önmagában hasznos információ.

---

# 6. A keresőmotorok is használnak LLM-eket

A határ a keresőmotor és az LLM-alapú asszisztens között egyre kevésbé éles.

Egyes keresőmotorok a hagyományos találati lista mellett vagy előtt **LLM által készített összefoglalót** is megjelenítenek.

Ez kényelmes, mert sokszor már a keresési oldalon kapsz egy közvetlen választ.

De fontos felismerni, hogy ilyenkor két külön réteget látsz:

> **források / találatok → géppel készített összefoglalás**

A generált összefoglalás ugyanúgy:

- félreérthet egy forrást;
- túl általánosan fogalmazhat;
- kihagyhat fontos feltételt;
- több forrásból hibás következtetést vonhat le.

Ezért attól, hogy egy mondat **a keresőmotor tetején jelenik meg**, még nem válik automatikusan elsődleges forrássá.

Fontos kérdésnél érdemes megnyitni azokat az oldalakat, amelyekre az összefoglaló támaszkodik.

---

# 7. A friss keresés nem egyenlő a helyes válasszal

Tegyük fel, hogy azt kérdezed:

> Mi történt ma X ügyben?

Az LLM rákeres, talál öt friss cikket, majd összefoglalja őket.

Még mindig több dolog mehet félre:

- a legfontosabb friss forrás kimaradhat;
- a találatok egymást másolhatják;
- egy korai híradás később tévesnek bizonyulhat;
- az LLM összekeverhet két eseményt;
- egy véleményt tényként foglalhat össze;
- nem veszi észre, hogy egy újabb forrás már cáfolja a korábbit.

Gyorsan változó eseménynél különösen fontos az időbélyeg.

Egy 9:00-kor megjelent cikk és egy 15:00-kor megjelent frissítés ugyanazon a napon is egészen mást mondhat.

> **A „friss” információn belül is lehet régebbi és újabb.**

---

# 8. Hírek: különösen gyorsan változó információ

Egy folyamatban lévő esemény első óráiban gyakori, hogy a hírek:

- hiányosak;
- egymásnak ellentmondanak;
- névtelen vagy másodkézből származó információkra épülnek;
- később pontosításra vagy helyreigazításra szorulnak.

Ez nem feltétlenül jelenti azt, hogy valaki szándékosan félrevezetett.

Lehet, hogy egyszerűen **akkor még ennyit lehetett tudni**.

Ha fontos egy friss esemény pontos megértése, hasznos kérés lehet:

> Foglald össze, mit tudunk jelenleg biztosan, mi bizonytalan még, és mely állítások származnak csak egyetlen forrásból.

Vagy:

> Különítsd el a megerősített tényeket a korai beszámolóktól és feltételezésektől.

Ez jobb, mint egyszerűen azt kérdezni:

> Mi történt?

---

# 9. Dátum nélkül könnyű félreérteni a „most”-ot

Az LLM-mel folytatott beszélgetésben érdemes konkrét dátumokat használni, amikor az időpont számít.

Például:

> Milyen szabályok érvényesek jelenleg?

helyett szükség esetén pontosabb:

> Ellenőrizd, milyen szabályok vannak érvényben 2026. augusztus 27-én.

Ez különösen hasznos lehet akkor, ha:

- régi cikkeket is találhat a keresés;
- egy szabály nemrég változott;
- egy korábbi és egy új rendszer egyszerre szerepel a weben;
- később vissza akarod nézni a beszélgetést.

A konkrét dátum a válasz **érvényességi idejét** is láthatóbbá teszi.

---

# 10. Weboldal helyett néha élő adatforrás kell

Nem minden aktuális információt érdemes egyszerű webes kereséssel megszerezni.

Például:

- időjárás;
- árfolyam;
- repülőjárat állapota;
- éttermi foglalhatóság;
- sporteredmény;
- útvonal és forgalom;
- szabad szálláshely.

Ezekhez létezhet olyan adatbázis, szolgáltatás vagy programozási interfész, amely közvetlenül aktuális adatot ad.

Egy LLM-alapú alkalmazás ezeket is használhatja eszközként.

A felhasználó számára a válasz ugyanúgy egy beszélgetésben jelenik meg, de a háttérben nagyon más történhet:

> **LLM saját tudása → webes keresés → speciális adatforrás**

Ezek nem azonos megbízhatóságú és frissességű utak.

Például egy étterem általános weboldala megmutathatja a nyitvatartást, de abból nem feltétlenül derül ki, hogy **ma este 19:30-ra van-e még asztal négy főre**.

Ehhez foglalási rendszerből származó aktuális adat kellhet.

---

# 11. A „találtam a weben” sem mindig elég

A weben megtalálható információ minősége nagyon különböző.

Egy keresés eredménye lehet:

- hivatalos dokumentum;
- tudományos tanulmány;
- szakmai szervezet oldala;
- újságcikk;
- fórumhozzászólás;
- közösségi médiás poszt;
- reklám;
- automatikusan generált oldal;
- régi, már nem karbantartott tartalom.

A keresés tehát **hozzáférést ad az információhoz**, de nem végzi el helyetted teljesen a forráskritikát.

Ezért egy jó kérés nem feltétlenül csak ennyi:

> Keress rá.

Hanem például:

> Keress rá, és elsődlegesen hivatalos vagy elsődleges forrásokra támaszkodj.

Vagy:

> Ellenőrizd több, egymástól független friss forrásból.

A megfelelő kérés természetesen attól függ, mit szeretnél megtudni.

---

# 12. Mit jelent az, hogy „legfrissebb”?

A „legfrissebb” szó önmagában is több dolgot jelenthet.

Például:

> Mi a legfrissebb hír erről a cégről?

Jelentheti:

- a legutóbb publikált cikket;
- a legújabb tényleges eseményt;
- a legfrissebb hivatalos közleményt;
- a legutóbbi jelentős fejleményt.

Ezek nem feltétlenül ugyanazok.

Egy öt perce megjelent cikk például összefoglalhat egy három nappal ezelőtti eseményt. Közben lehet, hogy egy tegnapi hivatalos dokumentum fontosabb és újabb információt tartalmaz.

Ezért hasznos lehet pontosítani:

> A legutóbbi érdemi fejlemény érdekel, nem egyszerűen a legutóbb publikált cikk.

Ez jó példa arra, hogy az előző modulokban tanult **pontos kérés** és a **forráskritika** hogyan kapcsolódik az aktuális információhoz.

---

# 13. Kérj időpontot és forrást

Aktuális információnál egy egyszerű szokás sokat segíthet:

> **Mikor volt ez igaz, és miből tudjuk?**

Például:

> Mennyi most az euró árfolyama? Írd oda, milyen időpontra vonatkozik az adat, és honnan származik.

> Milyen utazási szabályok érvényesek? Ellenőrizd a hivatalos forrást, és írd oda, mikor frissítették.

> Mi a legújabb fejlemény? Minden fontos állításnál jelezd a forrás dátumát.

Ezzel két gyakori hibát csökkentesz:

- régi információt kapsz aktuálisként;
- nem derül ki, honnan származik a válasz.

---

# 14. Ha nincs friss hozzáférés, az is fontos válasz

Egy jó rendszernek nem kell mindenáron választ adnia.

Ha nem tud aktuális forrást elérni, a hasznos válasz lehet például:

> Nincs hozzáférésem a jelenlegi menetrendhez, ezért ezt nem tudom megbízhatóan megmondani.

Ez sokkal értékesebb, mint egy régi adatból magabiztosan kitalált válasz.

Felhasználóként ezért ne tekintsd kudarcnak, ha az LLM jelzi a korlátját.

> **A „nem tudom ellenőrizni” gyakran jobb válasz, mint a megalapozatlan bizonyosság.**

Ha tudod, kereshetsz másik eszközt vagy közvetlen forrást.

---

# 15. Egy egyszerű rutin aktuális kérdésekhez

Ha olyan dolgot kérdezel, amely változhatott, használhatod ezt az öt lépést.

## 1. Változhatott az információ?

Ha igen, ne elégedj meg automatikusan a modell belső tudásával.

## 2. Kérj friss ellenőrzést

Például:

> Ellenőrizd aktuális forrásból.

## 3. Nézd meg az időpontot

Mikor készült vagy frissült a forrás? Mikori állapotot ír le?

## 4. Nézd meg a forrás típusát

Weboldal, hivatalos adatbázis, élő szolgáltatás vagy csak egy másik összefoglaló?

## 5. Igazítsd az ellenőrzést a kockázathoz

Egy mozi műsoridejénél más szintű ellenőrzés indokolt, mint egy határátlépési szabálynál vagy pénzügyi döntésnél.

---

# Gyakorlat – Kell hozzá friss adat?

Döntsd el minden kérdésnél:

- elég lehet-e egy LLM belső tudása;
- érdemes-e webes keresést kérni;
- vagy inkább valamilyen speciális, aktuális adatforrás lenne megfelelő.

### 1. Mi a fotoszintézis?

### 2. Ki nyerte a tegnapi Forma–1-es futamot?

### 3. Mikor kezdődött az első világháború?

### 4. Mennyi most 100 euró forintban?

### 5. Nyitva van-e vasárnap egy adott gyógyszertár?

### 6. Hogyan működik általában a kamatos kamat?

### 7. Van-e ma este szabad szoba egy adott hotelben?

### 8. Milyen dokumentum kell jelenleg egy adott országba történő belépéshez?

Minden esetben indokold is meg a választásodat.

---

# Kísérlet – Ugyanaz a kérdés kétféleképpen

Válassz egy gyorsan változó, de alacsony kockázatú témát.

Például:

- egy sporteredmény;
- egy moziműsor;
- egy technológiai termék jelenlegi ára;
- egy múzeum aktuális belépőára.

Először kérdezd meg egyszerűen:

> Mennyi / mikor / mi a jelenlegi ...?

Jegyezd fel:

- adott-e forrást;
- jelezte-e, mikori az információ;
- látszik-e, hogy keresett.

Ezután új beszélgetésben kérdezd így:

> Ellenőrizd friss forrásból. Írd oda, milyen dátumra vagy időpontra vonatkozik az információ, és add meg azt a forrást, amelyből ellenőrizted.

Hasonlítsd össze a két választ.

Kérdezd meg magadtól:

- Ugyanaz lett az eredmény?
- Melyik válasz ellenőrizhetőbb?
- Megváltozott-e a saját bizalmad a válaszban?
- A második kérés valóban jobb forrást eredményezett, vagy csak részletesebbnek tűnt?

Az utolsó kérdés fontos: **a részletesebb válasz nem automatikusan megbízhatóbb válasz.**

---

# Amit ebből a modulból érdemes megjegyezni

**1. Az LLM belső tudása nem feltétlenül aktuális.**

A modell betanítása és a jelenlegi információ lekérése két külön folyamat.

**2. Ismerd fel az időérzékeny kérdéseket.**

Árak, hírek, nyitvatartás, menetrend, szabályok és hasonló adatok változhatnak.

**3. Ha számít a frissesség, kérj aktuális ellenőrzést.**

Ne feltételezd automatikusan, hogy a rendszer keresett a weben.

**4. A webes keresés sem teszi tévedhetetlenné az LLM-et.**

A modell a helyes forrást is félreértheti vagy rosszul foglalhatja össze.

**5. A keresőmotor LLM-es összefoglalója is generált válasz.**

Fontos állításnál nézd meg a mögötte lévő forrásokat.

**6. A dátum az információ része.**

Aktuális adatnál kérdezd meg: mikor volt ez igaz?

**7. Nem mindenhez egyszerű webes keresés a legjobb eszköz.**

Egyes kérdésekhez élő vagy speciális adatforrás kellhet.

**8. A „nem tudom frissen ellenőrizni” értékes válasz.**

Jobb, mint a régi információból gyártott magabiztos találgatás.

**9. A forráskritika friss információnál is ugyanúgy érvényes.**

A keresés megtalálja az információt; neked és az LLM-nek továbbra is értékelni kell, hogy mire támaszkodhatsz.

A következő modulban olyan területekkel foglalkozunk, ahol egy tévedés következménye különösen nagy lehet: **egészségügy, jog, pénzügy és biztonság**.