# Changes Documentation

## April 2026

This document tracks changes made to address Google AdSense rejection issues.

---

## Schema Markup Implementation

### Overview
Added JSON-LD structured data (Schema.org) to blog posts and project pages to help Google understand the content structure and improve SEO visibility.

### Changes

**`src/app/blog/[slug]/page.tsx`**
- Added `BlogPosting` schema with:
  - `headline` → post title
  - `description` → post excerpt
  - `image` → cover image
  - `datePublished` → post date
  - `dateModified` → updated date (if present)
  - `author` → Person schema with name and URL
  - `publisher` → Person schema
  - `mainEntityOfPage` → WebPage reference

**`src/app/projects/[slug]/page.tsx`**
- Added `Article` schema with same fields as BlogPosting
- Uses `@type: 'Article'` for consistency with blog posts

### Rationale
- Follows existing `Person` schema pattern in `layout.tsx`
- Maps `date` → `datePublished` and `updated` → `dateModified`
- Layouts already display these dates correctly

---

## Content Templates

### Overview
Created reusable templates for consistent content creation.

### Files
- `templates/blog-template.md` - Blog post template
- `templates/projects-template.md` - Project template

### Features
- All frontmatter fields documented with comments
- Required fields clearly marked
- Optional fields include removal instructions
- Placeholder values for easy copying

### Usage
1. Copy template from `templates/` folder
2. Paste into `content/blog/` or `content/projects/`
3. Rename file and fill in values
4. Remove optional fields you don't use

---

## Test Updates

### Overview
Updated content integrity tests to ignore template files.

### Changes
**`src/tests/content.test.ts`**
- Added `**/*_template.md` to glob ignore patterns in:
  - Blog post validation
  - Project validation
  - Content rules validation
  - Link integrity validation

### Rationale
Templates are placeholder files that don't have valid content. They now live in `templates/` folder outside the content directory.

---

## Related Files

- `docs/adsense-readiness-report.md` - Initial AdSense review
- `docs/scheduled-publishing.md` - Scheduled publishing documentation (separate)

---

## Notes

- The `velite.config.ts` already supported the `updated` field - no changes needed
- Layouts (`editorial-layout.tsx`, `structured-editorial-layout.tsx`) already display dates correctly
- Ad placements were considered but deferred for later implementation
