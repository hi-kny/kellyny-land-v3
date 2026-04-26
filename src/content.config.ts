import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { notionLoader } from 'notion-astro-loader';
import { notionPageSchema, transformedPropertySchema } from 'notion-astro-loader/schemas';
import rehypeNotionAttachments from './lib/rehype-notion-attachments.ts';
import rehypeNotionEmbeds from './lib/rehype-notion-embeds.ts';

// Local MDX collection — `/thoughts/*.mdx` files in this repo.
const thoughts = defineCollection({
  loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    category: z.enum(['Essay', 'Founder Memo', 'Course', 'Podcast', 'Class']).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
    series: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

/**
 * Notion-sourced posts pulled at build time.
 *
 * `notion-astro-loader@0.4.0` declares a peer of astro `^4 || ^5`; we are on
 * `6.1.x`. The content-loader API has been stable across these majors so
 * the loader works in practice — the peer warning is benign at install
 * time. If Astro changes the loader contract in the future, replace with
 * a custom loader built on `@notionhq/client`.
 */
const notionBlog = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_BLOG_DATABASE_ID,
    rehypePlugins: [rehypeNotionAttachments, rehypeNotionEmbeds],
    filter: {
      or: [
        { property: 'Status', select: { equals: 'Live' } },
        { property: 'Status', select: { equals: 'Unlisted' } },
      ],
    },
    sorts: [{ property: 'Publish Date', direction: 'descending' }],
  }),
  schema: notionPageSchema({
    properties: z.object({
      Title: transformedPropertySchema.title,
      Status: transformedPropertySchema.select,
      'Publish Date': transformedPropertySchema.date.optional(),
      Platform: transformedPropertySchema.select.optional(),
      'Content Type': transformedPropertySchema.select.optional(),
      'Content Pillar': transformedPropertySchema.select.optional(),
      'Key Takeaway': transformedPropertySchema.rich_text.optional(),
      URL: transformedPropertySchema.url.optional(),
      Series: transformedPropertySchema.rich_text.optional(),
    }),
  }),
});

export const collections = { thoughts, notionBlog };
