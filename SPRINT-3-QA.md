# Sprint 3 — QA Sweep

Full walk-through of all 23 product pages. Run on production build (`pnpm preview`) at http://localhost:4328.

## All 23 pages serve HTTP 200

| Slug | Status | Hero source | Sections | Fallback gallery | Lighthouse perf | Notes |
|---|---|---|---|---|---|---|
| `/oddkin` | 200 | placeholder SVG | none | none (1 img only) | n/a (placeholder) | Awaiting Kelly content |
| `/atlas` | 200 | local `atlas_hero.webp` | 5 | n/a | **82** | Section galleries with CDN URLs in `product` section drag perf |
| `/warmup` | 200 | local `warmup_hero.webp` | 1 | n/a | **97** ✅ | Sprint 3 sample passes ≥95 |
| `/dutch` | 200 | local `dutch_hero.webp` | 1 | n/a | 75 | Section gallery has 8 CDN URLs |
| `/kookie` | 200 | first image (CDN URL) | none | 6 capped | 75 | No `heroImage` |
| `/spectacles` | 200 | first image (sq local) | none | 6 capped | 75 | First-image LCP |
| `/snapbots` | 200 | first image (sq local) | none | 6 capped | **97** ✅ | All gallery thumbs local |
| `/shopping-app` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/zero-party-data` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/minishop` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/textshop` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/petalfox` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/pop-up` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/shopping-qr` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/bb8` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/sprk` | 200 | first image | none | 4 (under cap) | 75 | No `heroImage` |
| `/ollie` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/ar-drone` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/roli` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/zik` | 200 | first image | none | 6 capped | 75 | No `heroImage` |
| `/zikmu` | 200 | first image | none | 4 (under cap) | 75 | No `heroImage` |
| `/soundwall` | 200 | first image | none | 5 (under cap) | 75 | No `heroImage` |
| `/retail` | 200 | placeholder SVG | none | none | n/a (placeholder) | Awaiting Kelly content |

## Functional checks (all 23)

- [x] Hero image renders or placeholder shows
- [x] Title, category, status, date render
- [x] Description paragraphs render
- [x] Section galleries render where present (atlas / warmup / dutch)
- [x] Fallback gallery (capped 6) renders for legacy pages
- [x] FigmaEmbed renders inline where specified (audit §3.7 fix)
- [x] YouTubeEmbed row renders for `videos[]` entries (spectacles, etc.)
- [x] Prev/next nav works — chains through `displayOrder` array (oddkin → atlas → … → soundwall → retail)
- [x] "All products" middle link points back to `/products`
- [x] No broken image variant 404s (verified post-fresh-build)

## Sprint 3 acceptance — met

- /products: **100 / 98 / 100 / 100** (perf / a11y / best / SEO)
- /warmup (sample): **97 / 100 / 100 / 100**
- All 23 pages build and serve HTTP 200
- FigmaEmbed inline where specified
- /project-atlas → /atlas redirect in `firebase.json`

## Known follow-ups (not in Sprint 3 scope)

1. **Pages without `heroImage` perf at 75.** The gallery first thumbnail loads at full optimized webp size (Sharp processed via `import.meta.glob`). Lighthouse's mobile profile detects it as LCP candidate. Fix: add `heroImage: getSqImage('<small-hero>.webp')` per entry. Atlas / warmup / dutch already have this.
2. **Astro `getImage()` desync in dynamic routes.** Tried processing gallery thumbs to 640w webp via `getImage()` but the asset pipeline doesn't reliably emit the variant URLs that `getImage()` returns (some 404). Reverted to plain `.src` (the full-resolution optimized image always emits). Track this issue if Astro ships a fix.
3. **Squarespace CDN URLs.** Atlas / warmup / dutch sections, snapbots, etc. mix local images with raw CDN URLs. Those bypass Sharp and contribute to perf hits where used.
4. **Lazy-load + LCP interaction.** Even with `loading="lazy"`, Chrome counts the first below-fold gallery image as LCP candidate on tall pages. Pushing the gallery further down or skeleton-loading would help.
