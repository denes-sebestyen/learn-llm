# 3. modul – A beszélgetés fontosabb, mint a tökéletes prompt

## Mit fogsz megtanulni?

Az előző modulban azt néztük meg, hogyan adhatsz megfelelő célt, kontextust és korlátokat egy kéréshez.

De még egy nagyon jól megfogalmazott első kérés sem garantálja, hogy rögtön pontosan azt a választ kapod, amelyre szükséged van.

Ez nem feltétlenül hiba.

Az LLM egyik legfontosabb tulajdonsága, hogy **nem kell minden feladatot egyetlen kérdés és egyetlen válasz formájában kezelned**.

A modul végére:

- természetesen tudod majd folytatni és pontosítani a beszélgetést;
- tudni fogod, hogyan jelezd, ha egy válasz nem azt adta, amit szerettél volna;
- tudsz alternatívákat és más megközelítéseket kérni;
- összetettebb problémákat kisebb lépésekre tudsz bontani;
- felismered, mikor érdemes visszalépni vagy újrakezdeni;
- és kevésbé fogod úgy érezni, hogy minden azon múlik, sikerült-e elsőre „tökéletes promptot” írnod.

---

# 1. A válasz nem a beszélgetés vége

A hagyományos internetes keresés könnyen kialakít egy kérdés–válasz gondolkodásmódot:

1. beírsz valamit;
2. megnézed az eredményt;
3. ha nem jó, másképp keresel.

LLM-mel azonban a korábbi beszélgetés is része lehet a következő kérésed kontextusának.

Tegyük fel, hogy ezt kéred:

> Segíts összeállítani egy háromnapos bécsi programot. Szeretjük a múzeumokat és a történelmi helyeket.

Az LLM készít egy tervet, de neked túl sok programot zsúfol egy napba.

Nem kell új beszélgetést kezdened, és nem kell az egész eredeti kérésedet újrafogalmaznod.

Elég lehet ennyi:

> Ez nekünk túl sűrű. Legyen naponta legfeljebb két nagyobb program, és maradjon idő csak sétálni is.

Ha a következő változatból valami mégsem tetszik:

> A Belvederét viszont tartsuk meg.

Majd:

> A harmadik nap délután már indulunk haza, azt rövidítsük le.

A beszélgetés során fokozatosan alakul ki az a terv, amely valóban megfelel neked.

> **Az első válasz gyakran nem késztermék, hanem kiindulópont.**

---

# 2. Mondd meg, mi nem jó

Ha egy válasz nem tetszik, az egyik legkevésbé hasznos visszajelzés ez:

> Ez nem jó.

Az LLM ebből tudja, hogy változtatnia kellene, de azt nem, hogy **min**.

Sokkal többet segít például:

> Túl hivatalos a hangneme. Egy régi kollégámnak írok, akivel tegeződünk.

vagy:

> A magyarázat első fele érthető, de attól a ponttól elvesztettem a fonalat, ahol a kamatos kamat képlete megjelenik. Onnan magyarázd el újra egy számpéldával.

vagy:

> Ezek az ötletek túl drágák. Maradjunk olyan megoldásoknál, amelyek legfeljebb 20 000 forintba kerülnek.

Nem kell udvarias körmondatokban magyarázkodnod. A lényeg, hogy az LLM számára kiderüljön, **mi az eltérés a kapott és a kívánt eredmény között**.

## A pozitív visszajelzés is információ

Nemcsak azt érdemes jelezni, mit szeretnél megváltoztatni.

Például:

> A második változat hangneme jó. Ezt tartsd meg, csak legyen körülbelül fele ilyen hosszú.

vagy:

> Az első két ötlet jó irány, a többi kevésbé. Adj még hármat inkább azokhoz hasonlóan.

Így kisebb az esélye, hogy a következő változatban az is eltűnik, ami már jól működött.

---

# 3. Ne csak új választ kérj – mondd el, milyen irányban változzon

