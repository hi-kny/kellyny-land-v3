/**
 * Rehype plugin that downloads Notion-hosted attachments (signed S3 URLs) to
 * local files at build time so they become stable static assets.
 *
 * Why this exists:
 *
 *   notion-astro-loader / notion-rehype-k emit `<img src="https://*.amazonaws.com/...">`
 *   for image blocks and `<div class="notion-file"><a src="...">` for file blocks.
 *   Those S3 URLs are *signed* and expire hourly. At render time, Astro's
 *   image optimization pipeline (`getImage()`) fetches the URL; if the signature
 *   has drifted or Astro can't reach S3, the fetch fails and a downstream null
 *   access crashes the whole page render.
 *
 *   By downloading once at content-load time and rewriting the references to
 *   `/notion-assets/<hash>.<ext>`, we hand Astro plain local files that never
 *   expire.
 *
 * Transformations:
 *
 *   1. <img src="https://*.amazonaws.com/..."> → src rewritten to local path.
 *   2. <div class="notion-file"><a src="...signed-pdf...">name.pdf</a></div>
 *      → replaced with <figure class="notion-pdf-embed"> containing an inline
 *      <iframe> plus a download link caption.
 *   3. <div class="notion-file"><a src="...signed-file...">name.ext</a></div>
 *      (non-PDF) → replaced with <a class="notion-file-card"> download card.
 *
 *   Any asset whose fetch fails is left alone (with a build warning), so a
 *   single broken attachment doesn't crash the build.
 */
import { visit } from 'unist-util-visit'
import { createHash } from 'node:crypto'
import { mkdir, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import type { Element, ElementContent, Root } from 'hast'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public/notion-assets')
const URL_PREFIX = '/notion-assets'

function isNotionSignedUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false
  // Notion serves files from prod-files-secure.s3.*.amazonaws.com
  return /amazonaws\.com\//.test(url)
}

function stableHashForUrl(url: string): string {
  // Strip query string — signing params change every refresh, but the S3
  // path is stable, so the hash is too.
  const noQuery = url.split('?')[0]
  return createHash('sha1').update(noQuery).digest('hex').slice(0, 16)
}

function extensionFor(url: string, contentType?: string): string {
  const noQuery = url.split('?')[0]
  const m = noQuery.match(/\.([a-zA-Z0-9]{2,5})$/)
  if (m) return m[1].toLowerCase()
  if (contentType?.includes('pdf')) return 'pdf'
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('jpeg')) return 'jpg'
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('gif')) return 'gif'
  return 'bin'
}

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function filenameFromUrl(url: string): string {
  const noQuery = url.split('?')[0]
  const last = noQuery.split('/').pop() || 'download'
  try {
    return decodeURIComponent(last)
  } catch {
    return last
  }
}

interface DownloadResult {
  publicUrl: string
  size: number
  ext: string
}

const inflight = new Map<string, Promise<DownloadResult | null>>()

async function downloadToPublic(url: string): Promise<DownloadResult | null> {
  const hash = stableHashForUrl(url)
  if (!existsSync(PUBLIC_DIR)) {
    await mkdir(PUBLIC_DIR, { recursive: true })
  }
  // Fast path: file already downloaded in a prior run.
  const extGuess = extensionFor(url)
  const guessedFilename = `${hash}.${extGuess}`
  const guessedPath = path.join(PUBLIC_DIR, guessedFilename)
  if (existsSync(guessedPath)) {
    const s = await stat(guessedPath)
    return {
      publicUrl: `${URL_PREFIX}/${guessedFilename}`,
      size: s.size,
      ext: extGuess
    }
  }
  if (inflight.has(hash)) return inflight.get(hash)!
  const p = (async (): Promise<DownloadResult | null> => {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.warn(`[notion-attachments] ${res.status} fetching ${url.split('?')[0]}`)
        return null
      }
      const contentType = res.headers.get('content-type') || ''
      const ext = extensionFor(url, contentType)
      const filename = `${hash}.${ext}`
      const filePath = path.join(PUBLIC_DIR, filename)
      const buf = Buffer.from(await res.arrayBuffer())
      await writeFile(filePath, buf)
      return {
        publicUrl: `${URL_PREFIX}/${filename}`,
        size: buf.length,
        ext
      }
    } catch (err) {
      console.warn(`[notion-attachments] error fetching ${url.split('?')[0]}:`, err)
      return null
    }
  })()
  inflight.set(hash, p)
  return p
}

