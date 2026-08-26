# 2. modul – Hogyan kérdezz úgy, hogy használható választ kapj?

## Mit fogsz megtanulni?

Az előző modulban láttuk, hogy egy LLM nem egyszerűen információkat keres ki egy adatbázisból: a kapott kérés és a rendelkezésére álló információk alapján állítja elő a választ.

Ebben a modulban azt nézzük meg, hogyan adhatsz neki olyan információkat, amelyekből nagyobb eséllyel kapsz valóban használható eredményt.

A modul végére:

- felismered, mikor túl általános egy kérés;
- tudni fogod, milyen háttérinformáció segítheti a jobb választ;
- meg tudod adni a célodat, a fontos körülményeket és korlátokat;
- tudsz példával vagy kívánt formával pontosítani;
- és azt is tudni fogod, mikor **nem** érdemes még több részlettel terhelni a kérést.

Ehhez továbbra sincs szükség különleges „promptnyelvre”.

---

# 1. Nincs szükség varázsmondatokra

Az LLM-ek használatával kapcsolatban sok tanácsot lehet olvasni arról, hogyan kell „jó promptot” írni.

Ezek között vannak hasznos ötletek, de könnyű azt a benyomást kelteni, mintha az LLM-et egy különleges parancsnyelven kellene megszólítani.

Általában nincs szükség erre.

Írhatsz neki ugyanúgy, ahogy egy embernek elmondanád, miben kérsz segítséget.

Például:

> Írj egy levelet.

Ez érthető kérés, de nagyon kevés információt tartalmaz. A modellnek magának kellene kitalálnia többek között:

- kinek szól a levél;
- mi a célja;
- mennyire legyen hivatalos;
- milyen hosszú legyen;
- milyen információkat tartalmazzon.

Ehelyett mondhatod például:

> Szeretnék e-mailt írni a szállodának, ahol jövő héten megszállunk. Várhatóan délelőtt 11 körül érkezünk, miközben a hivatalos bejelentkezés csak délután 3-tól lehetséges. Szeretném udvariasan megkérdezni, hogy letehetjük-e náluk addig a csomagjainkat. Írd meg angolul, barátságos, de udvarias hangnemben.

Nem azért jobb a második változat, mert valamilyen különleges formulát használ.

Azért jobb, mert elmondja azt, amit a másik félnek tudnia kell a feladat megfelelő elvégzéséhez.

> **A jó prompt elsősorban nem technikai trükk, hanem jó kommunikáció.**

---

# 2. Mondd el, mi a célod

Gyakran nem maga a feladat a legfontosabb információ, hanem az, hogy **mit szeretnél elérni vele**.

Hasonlítsuk össze ezt a két kérést:

> Írj a fotoszintézisről.

és:

> Holnap dolgozatot írok biológiából. Segíts megérteni a fotoszintézist úgy, hogy utána a saját szavaimmal is el tudjam magyarázni.

Az első kérésből egyáltalán nem derül ki, mire szeretnéd használni a választ. Lehet, hogy egy lexikonszerű összefoglalót kapsz, pedig valójában tanulni szeretnél.

A cél megadása segít a modellnek eldönteni, **milyen válasz lenne számodra hasznos**.

Néhány további példa:

> Szeretném eldönteni, hogy vonattal vagy autóval menjünk.

> Egy előadásra készülök, és ehhez szeretném megérteni a téma legfontosabb érveit.

> Nem a kész megoldást szeretném, hanem segítséget ahhoz, hogy magam jöjjek rá.

> Ezt egy olyan rokonomnak szeretném elmagyarázni, aki nem ismeri a témát.

A cél sokszor többet segít, mint egy hosszú lista arról, pontosan milyen mondatokat szeretnél látni a válaszban.

---

# 3. Add meg a fontos körülményeket

Képzeld el, hogy egy ismerősöd ezt kérdezi tőled:

> Mit ajánlasz hétvégére?

Valószínűleg neked is lennének kérdéseid.

Hol? Kivel? Milyen programot keres? Mennyi időre? Mennyit szeretne költeni? Szeretne utazni, vagy inkább a közelben maradna?

Az LLM hasonló helyzetben van: csak azokból az információkból tud dolgozni, amelyek a rendelkezésére állnak.

Például:

