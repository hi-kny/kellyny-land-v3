/**
 * Rehype plugin that rewrites Notion-loader HTML so embed URLs render as
 * responsive provider-specific iframes.
 *
 * Runs inside `notionLoader({ rehypePlugins: [...] })`. Handles two cases:
 *
 *   Case 1 — notion-rehype-k's embed handler emits a bare
 *            <iframe src="{provider URL}">. Rewrite the whole iframe.
 *
 *   Case 2 — A paragraph whose only meaningful child is a single <a> whose
 *            href points at a recognized provider. This covers Notion's
 *            auto-linkified URLs on their own line. Conservative: we only
 *            rewrite if the paragraph contains that one link (whitespace
 *            allowed).
 *
 * After rewriting, walks back to the nearest preceding heading sibling
 * (h1–h6) and wraps its inline children in an <a href={sourceUrl}> so the
 * section title itself becomes the click-through to the original.
 */
import { fromHtml } from 'hast-util-from-html'
import type { Element, Root, ElementContent, Parent, Text } from 'hast'
import { urlToEmbedHtml } from './embed-providers.js'

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function parseFragment(html: string): ElementContent | null {
  const root = fromHtml(html, { fragment: true }) as unknown as Root
  const first = root.children.find((c) => c.type === 'element') as ElementContent | undefined
  return first ?? null
}

function isWhitespaceText(node: ElementContent): boolean {
  return node.type === 'text' && !/\S/.test((node as Text).value)
}

/**
 * Returns the sole <a> child if `p` contains exactly one element-child that
 * is an <a>, with all other children being whitespace-only text. Otherwise
 * returns null.
 */
function extractSoleLink(p: Element): Element | null {
  let link: Element | null = null
  for (const child of p.children as ElementContent[]) {
    if (child.type === 'element') {
      if (link) return null
      if (child.tagName !== 'a') return null
      link = child
    } else if (child.type === 'text') {
      if (!isWhitespaceText(child)) return null
    } else {
      return null
    }
  }
  return link
}

/**
 * Find the nearest preceding sibling that is a heading. Skips whitespace-only
 * text nodes. Returns null if the previous non-whitespace sibling isn't a heading.
 */
function findPrecedingHeading(parent: Parent, index: number): Element | null {
  for (let i = index - 1; i >= 0; i--) {
    const sib = parent.children[i] as ElementContent
    if (sib.type === 'text' && isWhitespaceText(sib)) continue
    if (sib.type === 'element' && HEADING_TAGS.has(sib.tagName)) return sib
    return null
  }
  return null
}

/**
 * Wrap the heading's inline children in a single <a href={url}>. Idempotent:
 * if the heading already contains a single <a>, leaves it alone.
 */
function linkifyHeading(heading: Element, url: string) {
  const kids = heading.children as ElementContent[]
  const nonWhitespace = kids.filter((c) => !(c.type === 'text' && isWhitespaceText(c)))
  if (nonWhitespace.length === 1 && nonWhitespace[0].type === 'element' && (nonWhitespace[0] as Element).tagName === 'a') return
  heading.children = [
    {
      type: 'element',
      tagName: 'a',
      properties: {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        className: ['embed-heading-link']
      },
      children: kids
    }
  ]
}

export default function rehypeNotionEmbeds() {
  return (tree: Root) => {
    // Walk top-level body children imperatively (not via visit) so we can
    // inspect preceding siblings within the same parent.
    const walk = (parent: Parent) => {
      const children = parent.children as ElementContent[]
      for (let i = 0; i < children.length; i++) {
        const node = children[i]
        if (node.type !== 'element') continue

        let rewritten = false
        let sourceUrl: string | null = null

        // Case 1: bare iframe
        if (node.tagName === 'iframe') {
          const src = node.properties?.src
          if (typeof src === 'string') {
            const replacement = urlToEmbedHtml(src)
            if (replacement) {
              const newNode = parseFragment(replacement)
              if (newNode) {
                children[i] = newNode
                rewritten = true
                sourceUrl = src
              }
            }
          }
        }

        // Case 2: paragraph with sole link
        if (!rewritten && node.tagName === 'p') {
          const link = extractSoleLink(node)
          const href = link?.properties?.href
          if (typeof href === 'string') {
            const replacement = urlToEmbedHtml(href)
            if (replacement) {
              const newNode = parseFragment(replacement)
              if (newNode) {
                children[i] = newNode
                rewritten = true
                sourceUrl = href
              }
            }
          }
        }

        if (rewritten && sourceUrl) {
          const heading = findPrecedingHeading(parent, i)
          if (heading) linkifyHeading(heading, sourceUrl)
        }

        // Recurse into containers (not into the just-replaced figure — no
        // nested embeds worth rewriting inside an iframe wrapper).
        if (!rewritten) {
          const child = children[i]
          if (child.type === 'element' && child.children?.length) {
            walk(child as Parent)
          }
        }
      }
    }

    walk(tree)
  }
}
