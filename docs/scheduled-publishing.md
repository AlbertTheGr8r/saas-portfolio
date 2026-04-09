# Scheduled Publishing

**Date**: April 9, 2026

Posts can be scheduled for future publication by setting a date in the frontmatter that is later than the current date.

---

## How It Works

1. Set the `date` field in the frontmatter to a future date (YYYY-MM-DD format)
2. The post will be built into the site but filtered out from:
   - Blog listing page (`/blog`)
   - Post navigation (previous/next links)
   - Search indexes
3. On the scheduled date, the post automatically becomes visible

## Configuration

No additional configuration needed. The filtering is implemented in:

| File | Purpose |
|------|---------|
| `src/app/blog/page.tsx` | Filters listing to exclude `date > today` |
| `src/app/blog/[slug]/page.tsx` | Excludes future posts from navigation |

## Example

```yaml
---
title: "My Future Post"
date: "2026-06-09"
excerpt: "This post will go live on June 9, 2026"
tags: ["example"]
featured: false
draft: false
---

# My Future Post

Content here...
```

The post will be invisible until June 9, 2026.

## Notes

- Posts dated in the future are not blocked at the URL level—they simply don't appear in listings or navigation
- The `date` field serves dual purpose: publication date and scheduling mechanism
- All dates must be valid ISO format (YYYY-MM-DD)