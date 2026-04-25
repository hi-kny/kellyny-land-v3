// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import remarkEmbeddedMedia from './src/plugins/remark-embedded-media.mjs';
import remarkReadingTime from './src/plugins/remark-reading-time.mjs';
import remarkTOC from './src/plugins/remark-toc.mjs';
import rehypeCleanup from './src/plugins/rehype-cleanup.mjs';
import rehypeImageProcessor from './src/plugins/rehype-image-processor.mjs';
import rehypeCopyCode from './src/plugins/rehype-copy-code.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://kellyny.land',
  output: 'static',
  prefetch: true,
  trailingSlash: 'never',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      { protocol: 'https', hostname: '**.squarespace-cdn.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.notion.so' },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
      wrap: false,
    },
    remarkPlugins: [
      remarkMath,
      remarkDirective,
      remarkEmbeddedMedia,
      remarkReadingTime,
      remarkTOC,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeCleanup,
      rehypeImageProcessor,
      rehypeCopyCode,
    ],
  },
  integrations: [mdx(), sitemap()],
});