> Ajánlj valamilyen programot hétvégére.

helyett:

> Budapesten keresünk programot szombat délutánra két felnőttnek. Szívesen lennénk a szabadban, ha jó az idő, de egész napos kirándulást most nem szeretnénk. Autó nélkül is könnyen elérhető programot keresünk.

A második kérésben már több olyan információ szerepel, amely ténylegesen befolyásolja a választ.

Ezt nevezzük gyakran **kontextusnak**: azoknak a háttérinformációknak az összességét, amelyek segítenek értelmezni a kérésedet.

## Nem minden részlet hasznos

A több információ önmagában nem mindig jobb.

Ha hétvégi programot keresel, valószínűleg fontos, hogy melyik városban vagy és mennyi időd van. Az viszont valószínűleg nem segít, hogy milyen színű az autód, vagy mit ettél reggelire.

Jó kérdés lehet magadnak:

> **Ha ezt egy embernek mondanám el, segítene neki jobb döntést hozni?**

Ha igen, valószínűleg az LLM számára is hasznos kontextus.

---

# 4. Mondd el a korlátokat is

Sok feladatnál nemcsak azt érdemes elmondani, mit szeretnél, hanem azt is, **minek kell megfelelnie a megoldásnak**.

Például:

> Adj ötleteket vacsorára.

Ez rengeteg lehetséges választ enged.

Ha viszont azt írod:

> Adj ötleteket gyors hétköznapi vacsorára. Legfeljebb 30 percet szeretnék főzni, nincs sütőm, és az egyik vendég vegetáriánus.

akkor három fontos korlátot adtál meg:

- idő;
- rendelkezésre álló eszköz;
- étrendi igény.

Korlát lehet például:

- költségkeret;
- idő;
- hossz;
- rendelkezésre álló eszközök;
- nyelv;
- életkor vagy előismeret;
- valami, amit mindenképpen szeretnél vagy szeretnél elkerülni.

A korlát nem feltétlenül tiltás. Az is korlát, hogy „legfeljebb egy oldal legyen”, „gyerek is megértse” vagy „tömegközlekedéssel elérhető legyen”.

---

# 5. Mondd meg, kinek készül

Ugyanazt a dolgot egészen másképp érdemes elmagyarázni különböző embereknek.

Például:

> Magyarázd el, mi az infláció.

használható kérés.

De más választ várunk ettől:

> Magyarázd el az inflációt egy tízéves gyereknek egy hétköznapi példával.

és ettől:

> Közgazdaságtant tanulok az egyetemen. Magyarázd el az infláció fő típusait, és térj ki arra is, hogyan mérik.

Ez nem csak oktatási helyzetekben számít.

Egy levél, prezentáció, használati útmutató vagy akár egy recept megfogalmazása is függhet attól, kinek készül.

Ha tehát az eredményt nem csak magadnak kéred, gyakran érdemes elmondani, **ki fogja olvasni vagy használni**.

---

# 6. Mutass példát, ha pontos elképzelésed van

Néha nehéz szavakkal pontosan leírni, milyen eredményt szeretnél.

Ilyenkor egy példa sokat segíthet.

Tegyük fel, hogy címeket keresel egy ismeretterjesztő előadáshoz.

Írhatod ezt:

> Adj öt jó címet egy előadáshoz a városi madarakról.

Ha azonban van elképzelésed a stílusról:

> Rövid, kíváncsiságot keltő címeket szeretnék egy városi madarakról szóló előadáshoz. Ilyesmire gondolok: „Kik laknak velünk a háztetőkön?” Adj még öt hasonló hangulatú ötletet.

A példa megmutatja a kívánt irányt anélkül, hogy hosszasan kellene meghatároznod, mit értesz „kíváncsiságot keltő” alatt.

Fontos azonban, hogy a példa irányítani is fogja a választ. Ha többféle megoldásra vagy kíváncsi, ezt érdemes jelezni:

> Ez csak példa a hangulatra; ne ennek a mondatszerkezetét ismételd.

---

# 7. Kérhetsz formátumot is

Ha tudod, hogyan szeretnéd felhasználni a választ, azt is megmondhatod.

Például:

> Hasonlítsd össze a két lehetőséget táblázatban.

> Adj először egy hárommondatos összefoglalót, utána részletes magyarázatot.

