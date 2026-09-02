import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'learn-llm',
      description: 'Gyakorlati tananyag nagy nyelvi modellek tudatos használatához.',
      locales: {
        root: { label: 'Magyar', lang: 'hu' },
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/denes-sebestyen/learn-llm' },
      ],
      sidebar: [
        { label: 'Kezdőlap', link: '/' },
        {
          label: 'Modulok',
          items: [
            { autogenerate: { directory: 'modules' } },
          ],
        },
        { label: 'Konkrét példa: ChatGPT', link: '/chatgpt-peldak/' },
      ],
    }),
  ],
});
