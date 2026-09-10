# Az LLM mint dzsinn – amikor nem azt kapod, amit értettél

Az LLM néha meglepően hasonlít a mesebeli dzsinnhez: végrehajtja, amit kértél tőle – csak nem feltétlenül úgy, ahogy te értetted.

A hasonlatnak van egy fontos határa. A mesék dzsinnje gyakran szándékosan keresi a kívánság kiskapuit. Az LLM nem próbál túljárni az eszeden. Egyszerűen abból kell következtetnie a szándékodra, amit a beszélgetésben megkapott.

A probléma ezért sokszor nem az, hogy rosszul hajtotta végre az utasítást, hanem az, hogy **az utasítás többféleképpen is értelmezhető volt**.

## Amit nem mondtál ki, az neked még lehet magától értetődő

Emberek között rengeteg információ marad kimondatlan.

Ha egy kollégádnak azt mondod:

> Nézd át ezt a levelet, de csak a megfogalmazást javítsd.

valószínűleg nem teszed hozzá:

> Ettől még olvasd el és értsd meg a tartalmát, mert csak így tudod eldönteni, hogy egy mondat megfelelően van-e megfogalmazva.

Egy ember a kérés értelmezésekor nem csak az utolsó mondatodat használja. Támaszkodik a helyzetre, a korábbi beszélgetésre, a közös tapasztalatokra és arra is, amit az ilyen feladatokról általában tud.

Minél jobban ismer valaki téged és a helyzetet, annál több mindent tud helyesen kikövetkeztetni abból, amit nem mondtál ki.

Egy LLM-nél erre kevésbé biztonságos hagyatkozni. Ha a helyes értelmezéshez fontos valamilyen háttérinformáció, szabály vagy különbségtétel, érdemes azt a modell számára is elérhetővé tenni.

## A feladat tárgya és a szükséges kontextus nem ugyanaz

Különösen könnyű félreértést okozni, amikor megmondod, hogy a modell **csak valamire** figyeljen.

Tegyük fel, hogy egy beszélgetésben a tanuló válaszait szeretnéd értékeltetni:

> Csak a tanuló válaszait értékeld.

Te valószínűleg azt érted ezen, hogy az értékelés **tárgya** kizárólag a tanuló legyen.

Ebből azonban nem következik, hogy a modellnek figyelmen kívül kell hagynia azt, hogy a tanuló mire válaszolt.

Egy ilyen válasz önmagában alig értelmezhető:

> Budapest, 4. kerület.

Ha azonban az előző kérdés ez volt:

> Melyik városban vagy városrészben keresel üzletet?

akkor ugyanaz a válasz pontosan azt az információt adja meg, amelyet a beszélgetés abban a pillanatban igényel.

Ezért a két dolgot érdemes különválasztani:

- **Mi a feladat tárgya?** – Mit kell vizsgálni, értékelni vagy módosítani?
- **Mi az értelmezéshez szükséges kontextus?** – Milyen információkat használhat vagy kell használnia ahhoz, hogy ezt helyesen tegye?

Például:

> Csak a tanuló viselkedését értékeld, de a válaszait a teljes beszélgetés kontextusában értelmezd.

Az értékelés tárgya nem változott. Csak explicitté tettük azt a háttérfeltételt, amelyet egy ember valószínűleg magától értetődőnek vett volna.

## A tapasztalat egy része valójában rejtett kontextus

Egy tapasztalt ember nem csak azért ért meg jobban egy rövid kérést, mert intelligensebb vagy figyelmesebb. Sokszor egyszerűen több használható háttértudása van.

Egy tapasztalt kolléga emlékezhet korábbi döntésekre, ismerheti a rendszer szokásait, felismerhet visszatérő problémákat, és tudhatja, hogy egy adott helyzetben mi szokott fontos lenni. Emiatt olyan összefüggéseket is figyelembe vesz, amelyeket a kérésben nem kellett újra felsorolnod.

Az LLM rendelkezhet sok általános tudással, és a beszélgetés korábbi részeiből is képes következtetni. De nem érdemes feltételezni, hogy minden olyan helyi, személyes vagy feladatspecifikus összefüggést ismer, amely számodra már magától értetődő.

Ha valami fontos a helyes értelmezéshez, gondoskodj róla, hogy a modell számára is része legyen a kontextusnak.

## Nem a minél hosszabb prompt a cél

Ebből könnyű rossz következtetést levonni:

> Akkor mindent részletesen le kell írnom minden egyes promptban.

Nem.

A túl sok irreleváns információ ugyanúgy nehezítheti a feladatot, mint a hiányzó kontextus. Ráadásul egy beszélgetésben nem kell minden fordulóban megismételned azt, amit a modell már megkapott és továbbra is releváns.

A cél nem a **minél több kontextus**, hanem a **szükséges kontextus**.

Ha az LLM egy utasítást furcsán vagy túl szó szerint értelmez, ne csak újabb tiltásokkal próbáld körbebástyázni a promptot. Előbb érdemes feltenni magadnak a kérdést:

> **Mi az, amit én magától értetődőnek tartok, de valójában nem adtam át a modellnek?**

Néha egyetlen ilyen hiányzó mondat többet javít az eredményen, mint egy hosszú lista arról, hogy mit ne csináljon.

## Mit vigyél magaddal?

1. **Az LLM a rendelkezésére álló kontextusból próbálja értelmezni a szándékodat.** Ami neked magától értetődő, nem biztos, hogy a kérésből is következik.
2. **A feladat tárgya és az értelmezéshez használható kontextus két külön dolog.** A „csak ezt értékeld” nem feltétlenül jelenti azt, hogy minden mást figyelmen kívül kell hagyni.
3. **A jó kontextus nem feltétlenül hosszú.** A megfelelő háttérfeltétel vagy különbségtétel gyakran többet ér, mint sok új szabály.
4. **Félreértésnél keresd a kimondatlan feltételezést.** Mielőtt újabb utasításokat adsz, nézd meg, milyen információ hiányozhatott a helyes értelmezéshez.

> **Ne csak azt mondd el az LLM-nek, mit szeretnél. Add meg azt a kontextust is, amelyből helyesen érthető, hogy mit jelent a kérésed.**