Ha ugyanarra a kérdésre egyszerűen azt írod:

> Adj másikat.

kaphatsz más választ, de nem feltétlenül jobbat.

Hasznosabb lehet megadni, milyen szempontból szeretnél eltérő megoldást:

> Adj egy olcsóbb változatot.

> Mutass egy kevésbé kockázatos megközelítést is.

> Adj egy olyan megoldást, ami több munkával jár, de nem igényel új eszközt.

> Most nézzük meg ugyanezt egy teljesen más nézőpontból.

> Az eddigiek mind beltéri programok. Adj szabadtéri alternatívákat is.

Az „alternatíva” tehát nem feltétlenül azt jelenti, hogy véletlenszerűen kérünk még egy választ. Megmondhatjuk, **milyen dimenzió mentén legyen más**.

---

# 4. Kérj több lehetőséget, mielőtt választasz

Az LLM-ek hajlamosak egy jól hangzó megoldást gyorsan kidolgozni. Ez kényelmes, de könnyen azt az érzést keltheti, hogy ez **a** megoldás.

Sok helyzetben jobb először több lehetőséget látni.

Például ahelyett, hogy:

> Hogyan rendezzem át ezt a kis szobát?

kérheted ezt:

> Adj három eltérő elrendezési koncepciót: egyet, amely a legtöbb tárolóhelyet adja, egyet, amely a legtágasabb érzetet kelti, és egy kompromisszumos változatot.

Vagy:

> Három megközelítést szeretnék erre a problémára. Egyelőre csak röviden írd le őket, ne dolgozd ki részletesen.

Ez különösen hasznos összetettebb döntéseknél. Előbb feltérképezheted a lehetőségeket, és csak utána kérheted a kiválasztott irány részletes kidolgozását.

> **Nem mindig az első jó válasz részletesítése a legjobb következő lépés. Néha előbb érdemes megnézni, milyen más utak vannak.**

---

# 5. Kérdezz rá arra, amit nem értesz

Az LLM által adott magyarázatot sem kell egyben elfogadnod vagy elvetned.

Ha egy része világos, egy másik nem, pontosan megmondhatod, hol akadtál el.

Például:

> Azt értem, hogy a magasabb kamat miatt gyorsabban nő az összeg. Azt nem értem, miért számít ennyit, hogy a kamatot havonta vagy évente írják jóvá.

Vagy:

> Eddig értem. Mit jelent ebben a mondatban az, hogy „implicit”?

Vagy egyszerűen:

> Ezt a részt mondd el másképp.

Kérhetsz:

- hétköznapi példát;
- hasonlatot;
- ellenpéldát;
- egyszerűbb megfogalmazást;
- részletesebb magyarázatot;
- konkrét számpéldát;
- lépésenkénti bemutatást.

Egy tankönyv szövegével ellentétben a magyarázat **alakítható ahhoz, ahol te éppen tartasz**.

---

# 6. Kérheted, hogy előbb segítsen gondolkodni

Nem mindig az a leghasznosabb, ha az LLM rögtön kész választ ad.

Tegyük fel, hogy új telefont szeretnél választani, de még te sem tudod pontosan, mi alapján dönts.

Kérheted ezt:

> Ne ajánlj még konkrét telefont. Segíts először összeszedni, milyen szempontokat érdemes végiggondolnom.

Majd a felsorolt szempontokból kiválaszthatod, melyek fontosak neked.

Vagy:

> Mielőtt megoldást javasolsz, tegyél fel néhány kérdést, amelyek segítenek pontosítani a problémát.

Ez különösen akkor hasznos, amikor **még maga a kérdés sincs teljesen kialakítva a fejedben**.

Az LLM ilyenkor nemcsak válaszadó, hanem a probléma strukturálásában is segíthet.

---

# 7. Bontsátok kisebb lépésekre

