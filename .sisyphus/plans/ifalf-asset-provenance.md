# Ifalf Asset Provenance Inventory

Static reference files scraped from ifalf.com and related sites via Firecrawl.
These are **read-only references** — do not modify or delete.

## File Index

### Root-level References

| File | Source URL | Content Type | Purpose |
|------|-----------|-------------|---------|
| `.firecrawl/ifalf-main.md` | `https://ifalf.com/` (full page) | Markdown (with images, links) | Complete homepage scrape — hero, about, skills carousel, project highlights, quote, contact, footer |
| `.firecrawl/ifalf.md` | `https://ifalf.com/` (mainContent) | Markdown (cleaned) | Same as above but with `onlyMainContent: true` — duplicates hero/quotes/projects without nav/footer chrome |
| `.firecrawl/vtuber.md` | `https://github.com/Ender-Wiggin2019/VTuber-Logos-Collection` | Markdown (GitHub repo) | VTuber Style Logo Collection repo — referenced for logo design inspiration (ifalfahri is a contributor) |
| `.firecrawl/vtuber-site.json` | `https://vtuber-style-logos.vercel.app/` | JSON (`{ markdown }`) | Live site scrape of the VTuber logo collection — structured JSON with embedded markdown |

### Nested Site Structure (`.firecrawl/ifalf/`)

| File | Source URL | Content Type | Purpose |
|------|-----------|-------------|---------|
| `.firecrawl/ifalf/index.md` | `https://ifalf.com/` | Markdown | Homepage reference (likely duplicate of ifalf-main.md) |
| `.firecrawl/ifalf/about/index.md` | `https://ifalf.com/about` | Markdown | About page content — bio, details |
| `.firecrawl/ifalf/blog/index.md` | `https://ifalf.com/blog` | Markdown | Blog page content |
| `.firecrawl/ifalf/projects/index.md` | `https://ifalf.com/projects` | Markdown | Full project listing — 19 projects with thumbnails, descriptions, tech stacks, links |
| `.firecrawl/ifalf/projects/aern/index.md` | `https://ifalf.com/projects/aern` | Markdown | Aernstore Feedback project detail |
| `.firecrawl/ifalf/projects/aldonime/index.md` | `https://ifalf.com/projects/aldonime` | Markdown | Aldonime project detail |
| `.firecrawl/ifalf/projects/bgbegone/index.md` | `https://ifalf.com/projects/bgbegone` | Markdown | Background Begone project detail |
| `.firecrawl/ifalf/projects/bhinneka/index.md` | `https://ifalf.com/projects/bhinneka` | Markdown | Bhinneka UI/UX project detail |
| `.firecrawl/ifalf/projects/breakthrough/index.md` | `https://ifalf.com/projects/breakthrough` | Markdown | Breakthrough Lighting project detail |
| `.firecrawl/ifalf/projects/butterfly/index.md` | `https://ifalf.com/projects/butterfly` | Markdown | Butterfly Tours project detail |
| `.firecrawl/ifalf/projects/cultrahub/index.md` | `https://ifalf.com/projects/cultrahub` | Markdown | Cultrahub project detail |
| `.firecrawl/ifalf/projects/dailyui/index.md` | `https://ifalf.com/projects/dailyui` | Markdown | Daily UI Challenge project detail |
| `.firecrawl/ifalf/projects/gfx/index.md` | `https://ifalf.com/projects/gfx` | Markdown | GFX Anime Graphic project detail |
| `.firecrawl/ifalf/projects/igfeed/index.md` | `https://ifalf.com/projects/igfeed` | Markdown | Instagram Feed Design project detail |
| `.firecrawl/ifalf/projects/igframe/index.md` | `https://ifalf.com/projects/igframe` | Markdown | Instagram Frame Filter project detail |
| `.firecrawl/ifalf/projects/ifaltools/index.md` | `https://ifalf.com/projects/ifaltools` | Markdown | Ifal Tools project detail |
| `.firecrawl/ifalf/projects/keluhkesah/index.md` | `https://ifalf.com/projects/keluhkesah` | Markdown | Keluh Kesah project detail |
| `.firecrawl/ifalf/projects/nusadaya/index.md` | `https://ifalf.com/projects/nusadaya` | Markdown | Nusadaya UI/UX project detail |
| `.firecrawl/ifalf/projects/roastinghp/index.md` | `https://ifalf.com/projects/roastinghp` | Markdown | Roasting HP project detail |
| `.firecrawl/ifalf/projects/vtuberlogo/index.md` | `https://ifalf.com/projects/vtuberlogo` | Markdown | VTuber Style Logo project detail |
| `.firecrawl/ifalf/projects/xpdc/index.md` | `https://ifalf.com/projects/xpdc` | Markdown | XPDC project detail |

## Provenance Status

- **Source**: ifalf.com (Ifal Fahri A's portfolio)
- **Method**: Firecrawl `/scrape` with `formats: ["markdown"]`
- **Date**: Scraped prior to 2026-05-09 (exact dates unknown)
- **License**: Content belongs to Ifal Fahri A — used as reference for portfolio cloning
- **Duplicates**: `ifalf-main.md` and `ifalf.md` overlap significantly (full page vs mainContent)
- **Untracked**: All `.firecrawl/` files are gitignored (untracked)

## Notes

- Image URLs in markdown reference `ifalf.com/_next/image/` — these are Next.js optimized images
- Project thumbnails are `.webp` files hosted on ifalf.com
- The VTuber references (`vtuber.md`, `vtuber-site.json`) are from a separate open-source project where ifalfahri is a contributor

---

## Local Placeholder Assets (Fariz-branded)

All files below are **original placeholder assets** — no copyrighted material from ifalf.com.

### Tech Logos (`public/tech/`)

| File | Source | Status | Permission |
|------|--------|--------|------------|
| `htmlnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `cssnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `vsnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `tsnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `pynime.svg` | Placeholder (original Fariz) | Local | N/A |
| `reactnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `nextnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `twnime.svg` | Placeholder (original Fariz) | Local | N/A |
| `nodenime.svg` | Placeholder (original Fariz) | Local | N/A |
| `laranime.svg` | Placeholder (original Fariz) | Local | N/A |
| `figmanime.svg` | Placeholder (original Fariz) | Local | N/A |
| `bunime.svg` | Placeholder (original Fariz) | Local | N/A |

### Wordmark

| File | Source | Status | Permission |
|------|--------|--------|------------|
| `public/fariz-wordmark.svg` | Placeholder (original Fariz) | Local | N/A |

### Project Thumbnails (`public/projects/`)

| File | Project | Source | Status | Permission |
|------|---------|--------|--------|------------|
| `dea.svg` | Dea | Placeholder (original Fariz) | Local | N/A |
| `space.svg` | Space | Placeholder (original Fariz) | Local | N/A |
| `avogado6.svg` | Avogado6 | Placeholder (original Fariz) | Local | N/A |
| `gak-ngotak.svg` | Gak Ngotak | Placeholder (original Fariz) | Local | N/A |
