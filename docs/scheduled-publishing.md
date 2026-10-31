# Publishing Schedule

**Cadence:** the 15th and 30th (the 30th, or the last day of February). Do not announce the cadence publicly until three posts are edited and ready.

## How publishing works

This is a static site. A post becomes visible only after a build and deploy. There is no server-side scheduler.

1. Write the post in `content/blog/`.
2. Set `date` to the publication date (YYYY-MM-DD).
3. Run `pnpm build` and deploy on the publication day, or push to `main` on that day.
4. Verify the post, sitemap, and feed after deploy.

Future-dated posts are filtered out of listings, navigation, sitemap, and feeds at build time. They do not appear automatically on their date unless a new build runs.

## Optional automation

If automatic publishing is wanted later, run the build/deploy workflow on a schedule:

```yaml
on:
  schedule:
    - cron: "0 1 15 * *" # 09:00 PHT on the 15th
    - cron: "0 1 30 * *" # 09:00 PHT on the 30th
    - cron: "0 1 28 2 *" # 09:00 PHT on 28 February
    - cron: "0 1 29 2 *" # 09:00 PHT on 29 February (leap years)
```

Cron cannot express "the last day of the month", so February needs its own line. GitHub Actions cron runs in UTC and can be delayed. Manual publishing on the day is more predictable for a personal blog.

## Editing rhythm

| Publish | Outline | Draft | Edit/fact-check | Publish |
|---|---|---|---|---|
| 15th | 1st | 8th | 12th | 15th |
| 30th | 15th | 22nd | 27th | 30th (28 Feb) |

## Checklist

- [ ] Frontmatter: title, date, excerpt, tags
- [ ] Byline and reading time
- [ ] 2–3 internal links
- [ ] Sources for technical claims
- [ ] Image credits
- [ ] Mobile check
- [ ] Build, deploy, verify sitemap/feed
