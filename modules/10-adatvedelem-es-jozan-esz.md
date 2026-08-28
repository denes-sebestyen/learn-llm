# 10. modul – Adatvédelem és józan ész

Egy LLM-mel beszélgetni könnyű. Sokszor annyira természetesnek érződik, mint egy kollégának vagy ismerősnek írni.

Ez azonban könnyen elfeledteti velünk, hogy amikor adatot adunk egy AI-alkalmazásnak, **egy informatikai szolgáltatásnak továbbítjuk azt**.

Ez a modul nem azt tanítja, hogy „ne adj meg semmit az AI-nak”. A cél az, hogy tudd felismerni:

- milyen adatot készülsz megosztani;
- valóban szükséges-e a feladathoz;
- milyen következménye lehet a megosztásának;
- és hogyan érheted el ugyanazt a célt kevesebb érzékeny adattal.

> **Ne azt kérdezd csak, hogy az LLM tud-e segíteni. Azt is kérdezd meg: mit kell ehhez átadnom neki?**

---

# 1. A beszélgetés is adatátadás

Ha beírsz egy szöveget, feltöltesz egy dokumentumot vagy képet, az adat elhagyhatja azt az eszközt és környezetet, ahol eredetileg volt.

Ez akkor is igaz, ha a felület közvetlen és személyes beszélgetésnek érződik.

Például más kockázatot jelenthet:

- egy nyilvános sajtóközlemény összefoglalása;
- a saját önéletrajzod javítása;
- egy ügyfél szerződésének feltöltése;
- egy beteg teljes leletének elemzése;
- egy céges rendszer hozzáférési adatainak bemásolása.

A technikai művelet mindegyiknél hasonló lehet: adatot küldesz egy szolgáltatásnak. Az adat érzékenysége azonban nagyon különböző.

---

# 2. Nem minden személyes adat egyformán érzékeny

A „személyes adat” nagyon tág kategória.

Más következménye lehet annak, ha megadsz egy keresztnevet, és más annak, ha egyszerre megadsz például:

- teljes nevet;
- lakcímet;
- telefonszámot;
- személyazonosító adatokat;
- pénzügyi információkat;
- egészségügyi adatokat;
- belépési vagy hozzáférési adatokat.

Ráadásul több önmagában ártalmatlannak tűnő adat együtt már könnyen azonosíthat valakit.

Ezért nem elég azt kérdezni:

> Van ebben személyes adat?

Hasznosabb kérdések:

> Ki azonosítható ebből az információból?
>
> Mennyire érzékeny az adat?
>
> Mi történhet, ha illetéktelenül hozzáférnek?

---

# 3. A legjobb adatvédelmi trükk gyakran az, hogy nem küldöd el az adatot

Tegyük fel, hogy szeretnéd udvariasabbá tenni ezt az üzenetet:

> Kedves Kovács Anna! A 2026. szeptember 12-i vizsgálat eredményével kapcsolatban szeretnék időpontot kérni...

Lehetséges, hogy a feladat megoldásához sem a név, sem a pontos dátum, sem a vizsgálat típusa nem szükséges.

Írhatod inkább így:

> Tedd udvariasabbá ezt az üzenetet. A szögletes zárójelben lévő adatokat helyőrzőként hagyd meg:
>
> Kedves [név]! A [vizsgálat] eredményével kapcsolatban szeretnék időpontot kérni...

A modell ugyanúgy tud segíteni a megfogalmazásban, miközben kevesebb valódi adatot kap.

Ezt nevezzük **adatminimalizálásnak**: csak annyi adatot adj át, amennyi a feladathoz ténylegesen szükséges.

> **Amit az LLM-nek nem kell tudnia a feladat megoldásához, azt gyakran nem érdemes megadni neki.**

---

# 4. Az anonimizálás nem mindig olyan egyszerű, mint a név törlése

Könnyű azt gondolni, hogy ha kitöröltük valakinek a nevét, a dokumentum már anonim.

De lehet benne például:

- e-mail-cím;
- telefonszám;
- ügyfélszám;
- pontos munkakör és munkahely;
- ritka betegség;
- konkrét dátumok és helyszínek;
- fájlnevek vagy más technikai azonosítók.

Ezek kombinációjából az érintett személy név nélkül is felismerhető lehet.

Ezért érzékeny dokumentumnál ne csak neveket keress. Gondold végig, **milyen információk alapján lehet valakit vagy valamit visszaazonosítani**.

---

# 5. Más ember adata nem feltétlenül a te adatod

A saját adataidról bizonyos keretek között te döntesz.

Mások adatairól viszont nem feltétlenül.