Minél összetettebb egy feladat, annál kevésbé biztos, hogy érdemes egyetlen kérésben a teljes végeredményt elkészíttetni.

Tegyük fel, hogy családi ünnepséget szervezel húsz embernek.

Kérhetnéd ezt:

> Szervezz meg nekem egy húszfős családi ünnepséget.

De lehet, hogy hasznosabb előbb felbontani:

> Segíts felbontani a szervezést fő feladatokra. Egyelőre ne tervezzük meg őket részletesen.

Ezután például külön foglalkozhattok:

1. helyszínnel;
2. vendéglistával;
3. étellel és itallal;
4. időbeosztással;
5. költségekkel;
6. szükséges beszerzésekkel.

Majd:

> Kezdjük a helyszínnel. Milyen szempontokat kell eldöntenem?

A részekre bontásnak több előnye van:

- könnyebb észrevenni, ha valami kimaradt;
- nem kell egyszerre minden döntést meghoznod;
- egy rossz részlet miatt nem kell az egész tervet újragenerálni;
- közben változtathatsz az irányon.

Ez nem azt jelenti, hogy minden feladatot kötelező apró lépésekre bontani. Egy rövid e-mail megírásához például valószínűleg fölösleges lenne először külön „tervezési fázist” tartani.

A feladat bonyolultságához igazítsd a folyamatot.

---

# 8. Kérj kritikát is, ne csak támogatást

Ha elmondasz egy ötletet, könnyen olyan választ kapsz, amely segít továbbfejleszteni azt.

Ez hasznos, de néha éppen az ellenkezőjére van szükséged.

Például:

> Ez az ötletem. Mielőtt továbbfejlesztjük, keress benne gyenge pontokat és olyan feltételezéseket, amelyek esetleg nem igazak.

Vagy:

> Sorolj fel három komoly ellenérvet is.

Vagy:

> Milyen kérdéseket tenne fel valaki, aki nem ért egyet velem?

Ez nem garantálja, hogy az LLM kritikája helyes lesz. De segíthet olyan nézőpontokat találni, amelyek neked nem jutottak eszedbe.

Ugyanez döntéseknél is használható:

> Eddig az A lehetőség tűnik jobbnak. Mielőtt döntök, próbáld meg megmutatni, milyen helyzetben lenne mégis B a jobb választás.

Az LLM-et tehát nem csak arra használhatod, hogy megerősítse vagy kidolgozza az első elképzelésedet.

---

# 9. Javítsd ki, ha rossz irányba indult

Ha az LLM félreértett valamit, nyugodtan javítsd ki.

Például:

> Félreértettél: nem új autót szeretnék venni, hanem a meglévő fenntartási költségét szeretném csökkenteni.

vagy:

> Nem erre a Jánosra gondoltam. Arany Jánosról kérdeztem.

vagy:

> Az előző üzenetemben rosszul írtam: nem 15, hanem 50 emberről van szó. Számold újra ennek megfelelően.

Ez teljesen természetes része a beszélgetésnek.

## De figyelj egy fontos dologra

Az LLM általában igyekszik követni a javításodat akkor is, ha **te tévedsz**.

Ha például azt mondod:

> Nem, szerintem ezt a törvényt 2019-ben fogadták el. Javítsd ki.

előfordulhat, hogy a modell alkalmazkodik az állításodhoz, ahelyett hogy ellenőrizné azt.

Ezért különbséget érdemes tenni két helyzet között:

**Saját igényedet vagy adatodat javítod:**

> Nem 15, hanem 50 vendég lesz.

Ezt természetesen te tudod jobban.

**Egy külső tényt javítasz:**

> Szerintem 2019-ben fogadták el.

Itt már érdemes ellenőrzést kérni:

> Úgy emlékszem, 2019-ben fogadták el. Ellenőrizd, melyik év a helyes.

A tények ellenőrzésével a következő modulokban részletesen foglalkozunk.

---

# 10. A beszélgetésnek is lehet rossz iránya

