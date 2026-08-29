# Konkrét példa: ChatGPT

A tananyag fő részei szándékosan általánosan beszélnek az LLM-ekről és az LLM-alapú alkalmazásokról. Ez azért fontos, mert az alapelvek nem egyetlen termékhez kötődnek.

A gyakorlatban azonban könnyebb ezeket az elveket egy konkrét alkalmazáson keresztül felismerni. Ez a kiegészítés azt mutatja meg, hogyan jelennek meg a tananyag egyes fogalmai **a ChatGPT-ben**.

> **Fontos:** a ChatGPT egy folyamatosan változó termék. A menüpontok, elérhető funkciók, csomagok és pontos működés idővel változhatnak. Ha egy konkrét funkció vagy adatkezelési szabály fontos számodra, ellenőrizd az aktuális OpenAI-dokumentációt.

---

## 1. modul – A ChatGPT nem maga az LLM

Az első modulban különválasztottuk az AI, az LLM és az LLM-et használó alkalmazás fogalmát.

A ChatGPT jó példa erre a különbségre.

Amikor a ChatGPT-t használod, nem feltétlenül csak egy nyelvi modellel beszélgetsz. Az alkalmazás a modellt különböző eszközökkel és információforrásokkal egészítheti ki. A feladattól és az elérhető funkcióktól függően például:

- kereshet az interneten;
- képeket és dokumentumokat dolgozhat fel;
- fájlokkal dolgozhat;
- külső vagy csatlakoztatott szolgáltatásokhoz férhet hozzá;
- speciális eszközt használhat egy feladathoz.

Ezért hasznosabb így gondolkodni:

> **nyelvi modell + ChatGPT alkalmazás + rendelkezésre álló eszközök + aktuális kontextus → a kapott válasz**

Ennek gyakorlati jelentősége van. Ha a ChatGPT például friss webes információt talál, az nem azt jelenti, hogy a nyelvi modell betanított tudása hirtelen frissült. Az alkalmazás egy másik információforrást adott a modellnek a válasz elkészítéséhez.

---

## 3. modul – Egy beszélgetés kontextusa és a tartós személyre szabás nem ugyanaz

Egy ChatGPT-beszélgetésen belül a korábbi üzenetek kontextust adhatnak a következő válaszokhoz. Ez teszi lehetővé például az ilyen folytatást:

> Az előző változat jó, de legyen rövidebb.

Ehhez nem szükséges újra bemásolnod az előző szöveget: az ugyanabban a beszélgetésben már szerepel.

Ettől külön fogalom a **tartós személyre szabás vagy memória**. Ha ilyen funkció engedélyezve és elérhető, a ChatGPT későbbi beszélgetésekben is felhasználhat korábban megismert információkat.

A két jelenséget érdemes különválasztani:

- **beszélgetési kontextus:** ami az aktuális beszélgetés értelmezéséhez rendelkezésre áll;
- **tartós személyre szabás:** olyan információ, amely más beszélgetésekben is szerepet kaphat.

Ez azért is fontos, mert ha egy beszélgetés rossz irányba indult, néha egyszerűbb új beszélgetést kezdeni, mint egy hosszú, félreértésekkel teli előzményt tovább javítgatni.

---

## 5–6. modul – Webes keresés és források a ChatGPT-ben

A ChatGPT képes webes keresést használni, amikor a kérdéshez aktuális információ hasznos. A keresést bizonyos felületeken kézzel is kiválaszthatod, de a ChatGPT automatikusan is dönthet úgy, hogy keres a weben.

Ez jól mutatja a 6. modul egyik fő különbségét:

> **a modell saját tudása és az aktuálisan lekért információ nem ugyanaz.**

Ha a válasz webes keresést használ, a ChatGPT hivatkozásokat jeleníthet meg. Ezeket érdemes ugyanazzal a forráskritikával kezelni, mint bármely más hivatkozást:

1. nyisd meg a forrást, ha az állítás fontos;
2. ellenőrizd, hogy valóban alátámasztja-e a választ;
3. nézd meg a publikálás vagy frissítés dátumát;
4. fontos kérdésben részesítsd előnyben az elsődleges vagy hiteles forrást.

