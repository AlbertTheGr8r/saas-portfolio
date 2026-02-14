# Content Directory

This directory contains all static content for the site. Content is processed by Contentlayer at build time.

## Directory Structure

```
content/
├── blog/              # Blog posts
│   ├── my-post.md
│   └── _assets/       # Post-specific images
├── projects/          # Project write-ups
│   ├── my-project.md
│   └── _assets/
└── README.md          # This file
```

## Blog Post Schema

```yaml
---
title: string                    # Required
slug: string                     # Optional, defaults to filename
date: YYYY-MM-DD                 # Required
updated: YYYY-MM-DD              # Optional
excerpt: string                  # Optional, auto-generated from content if missing
tags: [string]                   # Optional
featured: boolean                # Optional, for featured articles
draft: boolean                   # Optional, excluded from production builds
archived: boolean                # Optional, hidden from feed but searchable
coverImage: string               # Optional, relative path to image
---
```

## Project Schema

```yaml
---
title: string                    # Required
slug: string                     # Optional, defaults to filename
date: YYYY-MM-DD                 # Required
updated: YYYY-MM-DD              # Optional
status: enum                     # completed | in-progress | archived
excerpt: string                  # Optional
tags: [string]                   # Optional
draft: boolean                   # Optional
archived: boolean                # Optional, hidden from feed but searchable
coverImage: string               # Optional
demoUrl: string                  # Optional
repoUrl: string                  # Optional
techStack: [string]              # Required for projects
---
```

## Markdown Guidelines

- Use GitHub-flavored Markdown (GFM)
- Internal links: `[text](./other-post)` or `[text](/blog/other-post)`
- Images: Store in `_assets/` folder, reference as `./_assets/image.png`
- Code blocks use triple backticks with language identifier

## Drafts

Set `draft: true` in frontmatter to exclude from production builds. Drafts are still available in development mode. Drafts cannot be searched.

## Archives

Set `archived: true` to hide posts from the main feed/listings but keep them accessible via direct URL and search. Unlike drafts, archived posts are included in production builds and searchable.

Use cases:
- Old posts you don't want to feature but keep accessible
- Seasonal content that's not currently relevant
- Posts you want to de-emphasize without hiding completely

## Featured Articles

Set `featured: true` to pin articles to the top. Exactly 2 featured articles will be displayed. If fewer than 2 are marked featured, the most recent non-featured articles will be used as fallback.

## Assets

- Images should be optimized before committing (WebP preferred)
- Store post-specific assets in `_assets/` subfolder
- Global assets go in `public/images/`
