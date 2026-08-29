# Webhely fejlesztése

A tananyag webes változata Astro + Starlight alapú. A repository gyökerében lévő Markdown fájlok maradnak az elsődleges tartalomforrások; a `src/content/docs` könyvtár build előtt automatikusan generálódik.

## Helyi futtatás

Node.js 22.12 vagy újabb szükséges.

```bash
npm install
npm run dev
```

A production build:

```bash
npm run build
```

Az elkészült statikus webhely a `dist/` könyvtárba kerül.

## Tartalomszinkronizálás

A `scripts/sync-content.mjs` a következő forrásokat másolja a Starlight content collectionbe:

- `README.md` → kezdőlap;
- `modules/*.md` → tananyagmodulok;
- `chatgpt-peldak.md` → ChatGPT-specifikus kiegészítés.

A script a Starlighthoz szükséges `title` frontmattert a Markdown első H1 címsorából állítja elő. A generált `src/content/docs/` nincs verziókezelve.

## Cloudflare Pages

Statikus deploymenthez nincs szükség Astro adapterre. Cloudflare Pages beállításként elegendő:

- build command: `npm run build`
- output directory: `dist`
- Node.js: 22.12 vagy újabb

A production branch lehet `main`; a pull request branchekhez a Pages preview deploymentet tud készíteni.