> Írj egy rövid ellenőrzőlistát, amit vásárlás közben a telefonomon is könnyen át tudok nézni.

> Sorold fel külön az előnyöket, hátrányokat és a még nyitott kérdéseket.

Ez különösen akkor hasznos, ha már tudod, mit fogsz kezdeni az eredménnyel.

De itt is igaz: ne adj meg formátumot csak azért, mert valahol azt olvastad, hogy egy jó promptnak tartalmaznia kell ilyet.

Ha nincs különösebb jelentősége annak, hogy lista vagy folyó szöveg lesz a válasz, nyugodtan bízhatod a modellre.

---

# 8. Nem kell mindent egyszerre megadnod

Egy gyakori tévhit, hogy a jó promptnak már az első üzenetben minden lehetséges részletet tartalmaznia kell.

Nem kell.

Az LLM egyik legnagyobb előnye éppen az, hogy **beszélgetni lehet vele**.

Kezdheted például így:

> Szeretnék egy háromnapos városnézést megtervezni Prágába. Segíts összeállítani.

Megkapod az első javaslatot, majd folytathatod:

> Ez nekünk túl zsúfoltnak tűnik. Inkább naponta két fontosabb programot szeretnénk.

Ezután:

> A második napon esőt mondanak. Cseréljük fel úgy a programokat, hogy akkor több beltéri hely legyen.

Majd:

> A várat mindenképpen szeretnénk megtartani.

Ez nem rosszabb módszer, mint egy hosszú, minden részletre kiterjedő első prompt. Sok esetben **jobb**, mert közben te is látod a lehetőségeket, és pontosabban ki tudod alakítani, mit szeretnél.

A következő modulban részletesebben foglalkozunk majd ezzel a fajta iteratív beszélgetéssel.

---

# 9. Az LLM is kérdezhet

Ha te sem tudod előre, milyen információkra lenne szükség, ezt nyugodtan elmondhatod.

Például:

> Szeretnék új laptopot választani, de nem tudom, milyen adatokat kellene megadnom ahhoz, hogy érdemben tudj segíteni. Kérdezz rá a fontos dolgokra.

Vagy:

> Segíts megtervezni egy családi ünnepséget. Mielőtt javaslatot teszel, kérdezz rá arra, ami szerinted fontos és még nem mondtam el.

Ez különösen hasznos lehet olyan témában, amelyhez nem értesz eléggé ahhoz, hogy tudd, **mit nem tudsz**.

Ugyanakkor az LLM kérdéseit sem kell automatikusan szükségesnek tekintened. Ha valami nem releváns, megmondhatod, hogy lépjetek tovább nélküle.

---

# 10. Rossz, jobb – de miért jobb?

Nézzünk néhány példát.

## Utazás

**Kevés információ:**

> Hova menjek nyaralni?

**Több használható információ:**

> Júniusban szeretnénk egy hétre Európán belül utazni ketten. Szeretjük, ha van mit megnézni, de 2-3 napot pihenéssel is töltenénk. Nem szeretnénk autót bérelni. Adj néhány különböző jellegű úti célt, és röviden írd le, melyiket miért ajánlod.

A második nem egyszerűen azért jobb, mert hosszabb. Megadja az időpontot, az utazók számát, az érdeklődést, egy fontos korlátot és azt, milyen döntéshez kér segítséget.

## Szövegírás

**Kevés információ:**

> Írj meghívót.

**Több használható információ:**

> Írj rövid, közvetlen meghívót a szomszédoknak a társasház udvari sütögetésére. Szombaton 17 órakor kezdünk. Nem hivatalos rendezvény, inkább barátságos összejövetel, ezért ne legyen ünnepélyes a szöveg.

Itt a közönség, az esemény, a szükséges tények és a hangnem számítanak.

## Magyarázat

**Kevés információ:**

> Mi az a DNS?

Ez önmagában sem rossz kérdés. Ha csak kíváncsi vagy az alapokra, akár teljesen elegendő lehet.

Ha viszont egy konkrét célod van:

> Sokszor hallom a DNS, gén és kromoszóma szavakat, de összekeverem őket. Magyarázd el a három fogalom kapcsolatát egyszerű példával.

