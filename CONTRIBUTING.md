# Közreműködés a Learn LLM tananyagban

Köszönjük, hogy segítesz a tananyag fejlesztésében!

A Learn LLM célja nem egyszerűen néhány „jó prompt” megtanítása. Olyan, informatikai előképzettség nélkül is használható tananyagot szeretnénk létrehozni, amely segít megérteni, hogyan lehet a nagy nyelvi modelleket (LLM-eket) **hatékonyan, kritikusan és biztonságosan használni**.

A projekt jelenleg elsősorban a tartalom kialakítására koncentrál. Később erre adaptív tanulási és diagnosztikai funkciók is épülhetnek.

## Kiknek készül?

A tananyag széles közönségnek szól: olyanoknak is, akik most találkoznak először LLM-alapú alkalmazásokkal, és olyanoknak is, akik már rendszeresen használják őket, de bizonyos készségeiket szeretnék fejleszteni.

Nem feltételezünk informatikai előképzettséget.

Ez nem jelenti azt, hogy minden technikai részletet kerülni kell. Ha egy fogalom segít jó mentális modellt kialakítani, érdemes elmagyarázni — de csak olyan mélységben, amely a használat szempontjából hasznos.

## Alapelvek

### Ne varázsszavakat tanítsunk

A cél nem olyan promptreceptek megtanítása, amelyeket a tanulónak szó szerint követnie kell.

Inkább azt szeretnénk megmutatni, **miért** lesz jobb egy kérés attól, hogy megfelelő célt, kontextust, korlátokat vagy példákat tartalmaz.

A jó LLM-használat fontos része az iteráció is: a tanulónak nem kell első próbálkozásra tökéletes promptot írnia.

### A kritikus használat ugyanolyan fontos, mint a hatékony használat

A gördülékeny, magabiztos szöveg nem bizonyítja, hogy az állítás helyes.

A tananyagnak ezért következetesen segítenie kell annak felismerését, hogy:

- mikor elég egy LLM válasza;
- mikor érdemes ellenőrizni;
- hogyan lehet ellenőrizni;
- milyen következménye lehet egy téves válasznak.

### Tanítsunk mentális modelleket

Ahol lehet, olyan magyarázatokat keressünk, amelyekből a tanuló új helyzetekben is következtetni tud.

Például fontosabb megérteni, hogy az LLM által létrehozott magabiztos válasz és egy ellenőrzött forrás két külön dolog, mint megtanulni egy konkrét alkalmazás aktuális gombjainak helyét.

### Legyünk lehetőleg gyártófüggetlenek és időtállóak

Konkrét termékek és szolgáltatások jó példák lehetnek, de lehetőség szerint ne építsünk általános szabályt egyetlen szolgáltató pillanatnyi működésére vagy felületére.

Ha egy állítás várhatóan gyorsan elavulhat, ezt vegyük figyelembe a megfogalmazásnál.

### Ne beszéljünk leereszkedően a kezdőkkel

Az egyszerű megfogalmazás nem ugyanaz, mint a pontatlanság vagy a gyerekes hangnem.

A tanuló lehet kiváló szakember egy teljesen más területen. Az egyetlen feltételezésünk az, hogy az adott LLM-es fogalmat vagy készséget még nem feltétlenül ismeri.

## A modulok javasolt felépítése

Nem kötelező minden modulnak mechanikusan ugyanazt a sablont követnie, de jó kiindulópont:

1. **Mit fogsz megtanulni?** — néhány konkrét tanulási cél.
2. **Magyarázat** — a szükséges fogalmak és mentális modell.
3. **Példák** — lehetőleg hétköznapi és többféle helyzetből.
4. **Kontrasztos példák** — például gyengébb és jobb megközelítés összehasonlítása.
5. **Gyakorlat** — a tanuló maga alkalmazza a bemutatott készséget.
6. **Kísérlet vagy kipróbálható feladat** — ahol hasznos, valódi LLM-mel végrehajtható feladat.
7. **Amit érdemes megjegyezni** — rövid összefoglaló a modul legfontosabb gondolatairól.

A gyakorlat lehetőleg ne pusztán definíciók visszakérdezése legyen. Inkább azt mutassa meg, hogy a tanuló tudja-e alkalmazni a tanultakat egy új helyzetben.

## Példák írása

A jó példa:

- érthető külön háttértudás nélkül;
- világosan demonstrálja az adott problémát;
- nem igényel feleslegesen hosszú magyarázatot;
- lehetőség szerint hétköznapi helyzetből indul;
- nem támaszkodik szükségtelenül egyetlen konkrét LLM-termékre.