Az iteráció nagyon hasznos, de nem mindig érdemes végtelenül javítgatni ugyanazt a beszélgetést.

Előfordulhat, hogy:

- az eredeti feladat időközben teljesen megváltozott;
- túl sok korábbi feltétel maradt a beszélgetésben;
- az LLM újra és újra ugyanabba a félreértésbe tér vissza;
- már te sem látod világosan, melyik korábbi utasítás érvényes;
- egy teljesen más megközelítést szeretnél kipróbálni.

Ilyenkor érdemes lehet összefoglalni az új állapotot:

> Kezdjük újra innen. A korábbi ötletekből csak ezt a három feltételt tartsuk meg: ...

Vagy akár új beszélgetést indítani, és az aktuálisan fontos információkat átvinni.

> **A kontextus hasznos, amíg segít. Ha már inkább zavar, érdemes rendet tenni vagy újrakezdeni.**

---

# 11. Nem minden korábbi információ marad meg örökké

Hosszabb beszélgetéseknél fontos tudni, hogy egy LLM nem feltétlenül kezeli korlátlanul a teljes korábbi párbeszédet.

Az adott rendszernek van egy korlátozott mennyiségű információja, amelyet egyszerre figyelembe tud venni. Ezt gyakran **kontextusablaknak** nevezik.

A különböző modellek és alkalmazások ezt eltérően kezelhetik. Egyes rendszerek hosszú beszélgetéseket is nagyon jól követnek, más esetekben régebbi részletek kieshetnek, összefoglalódhatnak vagy kisebb súlyt kaphatnak.

A gyakorlatban ebből egy egyszerű szabály következik:

Ha egy régen megadott feltétel továbbra is nagyon fontos, hosszú beszélgetésben érdemes időnként újra egyértelművé tenni.

Például:

> Mielőtt folytatjuk, foglald össze, milyen feltételekben állapodtunk meg eddig.

Majd ellenőrizheted az összefoglalást.

Ez nemcsak az LLM-nek segít. Neked is hasznos lehet egy hosszú tervezési folyamatban.

---

# 12. Egy beszélgetésből munkafolyamat lehet

Nézzünk egy teljesebb példát.

Tegyük fel, hogy szeretnél egy kisebb erkélyt növényekkel berendezni.

Kezdheted így:

> Szeretném növényekkel berendezni a kis erkélyemet. Segíts kitalálni, hogyan induljak el.

Az LLM felsorol néhány szempontot. Ezután:

> Mielőtt növényeket ajánlasz, kérdezz rá azokra a körülményekre, amelyek a választásukat befolyásolják.

Megválaszolod a kérdéseket, majd:

> Adj három koncepciót: egy nagyon kevés gondozást igénylőt, egy virágosabbat és egy olyat, amelyben fűszernövények is vannak.

Kiválasztod az egyiket:

> A harmadik tetszik. Dolgozzuk ki részletesebben.

Később:

> Túl sok növényt javasoltál. Szeretnék valamennyi szabad helyet is hagyni.

Majd:

> Készíts bevásárlólistát az átdolgozott változathoz.

Végül:

> Mielőtt megveszem őket, sorold fel, mely állításokat kellene ellenőriznem az adott növények fény- és hőigényéről.

Egyetlen nagy prompt helyett itt **együtt alakítottatok ki egy megoldást**.

Ez az egyik legfontosabb különbség a keresőként és a beszélgető partnerként való LLM-használat között.

---

# Gyakorlat – Hogyan folytatnád?

Az alábbi helyzetekben már kaptál egy választ az LLM-től. Írd le, hogyan folytatnád a beszélgetést.

### 1. Túl általános válasz

Egy állásinterjúra készülsz, és megkérted az LLM-et, hogy segítsen. Általános tanácsokat kaptál, például hogy érkezz időben és öltözz megfelelően.

Te viszont a szakmai kérdésekre szeretnél gyakorolni.

