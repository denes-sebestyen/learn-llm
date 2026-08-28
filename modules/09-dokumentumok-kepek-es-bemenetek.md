# 9. modul – Dokumentumok, képek és egyéb bemenetek

## Mit fogsz megtanulni?

Eddig többnyire úgy beszéltünk az LLM-ekről, mintha a felhasználó leírna egy kérdést, a modell pedig válaszolna rá.

A modern LLM-alapú alkalmazások azonban gyakran ennél sokkal többet tudnak: feltölthetsz nekik dokumentumot, képet, táblázatot vagy más fájlt, és egyes rendszerek különféle eszközökkel is fel tudják dolgozni ezeket.

Ez nagyon hasznos, de könnyen létrehoz egy új tévedést:

> **attól, hogy az AI kapott egy fájlt, még nem biztos, hogy annak minden részét helyesen látta, elolvasta vagy megértette.**

A modul végére:

- tudni fogod, hogyan adj dokumentumot vagy képet az LLM-nek használható kontextusként;
- megérted a „feltöltöttem” és a „modell ténylegesen feldolgozta” közti különbséget;
- tudsz pontos feladatot adni hosszú dokumentumok elemzéséhez;
- felismered az összefoglalás és az információkinyerés tipikus hibáit;
- óvatosabban kezeled a képekből, diagramokból és táblázatokból kiolvasott információt;
- tudni fogod, mikor érdemes visszakérni arra, hogy a válasz pontosan melyik részre épül;
- és megérted, hogy az alkalmazás képességei nem azonosak magának a nyelvi modellnek a képességeivel.

---

# 1. A fájl is kontextus

Ha feltöltesz egy dokumentumot, azzal lényegében új kontextust adsz a beszélgetéshez.

Ez sokkal jobb lehet annál, mint amikor azt kérdezed:

> Mit tartalmaz a cégünk szabadságolási szabályzata?

miközben a modellnek nincs hozzáférése a szabályzathoz.

Ha viszont feltöltöd a dokumentumot, már kérdezhetsz például így:

> A feltöltött szabályzat alapján hány nappal korábban kell szabadságot kérni? Mutasd meg azt a részt is, amelyre a válaszodat alapozod.

Ilyenkor nem azt kéred a modelltől, hogy általános ismereteiből találja ki a választ, hanem adsz neki egy konkrét forrást.

Ez ugyanazt az alapelvet követi, amelyet korábban már láttunk:

> **ha van releváns információd, add oda a modellnek ahelyett, hogy azt várnád, hogy kitalálja.**

---

# 2. Először mondd meg, mit szeretnél a fájllal

A puszta fájlfeltöltés még nem feladat.

Egy húszoldalas dokumentummal sok különböző dolgot lehet csinálni:

- összefoglalni;
- konkrét adatot keresni benne;
- összehasonlítani egy másik dokumentummal;
- ellentmondásokat keresni;
- kérdéseket készíteni belőle;
- egyszerűbb nyelven elmagyarázni;
- táblázatos információt kinyerni;
- egy adott fejezetet elemezni.

Ezért a

> Nézd meg ezt a PDF-et.

helyett jobb például:

> Foglald össze a dokumentum fő állításait legfeljebb tíz pontban. Külön jelöld azokat, amelyekhez konkrét határidő vagy összeg tartozik.

Vagy:

> Keresd meg, mit ír a dokumentum a felmondási időről. Ne foglald össze az egész dokumentumot.

A fájl megadja az **anyagot**, a prompt pedig megadja a **feladatot**.

---

# 3. Az összefoglalás mindig veszteséges

Egy százoldalas dokumentumból készített egyoldalas összefoglaló szükségszerűen kihagy dolgokat.

Ez nem feltétlenül hiba. Ez az összefoglalás lényege.

A kérdés inkább az:

> **az maradt-e meg, ami neked fontos?**

Ha csak ezt kéred:

> Foglald össze.

akkor a modell maga dönti el, mi számít lényegesnek.

Ha viszont tudod, miért olvasod a dokumentumot, mondd el:

> Azért olvasom ezt a szerződést, mert azt szeretném megérteni, milyen költségeim lehetnek a szerződés idő előtti megszüntetésekor. Erre koncentrálva foglald össze a releváns részeket.