A ChatGPT saját dokumentációja is figyelmeztet arra, hogy a keresési találatok és hivatkozások lehetnek hiányosak, elavultak vagy pontatlanok.

Ezért a forrás megjelenése nem jelenti azt, hogy az ellenőrzés feladatát már teljesen elvégezte helyetted a rendszer.

Aktuális dokumentáció: [Internetes keresés a ChatGPT-vel](https://help.openai.com/hu-hu/articles/9237897-chatgpt-search)

---

## 9. modul – Fájlok és képek a ChatGPT-ben

A ChatGPT-ben dokumentumot vagy képet is adhatsz a beszélgetéshez. Ilyenkor különösen jól látható, hogy az LLM válasza nem kizárólag a betanításkor megszerzett tudásból készül: az általad adott anyag is a feladat információforrásává válik.

Ez sok feladatot egyszerűbbé tesz. Például kérheted egy dokumentum:

- összefoglalását;
- szerkezetének elemzését;
- bizonyos információk megkeresését;
- összehasonlítását egy másik dokumentummal;
- nyelvi vagy tartalmi átdolgozását.

De a 9. modul korlátai itt is érvényesek. Egy feltöltött dokumentum jelenléte nem garantálja, hogy a modell minden részét helyesen értelmezte vagy minden fontos részletet észrevett.

Érdemes ezért pontosítani, hogy **melyik dokumentumból, melyik részből és milyen feladatra** szeretnél választ.

---

## 10. modul – Memória, Temporary Chat és adatkezelési beállítások

A ChatGPT-ben a tartós személyre szabás egyik formája a memória. Ez kényelmes lehet, mert bizonyos információkat nem kell minden új beszélgetésben ismét megadnod.

Ez egyben jó példája a 10. modulban tárgyalt cserearánynak:

> **több hasznos kontextus → jobb személyre szabás, de egyben több tartósan releváns személyes információ**

Ha egy beszélgetésnél nem szeretnéd a normál előzmény- és memóriaműködést használni, a ChatGPT-ben létezik **Temporary Chat**. A pontos működés változhat, ezért használat előtt érdemes az aktuális leírást ellenőrizni. A jelenlegi OpenAI-dokumentáció szerint a Temporary Chat nem jelenik meg a normál beszélgetési előzményekben, nem hoz létre memóriát, és amíg ideiglenes marad, nem használják modellfejlesztésre; biztonsági célból azonban korlátozott ideig megőrizhetnek belőle másolatot.

A ChatGPT adatkezelési beállításai között külön szabályozható lehet az is, hogy a normál beszélgetések felhasználhatók-e a modellek fejlesztésére. Ez **nem ugyanaz a kérdés**, mint hogy egy beszélgetés megjelenik-e az előzményeidben vagy használható-e személyre szabásra.

Ez fontos általános tanulság:

> **„Megőrzi?”, „emlékszik rá?” és „felhasználja modellfejlesztésre?” három külön kérdés.**

Aktuális dokumentáció:

- [Temporary Chat FAQ](https://help.openai.com/en/articles/8914046-temporary-chat-faq)
- [Data Controls FAQ](https://help.openai.com/en/articles/7730893-data-controls-faq)

---

## Mire jó ez a kiegészítés?

A ChatGPT konkrét funkciói segítenek felismerni az általános fogalmakat a gyakorlatban, de nem helyettesítik őket.

Ha később más LLM-alapú alkalmazást használsz, érdemes ugyanazokat a kérdéseket feltenni:

- Mi maga a modell, és mit ad hozzá az alkalmazás?
- Milyen kontextust kap a modell?
- Használ-e webes vagy más külső forrást?
- Milyen eszközökhöz fér hozzá?
- Milyen adat marad meg a beszélgetés után?
- Mely funkciók függnek a csomagtól, a beállításoktól vagy a szervezeti környezettől?

Ha ezeket meg tudod válaszolni, akkor nem csak egy konkrét termék kezelését tanultad meg: **van egy mentális modelled, amellyel új AI-alkalmazásokat is értelmezni tudsz.**