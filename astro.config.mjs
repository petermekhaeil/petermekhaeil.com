import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  adapter: netlify({
    cacheOnDemandPages: true,
    edgeMiddleware: true,
  }),
  integrations: [tailwind(), sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true
    }
  },
  site: 'https://petermekhaeil.com',
  output: 'hybrid',
});