Egy munkahelyi dokumentumban lehetnek például:

- ügyféladatok;
- munkatársak adatai;
- pályázók önéletrajzai;
- beszállítói kapcsolattartók adatai;
- belső értékelések;
- egészségügyi vagy pénzügyi információk.

Attól, hogy munkád során hozzáférsz ezekhez, még nem következik automatikusan, hogy egy külső AI-szolgáltatásnak is továbbíthatod őket.

Ugyanez igaz családtagok, ismerősök vagy ügyfelek adataira is.

---

# 6. A céges adat nem csak személyes adat lehet

Egy dokumentum akkor is érzékeny lehet, ha egyetlen ember személyes adata sincs benne.

Ilyen lehet például:

- nem publikált pénzügyi adat;
- üzleti terv;
- belső stratégia;
- ügyféllista;
- forráskód;
- rendszerarchitektúra;
- biztonsági konfiguráció;
- incidensleírás;
- még be nem jelentett termék vagy projekt.

Itt nem az a fő kérdés, hogy az adat „személyes-e”, hanem az, hogy **jogosult vagy-e azt az adott szolgáltatásnak átadni**.

Munkahelyen ezért az általános internetes tanács helyett a saját szervezet szabályai az irányadók. Lehet, hogy egy jóváhagyott vállalati AI-eszköz használható olyan adatokkal, amelyeket egy személyes fiókba nem szabad feltölteni.

---

# 7. Jelszót, titkos kulcsot és tokent ne adj meg

Vannak adatok, amelyeknél az adatminimalizálás helyett sokkal egyszerűbb szabály használható:

**ne másold be őket.**

Ilyenek lehetnek például:

- jelszavak;
- API-kulcsok;
- access tokenek;
- privát kriptográfiai kulcsok;
- session cookie-k;
- helyreállító kódok.

Ha például egy konfigurációs fájl hibájában kérsz segítséget, a valódi titkot helyettesítsd mesterséges értékkel:

```text
API_KEY=<REDACTED>
```

vagy

```text
API_KEY=example-key
```

Ha egy valódi titkot véletlenül mégis olyan helyre küldtél, ahová nem kellett volna, ne abból indulj ki, hogy „biztosan nem történt semmi”. Sok esetben a biztonságos megoldás a titok visszavonása vagy cseréje.

---

# 8. A szolgáltatások adatkezelése nem egyforma

Nem létezik egyetlen általános szabály arra, hogy „az AI mit csinál az adataiddal”.

Ez függhet többek között:

- a szolgáltatótól;
- az alkalmazástól;
- az előfizetés vagy szerződés típusától;
- a szervezeti beállításoktól;
- az adott funkciótól;
- az aktuális adatkezelési feltételektől.

Lehet különbség például abban, hogy:

- mennyi ideig őrzik meg az adatot;
- használható-e szolgáltatásfejlesztésre vagy modellfejlesztésre;
- milyen adminisztrátori hozzáférések vannak;
- mely országokban vagy rendszerekben történik feldolgozás;
- milyen törlési és megőrzési szabályok érvényesek.

Ezért az olyan mondatokkal, mint

> „Az AI mindent eltárol.”

vagy

> „A fizetős AI nem tárol semmit.”

érdemes óvatosnak lenni.

Ha az adatkezelés számít, **az adott szolgáltatás aktuális feltételeit és a saját szervezeted szabályait kell ellenőrizni**.

---

# 9. A memória és az előzmények kényelmesek – de növelhetik a kontextust

Egyes AI-alkalmazások képesek korábbi beszélgetésekből vagy külön tárolt információkból személyre szabni a választ.

Ez hasznos lehet: nem kell minden alkalommal újra elmondanod ugyanazt.

Ugyanakkor fontos tudni, hogy az aktuális válaszhoz adott esetben **nem csak az éppen begépelt mondatod szolgáltathat kontextust**.

Ez különösen akkor számít, ha ugyanazt az eszközt nagyon különböző célokra használod.

Érdemes megismerni az adott alkalmazásban:

- hogyan működnek a beszélgetési előzmények;
- van-e memória vagy hasonló személyre szabás;
- mit lehet törölni vagy kikapcsolni;
- van-e ideiglenes vagy elkülönített beszélgetési mód.

A pontos működés itt is szolgáltatás- és verziófüggő lehet.

---

# 10. A feltöltött fájl több adatot tartalmazhat, mint amit látsz

Egy dokumentumban vagy képben nem feltétlenül csak a látható tartalom van.

Lehetnek benne például:

- dokumentum-metaadatok;
- szerző neve;
- megjegyzések;
- követett módosítások;
- rejtett munkalapok vagy oszlopok;
- fájlnevek;
- képek metaadatai;
- olyan mellékletek vagy rétegek, amelyekre nem gondoltál.

Ezért érzékeny fájlnál a „ránéztem, nincs benne semmi titkos” nem mindig elegendő ellenőrzés.

Ha csak néhány bekezdés elemzésére van szükséged, sokszor biztonságosabb lehet csak azokat a részeket megadni a teljes eredeti fájl helyett.

---

# 11. A képernyőkép is szivárogtathat adatot

Egy hiba megmutatásához gyakran a legegyszerűbb képernyőképet készíteni.

A kép szélén azonban ott maradhat például:

- egy másik böngészőfül címe;
- felhasználónév vagy e-mail-cím;
- ügyfél neve;
- belső URL;
- értesítés;
- fájlútvonal;
- az alkalmazásban megnyitott másik rekord.

Képernyőkép feltöltése előtt ezért ne csak azt nézd meg, **amit meg akarsz mutatni**, hanem azt is, ami véletlenül rajta maradt.

---

# 12. Az LLM-et használhatod az adatok eltávolításának megtervezésére – de van egy csapda

Hasznos kérdés lehet:

> Milyen személyes vagy érzékeny adatokat érdemes eltávolítani egy ilyen típusú dokumentumból, mielőtt külső AI-szolgáltatásnak elküldöm?

De ehhez nem szükséges rögtön feltölteni magát az érzékeny dokumentumot.

Leírhatod először általánosan:

> Egy ügyfélszerződést szeretnék nyelvileg ellenőriztetni. Milyen adatokat anonimizáljak előtte?

Ez jó példa arra, hogyan lehet az LLM-et **a biztonságosabb munkafolyamat megtervezésére** használni anélkül, hogy már az első lépésben átadnád neki azt az adatot, amelynek a kezeléséről éppen dönteni próbálsz.

---

# 13. Az adatvédelmi kockázat nem csak az LLM-ből ered

Egy AI-alkalmazás gyakran több rendszerből áll.

Lehet benne például:

- fájlfeltöltés;
- felhőtárhely;
- kereső vagy retrieval rendszer;
- külső integráció;
- plugin vagy más eszköz;
- naplózás;
- vállalati adminisztráció.

Ezért nem mindig elegendő azt kérdezni, hogy „mit csinál a modell az adatommal?”.

A fontosabb kérdés sokszor:

> **Milyen rendszereken halad át az adatom, és kik férhetnek hozzá?**

Ez ugyanaz a gondolkodásmód, amelyet a korábbi modulokban a webes keresésnél és más eszközöknél is használtunk: az LLM és az őt körülvevő alkalmazás nem ugyanaz.

---

# 14. A kényelmes integráció új adatáramlást is jelenthet

Ha egy AI-eszköz hozzáfér például a levelezésedhez, dokumentumaidhoz, naptáradhoz vagy fejlesztői rendszeredhez, sokkal több feladatban tud segíteni.

Ez azonban új kérdéseket is felvet:

- mihez kap hozzáférést;
- csak olvasni tud-e vagy módosítani is;
- milyen műveleteket végezhet önállóan;
- milyen adatot küld tovább más szolgáltatásnak;
- hogyan vonható vissza a hozzáférés.

A „csatlakoztatva van” önmagában nem mondja meg ezeket.

Integráció engedélyezésekor ezért ugyanaz az elv hasznos, mint más informatikai rendszereknél: **csak olyan jogosultságot adj, amelyre ténylegesen szükség van**.

---

# 15. Ne az LLM-re bízd annak eldöntését, hogy megoszthatod-e az adatot

Kísértő lehet megkérdezni:

> Biztonságos, ha ezt a céges dokumentumot feltöltöm ide?

Az LLM azonban nem feltétlenül ismeri:

- a munkaszerződésedet;
- a titoktartási kötelezettségeidet;
- a vállalati szabályzatot;
- az ügyféllel kötött szerződést;
- az alkalmazás pontos vállalati konfigurációját;
- az aktuális jogi és adatkezelési feltételeket.

Segíthet **azonosítani a kérdéseket és kockázatokat**, de nem jó ötlet kizárólag tőle kérni engedélyt arra, hogy érzékeny adatot adj át neki.

Munkahelyi adatnál használd a jóváhagyott eszközöket és kövesd a szervezet szabályait. Ha bizonytalan vagy, kérdezd meg azt a személyt vagy csapatot, amely jogosult erről dönteni.

---

# 16. Egy egyszerű rutin megosztás előtt