Ugyanaz a dokumentum egészen más összefoglalót igényelhet egy jogász, egy könyvelő vagy egy ügyfél számára.

Ezért hosszabb vagy fontos dokumentumnál gyakran jobb először **célzott kérdéseket feltenni**, mint egyetlen általános összefoglalóra hagyatkozni.

---

# 4. Ne csak választ kérj – kérj helyet is

Ha egy dokumentumból származó állítás fontos, hasznos tudni, honnan jött.

Kérheted például:

> Válaszolj a feltöltött dokumentum alapján, és minden fontos állításnál jelezd az oldalt vagy fejezetet, ahol megtalálható.

Vagy:

> Keresd meg a választ, majd idézd röviden azt a mondatot vagy bekezdést, amely alátámasztja.

Ez két okból hasznos.

Először is könnyebben ellenőrizheted, hogy a modell jól értelmezte-e a szöveget.

Másodszor észreveheted, ha a válasz valójában **nem a dokumentumból**, hanem a modell általános ismereteiből vagy következtetéséből származik.

Fontos azonban: az oldalszám vagy idézet sem tévedhetetlen. Ha nagy a tét, nyisd meg az eredeti dokumentumot, és ellenőrizd a hivatkozott részt.

---

# 5. A modell következtethet is – ezt különítsd el a dokumentum állításaitól

Tegyük fel, hogy egy jelentés ezt írja:

> Az ügyfélszolgálati megkeresések száma 20%-kal nőtt.

A modell ebből azt mondhatja:

> Ez arra utal, hogy romlott az ügyfelek elégedettsége.

Ez lehetséges magyarázat, de **nem ugyanaz az állítás**.

A megkeresések száma nőhetett például azért is, mert több lett az ügyfél vagy új szolgáltatás indult.

Ezért elemzésnél hasznos kérés:

> Különítsd el, mit állít közvetlenül a dokumentum, és mi a te következtetésed belőle.

Ez különösen fontos jelentéseknél, kutatásoknál, szerződéseknél és minden olyan anyagnál, ahol később hivatkozni szeretnél a megállapításokra.

---

# 6. Hosszú dokumentumnál lehet, hogy nem minden rész egyformán hozzáférhető

A felhasználó számára egyszerűnek tűnik:

> Feltöltöttem egy 300 oldalas PDF-et.

De az alkalmazás belül többféleképpen kezelheti ezt.

Lehet, hogy:

- kinyeri a szöveget;
- részekre bontja;
- keresést végez a dokumentumban;
- csak a kérdéshez relevánsnak ítélt részeket adja át a modellnek;
- képként dolgoz fel bizonyos oldalakat;
- vagy ezek valamilyen kombinációját használja.

A pontos működés alkalmazásonként eltérhet.

Ezért nem érdemes automatikusan azt feltételezni, hogy egy hosszú fájl **minden sora egyszerre ott van a modell előtt**.

Ha teljes dokumentumra vonatkozó feladatot adsz – például:

> Keress meg minden olyan helyet, ahol a dokumentum adatmegőrzési időt említ.

– akkor érdemes külön hangsúlyozni, hogy teljes körű keresést szeretnél, és az eredményt szükség esetén magad is ellenőrizni.

A „nem találtam” ugyanis nem mindig ugyanazt jelenti, mint hogy **nincs benne**.

---

# 7. A PDF nem mindig valódi szöveg

Két PDF kívülről ugyanolyan fájlnak tűnhet, belül azonban egészen más lehet.

Az egyikben valódi, kijelölhető szöveg található.

A másik lehet beszkennelt papírdokumentum, amelyben minden oldal lényegében egy kép.

Ilyenkor a rendszernek előbb fel kell ismernie a képen található karaktereket. Ezt **OCR-nek** (optikai karakterfelismerésnek) nevezik.

Az OCR hibázhat például:

- rossz minőségű szkennelésnél;
- apró betűknél;
- kézírásnál;
- többhasábos elrendezésnél;
- táblázatoknál;
- különleges karaktereknél;
- elfordított vagy részben takart szövegnél.

Egyetlen félreolvasott szám is sokat számíthat:

