import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

export async function GET(context: APIContext) {
  const mdx = await getCollection('thoughts');
  let notion: any[] = [];
  try {
    notion = await getCollection('notionBlog');
  } catch {
    /* tolerate missing collection */
  }

  type Item = {
    title: string;
    link: string;
    pubDate: Date;
    description?: string;
  };

  const mdxItems: Item[] = mdx.map((entry: any) => ({
    title: entry.data.title,
    link: `/thoughts/${entry.id.replace(/\.mdx?$/, '')}`,
    pubDate: new Date(entry.data.pubDate),
    description: entry.data.description,
  }));

  const notionItems: Item[] = notion.map((entry: any) => {
    const props = entry.data?.properties ?? {};
    const title = (typeof props.Title === 'string' ? props.Title : '') || 'Untitled';
    const pdate = props['Publish Date'];
    const startISO =
      (pdate && typeof pdate === 'object' && 'start' in pdate ? pdate.start : pdate) ??
      Date.now();
    return {
      title,
      link: `/thoughts/${slugify(title) || entry.id}`,
      pubDate: new Date(startISO),
      description:
        typeof props['Key Takeaway'] === 'string' ? props['Key Takeaway'] : undefined,
    };
  });

  const items = [...mdxItems, ...notionItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
  );

  return rss({
    title: 'Kelly Nyland — Thoughts',
    description:
      "Long-form essays, course lessons, podcasts, and class material from Kelly Nyland — tech founder, AI strategist, and builder.",
    site: context.site!,
    items: items.map((i) => ({
      title: i.title,
      link: i.link,
      pubDate: i.pubDate,
      description: i.description,
    })),
    customData: '<language>en-us</language>',
  });
}
