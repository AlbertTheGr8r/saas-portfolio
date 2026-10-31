---
title: "This site itself"
date: "2026-02-14"
updated: "2026-10-31"
status: "ongoing"
excerpt: "A static publication and portfolio built with Next.js, Velite, and a neobrutalist design system."
tags: ["nextjs", "velite", "static-site"]
techStack: ["Next.js", "Velite", "Tailwind CSS", "TypeScript"]
demoUrl: "https://antiparity.net"
repoUrl: "https://github.com/AlbertTheGr8r/saas-portfolio"
draft: false
---

# This site itself

This is a static publication and portfolio. Essays, field notes, and case studies live as Markdown, get validated by Velite at build time, and ship as HTML.

The project began from the MIT-licensed [neobrutalism saas template](https://github.com/neobrutalism-templates/saas). The starter is no longer the point. The site is now a personal publication: a writing system, a case-study archive, and a place to keep the work legible.

## What it does

- Markdown content for essays and case studies
- Static export for GitHub Pages
- Generated RSS, Atom, JSON Feed, sitemap, and content index
- Dark mode
- Per-post metadata and structured data

## Stack

- **Next.js** — static export and routing
- **Velite** — content schema and build-time validation
- **Tailwind CSS** — styling
- **TypeScript** — type safety
- **GitHub Actions** — build and deploy
- **Cloudflare** — DNS, TLS, cache

## Build

```bash
pnpm install
pnpm dev
pnpm build
```

The build validates content, generates the sitemap and feeds, then exports the site to `out/`.

## License

Site code is MIT. Prose and images are all rights reserved unless otherwise credited. The upstream MIT notice is retained in `LICENSE`.