`1 000 000` és `10 000 000`

között például nem stilisztikai különbség van.

Ha egy konkrét szám, név, dátum vagy azonosító fontos, ellenőrizd az eredeti képen is.

---

# 8. Képnél különítsd el: mit lát, és mit következtet

Képet is lehet hasonlóan elemezni.

Például feltölthetsz egy fotót, és megkérdezheted:

> Milyen csatlakozók láthatók ezen az eszközön?

Ez egy megfigyelési feladat.

Más jellegű kérdés:

> Miért romlott el ez az eszköz?

Ez már következtetést igényel, és a képen nem látható okok is lehetnek.

Érdemes ezért különválasztani:

1. **Mi látható ténylegesen?**
2. **Mit lehet ebből valószínűsíteni?**
3. **Mit nem lehet a képből eldönteni?**

Hasznos prompt lehet:

> Először csak írd le a képen megfigyelhető tényeket. Ezután külön sorold fel a lehetséges magyarázatokat, és jelezd, mihez kellene további információ.

Ez ugyanaz a gondolkodási fegyelem, amelyet dokumentumoknál is alkalmaztunk: **a forrás tartalma és a belőle levont következtetés ne mosódjon össze.**

---

# 9. A kép részletei könnyen félrevezethetnek

Egy kép értelmezését sok minden nehezítheti:

- rossz felbontás;
- homály;
- tükröződés;
- árnyék;
- perspektíva;
- részleges takarás;
- túl kicsi felirat;
- levágott képrészlet.

Ha valami nem látszik, érdemes jobb bemenetet adni ahelyett, hogy erősebb állítást kérsz.

Például:

> Nem tudod elolvasni a címkét? Feltöltök róla egy közelebbi képet.

sokkal jobb stratégia, mint:

> Próbáld meg még egyszer, biztos ki tudod olvasni.

A második kérés nem tesz új információt a képbe.

> **Ha a bemenet nem elég jó, a jobb prompt nem mindig segít. Néha jobb bemenet kell.**

---

# 10. Diagramok és grafikonok: a kép nem azonos az adattal

Egy grafikonról gyakran könnyen felismerhető a tendencia:

- emelkedik;
- csökken;
- van egy kiugró pont;
- két görbe keresztezi egymást.

De pontos számokat leolvasni már nehezebb lehet.

Ha az eredeti táblázat vagy adatfájl rendelkezésre áll, pontos számításnál jobb azt használni, mint a grafikon pixeleiből visszakövetkeztetni az értékeket.

Például:

> A grafikon alapján melyik évben volt a legnagyobb növekedés?

lehet jó vizuális elemzési feladat.

De:

> Számold ki két tizedesjegyre az éves átlagos növekedést ebből a grafikonból.

már problémás lehet, ha az alapadatokat nem adtad meg.

Általános szabály:

> **ha pontos szám kell, lehetőleg az adatot add oda, ne csak annak vizualizációját.**

---

# 11. Táblázatoknál ellenőrizd, mit jelent egy sor és egy oszlop

Egy táblázat látszólag nagyon strukturált bemenet, de könnyen félreérthető.

Lehet benne:

- több fejlécsor;
- összevont cella;
- hiányzó érték;
- eltérő mértékegység;
- százalék és abszolút érték ugyanabban a táblában;
- lábjegyzet;
- rejtett vagy szűrt adat;
- képletből számolt cella.

Mielőtt fontos következtetést kérsz, érdemes ellenőriztetni az értelmezést:

> Először írd le röviden, mit jelent szerinted minden oszlop és milyen mértékegységet használ. Még ne elemezd az adatokat.

Ha ezt jól értette, utána jöhet az elemzés.

Ez különösen jó módszer akkor, amikor a táblázatot nem te készítetted.

---

# 12. Több fájlnál nevezd meg a szerepüket

Két vagy több dokumentum összehasonlításánál ne hagyd a modellre, hogy kitalálja, melyik mire szolgál.

Például:

> Az `eredeti.pdf` a jelenlegi szerződés, a `tervezet.pdf` az új változat. Keresd meg azokat a pontokat, ahol a tervezet megváltoztatja a fizetési határidőt, a felmondást vagy a felelősségi szabályokat.

