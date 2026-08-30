import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const root = new URL('../', import.meta.url);
const docsDir = new URL('../src/content/docs/', import.meta.url);
const modulesSource = new URL('../modules/', import.meta.url);
const modulesTarget = new URL('../src/content/docs/modules/', import.meta.url);

function titleFromMarkdown(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? fallback;
}

function withFrontmatter(markdown, fallbackTitle) {
  if (markdown.startsWith('---\n')) return markdown;
  const title = titleFromMarkdown(markdown, fallbackTitle).replaceAll('"', '\\"');
  return `---\ntitle: "${title}"\n---\n\n${markdown}`;
}

async function writeDoc(sourceUrl, targetUrl, fallbackTitle, transform = (value) => value) {
  const markdown = transform(await readFile(sourceUrl, 'utf8'));
  await writeFile(targetUrl, withFrontmatter(markdown, fallbackTitle));
}

await rm(docsDir, { recursive: true, force: true });
await mkdir(modulesTarget, { recursive: true });

const moduleFiles = [
  '01-mi-az-llm.md',
  '02-hogyan-kerdezz.md',
  '03-beszelgetes-es-iteracio.md',
  '04-mikor-higgy-neki.md',
  '05-forrasok-es-ellenorzes.md',
  '06-aktualis-informaciok-es-web.md',
  '07-kockazatos-temak.md',
  '08-gondolkodasi-partner.md',
  '09-dokumentumok-kepek-es-bemenetek.md',
  '10-adatvedelem-es-jozan-esz.md',
];

for (const file of moduleFiles) {
  await writeDoc(
    new URL(`../modules/${file}`, import.meta.url),
    new URL(`../src/content/docs/modules/${file}`, import.meta.url),
    basename(file, '.md'),
  );
}

await writeDoc(
  new URL('../chatgpt-peldak.md', import.meta.url),
  new URL('../src/content/docs/chatgpt-peldak.md', import.meta.url),
  'Konkrét példa: ChatGPT',
);

await writeDoc(
  new URL('../README.md', import.meta.url),
  new URL('../src/content/docs/index.md', import.meta.url),
  'learn-llm',
  (markdown) => markdown
    .replaceAll('(modules/', '(/modules/')
    .replaceAll('.md)', '/)')
    .replace('(chatgpt-peldak.md)', '(/chatgpt-peldak/)'),
);

console.log(`Starlight content synchronized to ${docsDir.pathname}`);