Mit írnál következőnek?

### 2. Majdnem jó levél

Az LLM megírt egy reklamációs levelet. A tartalma megfelelő, de túl indulatos lett, miközben te határozott, de nyugodt hangnemet szeretnél.

Hogyan kérnéd az átdolgozását úgy, hogy a jó részek megmaradjanak?

### 3. Egyetlen javaslat

Egy szoba berendezésére kaptál egy jó ötletet, de még nem szeretnél elköteleződni mellette.

Mit kérhetnél, mielőtt részletesen kidolgoztatod?

### 4. Nem értesz egy magyarázatot

Egy pénzügyi fogalom magyarázatának első felét érted, a második felében viszont elvesztetted a fonalat.

Milyen információt adnál erről az LLM-nek?

### 5. Bizonytalan vagy a saját ötletedben

Van egy megoldási javaslatod egy problémára, amely elsőre jónak tűnik.

Hogyan használnád az LLM-et arra, hogy ne csak továbbfejlessze, hanem meg is próbálja megcáfolni?

---

# Kísérlet – Ne fogadd el az első választ

Válassz egy valódi, de nem sürgős problémát vagy döntést, amelyen mostanában gondolkodsz.

Lehet például:

- egy program megtervezése;
- egy kisebb vásárlási döntés;
- egy levél megfogalmazása;
- valaminek a megtanulása;
- egy otthoni probléma megoldása;
- egy ötlet továbbfejlesztése.

Kezdd egy természetes első kérdéssel.

Ezután **ne tekintsd késznek az első választ**, még akkor sem, ha jónak tűnik.

A következő üzenetekben próbálj ki legalább hármat ezek közül:

- pontosíts egy feltételt;
- mondd meg, mi tetszik a válaszban;
- mondd meg, mi nem tetszik;
- kérj egy más jellegű alternatívát;
- kérj ellenérvet;
- kérj egyszerűbb vagy részletesebb magyarázatot;
- bontsd a feladatot kisebb részekre;
- kérd meg, hogy tegyen fel kérdéseket;
- kérj összefoglalást arról, hol tartotok.

A végén hasonlítsd össze az első és az utolsó eredményt.

Gondold végig:

- Miben lett jobb?
- Volt olyan módosítás, amely rosszabbá tette?
- Felmerült közben olyan szempont, amely az első kérdésed megfogalmazásakor még neked sem jutott eszedbe?
- Volt olyan pont, ahol egyszerűbb lett volna újrakezdeni?

A cél nem az, hogy minél több üzenetet írj, hanem hogy megtapasztald: **a beszélgetés maga is része a problémamegoldásnak**.

---

# Amit ebből a modulból érdemes megjegyezni

**1. Az első válasz nem feltétlenül végleges válasz.**

Tekinthetsz rá kiindulópontként.

**2. Ha valami nem jó, mondd meg, miért nem jó.**

A konkrét visszajelzésből könnyebb jobb következő változatot készíteni.

**3. Azt is mondd meg, mi működik jól.**

Így a következő változatban nem kell mindent újrakezdeni.

**4. Kérj eltérő alternatívákat, ne csak „még egy választ”.**

**5. Összetett feladatokat érdemes lehet kisebb lépésekre bontani.**

**6. Az LLM-et kritikára és ellenérvek keresésére is használhatod.**

Nem csak arra, hogy támogassa az első elképzelésedet.

**7. Nyugodtan javítsd ki — de külső tényeknél a saját javításod is lehet téves.**

**8. Hosszú beszélgetésben időnként érdemes összefoglalni, hol tartotok.**

**9. Ha a korábbi kontextus már inkább zavar, mint segít, lehet újrakezdeni.**

A következő modulban egy másik alapvető készségre térünk át: **hogyan ismerjük fel, mikor nem szabad egyszerűen elhinni egy meggyőzően megfogalmazott LLM-választ.**