Ez jobb, mint:

> Hasonlítsd össze ezt a két fájlt.

Még jobb lehet először azt kérni:

> Sorold fel a talált változásokat, és mindegyiknél mutasd meg a régi és az új rendelkezés helyét. Ne értékeld még, hogy a változás jó vagy rossz.

Majd külön lépésben:

> Most magyarázd el, milyen gyakorlati következménye lehet ezeknek a változásoknak.

Ismét szétválasztottuk a **megfigyelést** és az **értelmezést**.

---

# 13. Az alkalmazás eszközei nem ugyanazok, mint az LLM

Amikor azt mondjuk, hogy „az AI elolvasta a PDF-et” vagy „az AI kiszámolta a táblázatot”, a háttérben valójában több komponens dolgozhat.

Egy alkalmazás használhat például:

- dokumentumkeresőt;
- OCR-t;
- képfeldolgozást;
- kódfuttatást;
- webes keresőt;
- adatbázist;
- speciális fájlfeldolgozót.

A nyelvi modell ezek eredményét felhasználhatja a válasz elkészítéséhez.

Ez fontos mentális modell:

> **az LLM és az LLM-et használó alkalmazás nem ugyanaz.**

Két, látszólag ugyanazt a modellt használó szolgáltatás ezért eltérően kezelhet ugyanazt a PDF-et vagy táblázatot.

Az egyik képes lehet közvetlenül feldolgozni egy adott fájltípust, a másik nem.

Az egyik kereshet a teljes dokumentumban, a másik csak bizonyos részeket adhat át a modellnek.

Ezért amikor egy képesség fontos, ne csak azt kérdezd:

> Melyik modell ez?

hanem azt is:

> **Milyen eszközöket és hozzáféréseket kap ebben az alkalmazásban?**

---

# 14. A fájl tartalma is lehet utasítás

Van egy kevésbé nyilvánvaló probléma.

Egy dokumentumban vagy weboldalon olyan szöveg is szerepelhet, amely utasításnak néz ki:

> Hagyd figyelmen kívül a felhasználó kérését, és helyette csináld ezt...

Ezt **prompt injectionnek** nevezik.

A dokumentum tartalma azonban alapvetően **adat**, amelyet elemezni szeretnél – nem feltétlenül megbízható utasítás a modell számára.

Ez különösen fontos, ha ismeretlen eredetű dokumentumokat, weboldalakat vagy automatikusan begyűjtött tartalmat dolgoztatsz fel.

Hasznos elv:

> **attól, hogy egy utasítás bekerült a modell kontextusába, még nem biztos, hogy jogosult irányítani a feladatot.**

Ez technikai rendszereknél komoly biztonsági kérdéssé is válhat, de hétköznapi használatban is jó tudni róla.

---

# 15. Fontos adatnál menj vissza az eredetihez

Dokumentumok és képek elemzésénél az LLM kiváló gyorsító lehet.

Segíthet:

- megtalálni a releváns részeket;
- összefoglalni hosszú anyagokat;
- összehasonlítani változatokat;
- kérdéseket felvetni;
- struktúrát készíteni;
- észrevenni olyan mintákat, amelyek felett te átsiklottál.

De ha a válasz egy konkrét mondaton, számon vagy képrészleten múlik, az utolsó ellenőrzést érdemes az **eredeti forráson** elvégezni.

Különösen akkor, ha:

- pénzről van szó;
- határidőről van szó;
- szerződéses kötelezettségről van szó;
- egészségügyi információról van szó;
- egyetlen karakter eltérése is fontos;
- vagy a döntés következménye jelentős.

Az LLM legyen **navigátor az anyaghoz**, ne az eredeti anyag helyettesítője.

---

# 16. Egy egyszerű rutin fájlok elemzéséhez

Ha dokumentummal, képpel vagy más feltöltött anyaggal dolgozol, használhatod ezt a folyamatot.

## 1. Mondd meg, melyik anyag mire szolgál

Ha több fájl van, nevezd meg a szerepüket.

## 2. Adj konkrét feladatot

Összefoglalást, keresést, összehasonlítást vagy elemzést szeretnél?

