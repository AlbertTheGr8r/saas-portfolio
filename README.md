# antiparity.net

Personal publication and portfolio for **Albert Francis P. Florin** — geodetic engineer and developer in Metro Manila. Essays, field notes, and case studies on geospatial systems, infrastructure, and the tools we use to think.

## Stack

- Next.js (static export)
- Velite for Markdown content
- Tailwind CSS + neobrutalist components
- GitHub Actions → GitHub Pages, behind Cloudflare

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The build generates Velite data, then the sitemap/feeds, then the static site in `out/`.

## Content

- `content/blog/` — essays and field notes
- `content/projects/` — case studies
- `content/drafts/` — local drafts, ignored by Git
- `templates/` — starting points for new posts

## Deploy

Push to `main`. The GitHub Actions workflow builds and deploys `out/` to GitHub Pages, then purges the Cloudflare cache.

## Licensing

- Site code: MIT. See `LICENSE`.
- Prose, essays, images, and figures: © Albert Francis P. Florin, all rights reserved, unless otherwise credited.
- Third-party images remain the property of their credited creators.

The site began from the MIT-licensed [neobrutalism saas template](https://github.com/neobrutalism-templates/saas) and has since been reworked into a publication. The upstream notice is retained in `LICENSE` as required.
