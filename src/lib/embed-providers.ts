/**
 * URL → embed HTML transforms for Notion blog posts.
 *
 * Pure functions, no framework imports. Used by `rehype-notion-embeds.ts`
 * to rewrite bare iframes (Case 1) and sole-link paragraphs (Case 2) into
 * responsive provider-specific embeds at build time.
 *
 * The rehype plugin also links each embed's preceding heading to the source
 * URL so readers can click the section title to open the original.
 */

const IFRAME_STYLE =
  'position:absolute;inset:0;width:100%;height:100%;border:none;border-radius:6px'

const RESPONSIVE_FIGURE = (body: string) =>
  `<figure class="notion-embed"><div style="position:relative;width:100%;aspect-ratio:16/9">${body}</div></figure>`

/** YouTube: watch?v= / youtu.be/ / embed/ → /embed/{id} */
function youtube(url: string): string | null {
  const m = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([\w-]{11})/)
  if (!m) return null
  const src = `https://www.youtube.com/embed/${m[1]}`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="YouTube video player" loading="lazy" frameborder="0" style="${IFRAME_STYLE}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  )
}

/** Vimeo: vimeo.com/{id} → player.vimeo.com/video/{id} */
function vimeo(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (!m) return null
  const src = `https://player.vimeo.com/video/${m[1]}`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="Vimeo video player" loading="lazy" frameborder="0" style="${IFRAME_STYLE}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
  )
}

/** Figma: any figma.com/* URL → wrap through figma.com/embed?embed_host=astro&url={encoded}
 *  Notes:
 *  - Figma's canonical /embed endpoint handles parent-frame permissions for
 *    arbitrary hosts, but it rejects `embed.figma.com/proto/...` URLs as
 *    "Invalid URL". So we normalize `embed.figma.com/proto/...` →
 *    `www.figma.com/proto/...` (same path structure) before wrapping.
 *  - `*.figma.site` is Figma's static sites product; iframe it directly. */
function figma(url: string): string | null {
  const isCanonical = /figma\.com\/(file|proto|design|board|slides|deck)\//.test(url)
  const isEmbedHost = /^https?:\/\/embed\.figma\.com\//.test(url)
  const isSite = /\.figma\.site/.test(url)
  if (!isCanonical && !isEmbedHost && !isSite) return null

  // Figma Sites (*.figma.site) are published static sites — iframe them directly.
  // They have no X-Frame-Options / frame-ancestors restrictions, so no /embed wrapper needed.
  if (isSite) {
    return RESPONSIVE_FIGURE(
      `<iframe src="${url}" title="Figma site" loading="lazy" style="${IFRAME_STYLE}" allowfullscreen></iframe>`
    )
  }

  // Canonical design/proto files: wrap through /embed.
  // Normalize embed.figma.com → www.figma.com so Figma's /embed endpoint accepts it.
  const normalizedUrl = isEmbedHost ? url.replace(/embed\.figma\.com/, 'www.figma.com') : url
  const src = `https://www.figma.com/embed?embed_host=astro&url=${encodeURIComponent(normalizedUrl)}`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="Figma design" loading="lazy" style="${IFRAME_STYLE}" allowfullscreen></iframe>`
  )
}

/** Canva: any canva.com/design/... URL → append ?embed / &embed */
function canva(url: string): string | null {
  if (!/canva\.com\/design\//.test(url)) return null
  const embedUrl = url.includes('?') ? `${url}&embed` : `${url}?embed`
  return RESPONSIVE_FIGURE(
    `<iframe src="${embedUrl}" title="Canva design" loading="lazy" style="${IFRAME_STYLE}" allowfullscreen></iframe>`
  )
}

/** Google Slides: /presentation/d/{id}/... → /presentation/d/{id}/embed */
function googleSlides(url: string): string | null {
  const m = url.match(/docs\.google\.com\/presentation\/d\/([\w-]+)/)
  if (!m) return null
  const src = `https://docs.google.com/presentation/d/${m[1]}/embed`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="Google Slides presentation" loading="lazy" style="${IFRAME_STYLE}" sandbox="allow-scripts allow-same-origin allow-popups" allowfullscreen></iframe>`
  )
}

/** Spotify: open.spotify.com/{type}/{id}... → /embed/{type}/{id}... */
function spotify(url: string): string | null {
  if (!/open\.spotify\.com\//.test(url)) return null
  let embedUrl = url.replace('open.spotify.com/', 'open.spotify.com/embed/')
  if (!embedUrl.includes('utm_source=')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'utm_source=generator'
  }
  const tall = /\/(album|playlist|artist|show)\//.test(url)
  const height = tall ? 352 : 152
  return `<figure class="notion-embed"><iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border-radius:12px;border:0" loading="lazy" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe></figure>`
}

/** Loom: loom.com/share/{id} → loom.com/embed/{id} */
function loom(url: string): string | null {
  const m = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/)
  if (!m) return null
  const src = `https://www.loom.com/embed/${m[1]}`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="Loom video" loading="lazy" frameborder="0" style="${IFRAME_STYLE}" allowfullscreen></iframe>`
  )
}

/** Bilibili: BV{id} */
function bilibili(url: string): string | null {
  const m = url.match(/\/(BV[\w]+)/)
  if (!m) return null
  const src = `//player.bilibili.com/player.html?isOutside=true&bvid=${m[1]}&p=1&autoplay=0&muted=0`
  return RESPONSIVE_FIGURE(
    `<iframe src="${src}" title="Bilibili video player" loading="lazy" scrolling="no" frameborder="no" framespacing="0" style="${IFRAME_STYLE}" allowfullscreen="true"></iframe>`
  )
}

/** X/Twitter: build a widgets.js blockquote (not an iframe) */
function twitter(url: string): string | null {
  if (!/(?:twitter|x)\.com\/\w+\/status\/\d+/.test(url)) return null
  const twitterUrl = url.replace(/(\w+:\/\/)?x\.com\//g, '$1twitter.com/')
  return `<figure class="notion-embed x-card"><blockquote class="twitter-tweet" data-dnt="true"><a href="${twitterUrl}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></figure>`
}

/**
 * Try each provider in order. Returns embed HTML or null if the URL is not
 * a recognized embeddable provider.
 */
export function urlToEmbedHtml(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null
  const url = rawUrl.trim()
  if (!/^https?:\/\//.test(url)) return null

  return (
    youtube(url) ||
    vimeo(url) ||
    figma(url) ||
    canva(url) ||
    googleSlides(url) ||
    spotify(url) ||
    loom(url) ||
    twitter(url) ||
    bilibili(url)
  )
}