function buildPdfEmbed(publicUrl: string, filename: string, size: number): Element {
  // Append PDF open-parameter fragment so the embedded viewer starts with the
  // thumbnail sidebar collapsed. `pagemode=none` is the cross-browser spec;
  // `navpanes=0` is Chrome/Edge legacy but still honored; `toolbar=1` keeps
  // page controls visible. See Adobe's "PDF Open Parameters" spec.
  const viewerSrc = `${publicUrl}#toolbar=1&navpanes=0&pagemode=none`
  return {
    type: 'element',
    tagName: 'figure',
    properties: { className: ['notion-pdf-embed'] },
    children: [
      {
        type: 'element',
        tagName: 'iframe',
        properties: {
          src: viewerSrc,
          title: filename,
          loading: 'lazy',
          className: ['notion-pdf-iframe']
        },
        children: []
      },
      {
        type: 'element',
        tagName: 'figcaption',
        properties: { className: ['notion-pdf-caption'] },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: publicUrl,
              download: filename,
              className: ['notion-pdf-download']
            },
            children: [
              { type: 'text', value: `📄 ${filename} · ${prettySize(size)}` }
            ]
          }
        ]
      }
    ]
  }
}

function buildFileCard(publicUrl: string, filename: string, size: number): Element {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: publicUrl,
      download: filename,
      className: ['notion-file-card']
    },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['notion-file-icon'] },
        children: [{ type: 'text', value: '📎' }]
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['notion-file-info'] },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['notion-file-name'] },
            children: [{ type: 'text', value: filename }]
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['notion-file-meta'] },
            children: [{ type: 'text', value: prettySize(size) }]
          }
        ]
      },
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['notion-file-download-label'] },
        children: [{ type: 'text', value: 'Download ↓' }]
      }
    ]
  }
}

interface ImgTask {
  node: Element
  url: string
}
interface FileTask {
  parent: Element | Root
  index: number
  url: string
}

export default function rehypeNotionAttachments() {
  return async (tree: Root): Promise<void> => {
    const imgTasks: ImgTask[] = []
    const fileTasks: FileTask[] = []

    visit(tree, 'element', (node: Element, index, parent) => {
      if (!parent || index == null) return

      // Case 1: notion file block — <div class="notion-file"><a src="...">filename</a></div>
      const classList = Array.isArray(node.properties?.className)
        ? (node.properties!.className as string[])
        : []
      if (node.tagName === 'div' && classList.includes('notion-file')) {
        const anchor = (node.children as ElementContent[]).find(
          (c): c is Element => c.type === 'element' && c.tagName === 'a'
        )
        // notion-rehype-k uses `src` on the <a> (not `href`); handle both.
        const url = (anchor?.properties?.src ?? anchor?.properties?.href) as unknown
        if (isNotionSignedUrl(url)) {
          fileTasks.push({ parent: parent as Element | Root, index, url })
        }
        return
      }

      // Case 2: bare image with a Notion-hosted URL.
      if (node.tagName === 'img') {
        const url = node.properties?.src as unknown
        if (isNotionSignedUrl(url)) {
          imgTasks.push({ node, url: url as string })
        }
      }
    })

    // Fetch everything in parallel.
    const imgResults = await Promise.all(
      imgTasks.map(async (t) => ({ task: t, result: await downloadToPublic(t.url) }))
    )
    const fileResults = await Promise.all(
      fileTasks.map(async (t) => ({ task: t, result: await downloadToPublic(t.url) }))
    )

    // Rewrite image srcs in place.
    for (const { task, result } of imgResults) {
      if (!result) continue
      task.node.properties = { ...task.node.properties, src: result.publicUrl }
    }

    // Replace file-block nodes with download cards / PDF embeds.
    // Group by parent so we can splice by descending index and not shift later
    // indices out from under ourselves.
    const byParent = new Map<Element | Root, Array<{ index: number; replacement: Element | null }>>()
    for (const { task, result } of fileResults) {
      if (!result) continue
      const filename = filenameFromUrl(task.url)
      const replacement =
        result.ext === 'pdf'
          ? buildPdfEmbed(result.publicUrl, filename, result.size)
          : buildFileCard(result.publicUrl, filename, result.size)
      const list = byParent.get(task.parent) ?? []
      list.push({ index: task.index, replacement })
      byParent.set(task.parent, list)
    }
    for (const [parent, edits] of byParent) {
      edits.sort((a, b) => b.index - a.index)
      for (const { index, replacement } of edits) {
        if (replacement) parent.children[index] = replacement as ElementContent
      }
    }
  }
}