Egészségügyi, jogi, pénzügyi vagy más nagy kockázatú példáknál különösen ügyeljünk arra, hogy a példa ne váljon véletlenül konkrét szakmai tanáccsá.

## Tényállítások és források

Ha egy rész konkrét, ellenőrizhető tényállításra épül, különösen ha az aktuális vagy könnyen változhat, ellenőrizzük megbízható forrásból.

A forráskritikáról szóló tananyag saját magával szemben is legyen forráskritikus.

Lehetőleg különítsük el:

- az általános magyarázatot;
- a szemléltető hasonlatot;
- az ellenőrizhető tényállítást;
- a szerzői javaslatot vagy pedagógiai döntést.

## Hogyan lehet közreműködni?

Többféle segítség értékes.

### Tartalom írása

Új modul, gyakorlat, példa vagy egy meglévő rész jelentősebb átdolgozása.

### Tartalmi vagy szakmai review

Ha jól ismersz egy érintett területet, különösen hasznos a pontatlanságok, félreérthető állítások és hiányzó szempontok jelzése.

### Tesztolvasás

Ehhez nem szükséges LLM-szakértelem — sőt.

Ha valami nem világos, túl gyorsan vezet be egy fogalmat, félreérthető vagy egyszerűen unalmas, az fontos visszajelzés. Különösen értékes, ha meg tudod írni, **hol** vesztetted el a fonalat és **mit gondoltál, hogy az adott rész jelent**.

### Apró javítások

Elgépelések, rossz megfogalmazások, törött hivatkozások és kisebb pontatlanságok javítása is hasznos.

## Fejlesztési folyamat

A tartalom fejlesztésénél a szoftverfejlesztésből ismert folyamatokat használjuk.

Nagyobb változtatásnál javasolt:

1. szükség esetén issue-ban megbeszélni az ötletet;
2. külön branchet készíteni;
3. egy logikailag összetartozó változtatást elkészíteni;
4. pull requestet nyitni;
5. review után javítani vagy pontosítani;
6. elfogadás után merge-elni.

Nem cél, hogy minden apró módosításhoz bonyolult folyamat tartozzon. A PR elsősorban arra szolgál, hogy a változtatás **áttekinthető és megvitatható egység** legyen.

## Pull request előtt

Érdemes végignézni:

- [ ] Világos, mit szeretne megtanítani a változtatás?
- [ ] Érthető informatikai előképzettség nélkül is?
- [ ] Az új fogalmakat megmagyarázza, mielőtt használja őket?
- [ ] Nem téveszti össze a gördülékeny magyarázatot a pontossággal?
- [ ] A példák tényleg azt demonstrálják, amit tanítani szeretnénk?
- [ ] A tényállítások ellenőrizhetők és szükség esetén ellenőrizve vannak?
- [ ] Nem kötődik szükségtelenül egy konkrét szolgáltatóhoz vagy pillanatnyi UI-hoz?
- [ ] Nem leereszkedő a hangneme?
- [ ] A gyakorlat alkalmazást mér, nem pusztán bemagolt definíciót?

Nem baj, ha valamelyik kérdésre a válasz „nem alkalmazható”. A lista review-segédeszköz, nem merev követelményrendszer.

## Review

A review célja a tananyag javítása, nem a szerző vizsgáztatása.

Különösen hasznosak az olyan megjegyzések, amelyek megmutatják a probléma okát:

- „Ezt a fogalmat két bekezdéssel korábban már használjuk, mint hogy definiálnánk.”
- „Ebből a példából szerintem egy kezdő azt következtetheti, hogy a webes keresés automatikusan megbízhatóvá teszi a választ.”
- „Ez a rész technikailag pontos, de a modul tanulási céljához valószínűleg nincs szükség ilyen mélységre.”

Az eltérő vélemény természetes része a folyamatnak. A cél nem feltétlenül a legtöbb részlet, hanem a **tanulási célhoz legjobban illeszkedő magyarázat**.

## Nyelv és stílus

A tananyag jelenlegi elsődleges nyelve magyar.

Törekedjünk közérthető, természetes nyelvre. Angol szakkifejezést akkor érdemes megtartani, ha széles körben így használják vagy a későbbi tájékozódást segíti; ilyenkor az első előfordulásnál magyarázzuk meg.

Kerüljük a fölösleges szakzsargont, de ne áldozzuk fel a pontosságot csak azért, hogy egy mondat egyszerűbb legyen.

---

Ha bizonytalan vagy abban, hogy egy ötlet beleillik-e a projektbe, nyugodtan nyiss issue-t vagy draft pull requestet. Egy félkész ötletből is lehet jó tananyag.