Mielőtt személyes, céges vagy más érzékeny adatot küldesz egy AI-alkalmazásnak, állj meg néhány másodpercre.

## 1. Mi van benne?

Személyes adat? Ügyféladat? Titok? Belső céges információ? Hozzáférési adat?

## 2. Kell ez a feladathoz?

Ha nem, töröld vagy helyettesítsd.

## 3. Kié az adat?

A sajátod, más személyé, ügyfélé vagy a munkáltatóé?

## 4. Használhatom erre ezt a szolgáltatást?

Különösen céges vagy szabályozott adatnál ellenőrizd a vonatkozó szabályokat.

## 5. Adhatok kevesebbet?

A teljes dokumentum helyett elég egy részlet? A valódi név helyett elég `[név]`? A valódi konfiguráció helyett készíthető minimális példa?

## 6. Mi történne, ha ez az adat illetéktelenhez kerülne?

Ha a következmény súlyos lenne, legyen magasabb a küszöb a megosztáshoz.

---

# Gyakorlat – Ugyanaz a feladat kevesebb adattal

Válassz egy hétköznapi, de nem érzékeny példát, amelyben szerepel néhány konkrét adat. Például egy fiktív e-mailt, hibajegyet vagy dokumentumrészletet.

## 1. változat

Írd meg úgy a promptot, ahogy elsőre természetesen tennéd.

## 2. változat

Nézd végig, mely konkrét adatok szükségesek valóban a feladathoz.

Cseréld a fölöslegeseket helyőrzőkre, például:

- `[név]`;
- `[cég]`;
- `[dátum]`;
- `[azonosító]`;
- `[összeg]`.

Ezután tedd fel ugyanazt a kérdést.

## Gondold végig

- Rosszabb lett-e a válasz attól, hogy kevesebb valódi adatot adtál meg?
- Mely adatok bizonyultak szükségtelennek?
- Volt olyan adat, amelyről elsőre azt gondoltad, hogy kell, de valójában nem kellett?

A gyakorlat célja nem az, hogy mindent anonimizálj, hanem hogy kialakuljon a kérdés:

> **Mi az a legkevesebb adat, amellyel ezt a feladatot még jól meg lehet oldani?**

---

# Kísérlet – Mit tudsz egy szolgáltatás adatkezeléséről?

Válassz egy általad használt AI-szolgáltatást.

Próbáld meg kideríteni:

1. milyen adatokat tárolhat a beszélgetéseidből;
2. mire használhatja ezeket;
3. milyen beállításokkal tudod ezt befolyásolni;
4. hogyan törölhetők az előzmények vagy más tárolt adatok;
5. eltérnek-e a szabályok személyes és szervezeti használat esetén.

Ehhez használhatsz LLM-et a megfelelő dokumentáció megtalálására és értelmezésére, de a fontos állításokat ellenőrizd a szolgáltató aktuális dokumentációjában.

Ez egyszerre gyakorolja az adatvédelmi gondolkodást és az 5–6. modulban tanult forrásellenőrzést.

---

# Mit vigyél magaddal ebből a modulból?

1. **Az LLM-nek elküldött információ adatátadás.**
2. **Csak annyi adatot adj meg, amennyi a feladathoz szükséges.**
3. **A név törlése önmagában nem feltétlenül anonimizál egy dokumentumot.**
4. **Mások és a munkáltatód adatairól nem feltétlenül dönthetsz szabadon.**
5. **Jelszót, tokent, API-kulcsot és más titkot ne másolj be.**
6. **Az AI-szolgáltatások adatkezelése eltérhet és idővel változhat.**
7. **A fájlok és képernyőképek több információt tartalmazhatnak, mint elsőre látszik.**
8. **Az integrációk kényelme új hozzáféréseket és adatáramlást is jelenthet.**
9. **Az LLM segíthet a kockázatok felismerésében, de nem ő ad engedélyt érzékeny adatok megosztására.**
10. **Megosztás előtt kérdezd meg: mi az a legkevesebb adat, amellyel a feladat még megoldható?**

---

# Merre tovább?

Ezzel végigértünk az első tíz modulon.

A következő lépés már nem feltétlenül újabb szabályok megtanulása. Érdemes a tanultakat együtt használni: pontosítani a feladatot, iterálni, ellenőrizni a forrásokat, felismerni a kockázatot, megfelelő eszközt választani, és közben tudatosan kezelni azt is, milyen adatot adunk át.

Az LLM-ek jó használata nem egy tökéletes prompt megtalálásáról szól. Inkább egy olyan munkamódról, amelyben **te maradsz felelős a célért, az ellenőrzésért és a döntésért**, miközben a modellt ott használod, ahol valóban segít.