Itt nem azért adunk több információt, mert a hosszabb prompt mindig jobb, hanem mert pontosabban tudjuk, **miben kérünk segítséget**.

---

# 11. Mikor elég a rövid kérdés?

Nem cél, hogy minden üzenetedből féloldalas leírás legyen.

Ha ezt szeretnéd tudni:

> Mit jelent angolul az, hogy „ablakpárkány”?

nincs különösebb értelme hozzátenni az élethelyzetedet, a célközönséget és a kívánt válaszformátumot.

Ugyanez igaz sok egyszerű kérdésre:

> Adj három szinonimát a „fontos” szóra.

> Fogalmazd át ezt a mondatot udvariasabbra.

> Magyarázd el röviden, mi az a napfogyatkozás.

A jó prompt tehát nem feltétlenül hosszú.

> **Annyi információt adj, amennyi a jó válaszhoz számít — ne annyit, amennyit csak bele tudsz írni.**

---

# Gyakorlat – Mi hiányzik?

Az alábbi kérések nem feltétlenül rosszak, de többféleképpen értelmezhetők.

Gondold végig, milyen információt kérdeznél meg a felhasználótól, vagy mit tennél hozzá, ha te írnád a promptot.

### 1.

> Ajánlj egy éttermet.

Milyen körülmények változtathatják meg érdemben az ajánlást?

### 2.

> Segíts önéletrajzot írni.

Mi a célja az önéletrajznak? Milyen információt kellene tudnia az LLM-nek?

### 3.

> Magyarázd el a relativitáselméletet.

Mikor lehet ez teljesen megfelelő kérés? Mit adnál hozzá, ha egy középiskolai felelésre készülnél? És mit, ha csak egy ismeretterjesztő videó után lettél kíváncsi?

### 4.

> Tervezz nekem egy edzéstervet.

Milyen információk lehetnek itt különösen fontosak? Van köztük olyan, amelynek hiánya nemcsak kevésbé hasznos, hanem akár kockázatosabb választ is eredményezhet?

---

# Kísérlet – Ugyanaz a feladat háromféleképpen

Válassz egy hétköznapi feladatot. Például:

- hétvégi program keresése;
- egy étel megtervezése;
- levél megfogalmazása;
- valaminek a megtanulása;
- ajándékötletek keresése.

Először írj egy nagyon rövid kérést, például:

> Adj ötletet hétvégi programra.

Nézd meg a választ.

Ezután indíts új beszélgetést, és egészítsd ki a kérést azokkal a körülményekkel, amelyek szerinted valóban számítanak.

Végül próbáld ki harmadszor úgy, hogy nem adsz meg mindent előre: az első válasz után fokozatosan pontosítod, mit szeretnél.

Hasonlítsd össze a három beszélgetést:

- Melyikből kaptál hamarabb használható eredményt?
- Volt olyan információ, amely sokat változtatott a válaszon?
- Adtál olyan részletet, amely valójában semmit nem javított rajta?
- Könnyebb volt mindent előre megfogalmazni, vagy beszélgetés közben pontosítani?

Nincs egyetlen helyes stratégia. A cél annak megtapasztalása, hogy **a releváns kontextus és a beszélgetés módja hogyan változtatja meg az eredményt**.

---

# Amit ebből a modulból érdemes megjegyezni

**1. Nem kell különleges nyelven beszélned az LLM-mel.**

A jó prompt elsősorban jó kommunikáció.

**2. Mondd el, mit szeretnél elérni.**

A cél gyakran fontosabb, mint a feladat puszta megnevezése.

**3. Add meg azokat a körülményeket és korlátokat, amelyek ténylegesen befolyásolják a választ.**

A több információ nem automatikusan jobb.

**4. Ha számít, mondd meg, kinek készül és milyen formában szeretnéd az eredményt.**

**5. Példával is megmutathatod, mire gondolsz.**

**6. Nem kell elsőre tökéletes promptot írnod.**

A beszélgetést folytathatod, pontosíthatsz és változtathatsz az igényeiden.

**7. Ha nem tudod, milyen információ hiányzik, megkérheted az LLM-et, hogy kérdezzen vissza.**

A következő modulban azt nézzük meg részletesebben, hogyan lehet az első válaszból **beszélgetéssel, javítással és iterációval** eljutni a valóban használható eredményhez.