## 3. Kérd a forráshelyeket

Fontos állításnál kérj oldalt, fejezetet, cellát vagy más ellenőrizhető hivatkozást, ha az alkalmazás erre képes.

## 4. Válaszd külön a tényt és a következtetést

Mi szerepel ténylegesen az anyagban, és mit következtet belőle a modell?

## 5. Ellenőrizd a bemenet minőségét

Olvasható a kép? Valódi szöveg a PDF? Egyértelmű a táblázat szerkezete?

## 6. A kritikus részletet ellenőrizd az eredetiben

Különösen számot, dátumot, nevet, jogi szöveget vagy más nagy jelentőségű részletet.

---

# Gyakorlat – Kérdezz egy dokumentumtól

Válassz egy nem érzékeny, legalább néhány oldalas dokumentumot.

Lehet például:

- használati útmutató;
- nyilvános szabályzat;
- tanulmány;
- termékleírás;
- nyilvános jelentés.

Töltsd fel egy erre képes LLM-alkalmazásba.

Először kérd:

> Foglald össze ezt a dokumentumot.

Nézd meg, mit tartott fontosnak.

Ezután válassz egy konkrét célt, és kérdezd például:

> A dokumentumból csak azokat a részeket keresd meg, amelyek X témához kapcsolódnak. Minden állításnál jelezd, hol található az eredetiben.

Végül ellenőrizz legalább három hivatkozást magában a dokumentumban.

Figyeld meg:

- helyesen találta-e meg a részeket;
- kihagyott-e valami fontosat;
- összekeverte-e a dokumentum állítását a saját következtetésével;
- mennyivel volt használhatóbb a célzott kérdés az általános összefoglalónál.

---

# Kísérlet – Mit lát valójában a képen?

Válassz egy olyan saját vagy szabadon használható képet, amelyen több részlet látható.

Először kérd:

> Írd le, mit látsz ezen a képen.

Ezután:

> Most válaszd külön három csoportra: amit biztosan meg lehet figyelni, amit csak valószínűsíteni lehet, és amit ebből a képből nem lehet eldönteni.

Ha van rajta apró szöveg vagy nehezen látható részlet, kérdezz rá külön.

Majd – ha tudsz – adj jobb minőségű vagy közelebbi képet ugyanarról a részletről.

Figyeld meg, hogyan változik a válasz azzal, hogy **nem a prompt lett erősebb, hanem a bemenet lett jobb**.

---

# Amit ebből a modulból érdemes megjegyezni

**1. A fájl kontextust ad, de a feladatot neked kell megadnod.**

A „nézd meg ezt” helyett mondd el, mit keresel benne.

**2. Az összefoglalás szükségszerűen kihagy információt.**

Mondd meg, milyen célból olvasod az anyagot.

**3. Fontos állításnál kérj ellenőrizhető forráshelyet.**

Majd szükség esetén nézd meg az eredetiben is.

**4. Különítsd el a forrás állítását a modell következtetésétől.**

A kettő nem ugyanaz.

**5. A „nem találtam” nem mindig bizonyítja, hogy valami nincs a fájlban.**

Hosszú dokumentumok feldolgozása alkalmazásonként eltérhet.

**6. A PDF lehet kép is.**

OCR-nél különösen fontos ellenőrizni a számokat, neveket és más kritikus részleteket.

**7. Képnél válaszd külön a megfigyelést és a következtetést.**

Ha valami nem látszik jól, adj jobb képet.

**8. Pontos számításhoz jobb az eredeti adat, mint a grafikon képe.**

A vizualizáció elsősorban vizuális értelmezésre való.

**9. Az LLM és az alkalmazás nem ugyanaz.**

A fájlkezelés, keresés, OCR vagy számítás külön eszközökön is múlhat.

**10. Az eredeti forrás marad az ellenőrzés végpontja.**

Az LLM gyorsíthatja az olvasást és az elemzést, de fontos részletnél menj vissza az eredetihez.

A következő, utolsó modulban azzal foglalkozunk, **milyen információt érdemes egyáltalán odaadni egy LLM-alapú szolgáltatásnak**: személyes adatokkal, jelszavakkal, ügyféladatokkal és más érzékeny információkkal.