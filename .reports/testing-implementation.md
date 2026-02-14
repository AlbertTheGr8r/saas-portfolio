# Content Integrity Testing Implementation

## Summary
Implemented comprehensive content integrity testing using Vitest, Zod, and related packages. All 34 tests passing across content validation and build output verification.

## Testing Infrastructure

### Packages Installed
- **vitest** (v4.0.18) - Testing framework
- **@vitest/ui** (v4.0.18) - UI for test visualization
- **zod** (v4.3.6) - Schema validation
- **expect-match-schema** (v1.1.0) - Custom Vitest matcher for Zod schemas
- **vitest-axe** (v0.1.0) - Accessibility testing
- **gray-matter** (v4.0.3) - Frontmatter parsing
- **glob** (v13.0.3) - File pattern matching
- **fast-xml-parser** (v5.3.5) - XML parsing for RSS feed validation

### Configuration Files

**vitest.config.ts**
- Configured Vitest with Node.js environment
- Set up path aliases for `@/` imports
- Added coverage configuration
- Specified test setup file and include patterns

**src/tests/setup.ts**
- Extends Vitest with `toMatchSchema` matcher from `expect-match-schema`
- Enables Zod schema validation in tests

## Test Suites

### 1. Content Tests (`src/tests/content.test.ts`)
21 tests covering:

#### Blog Posts Validation
- File existence and structure
- Valid frontmatter with Zod schema
- Required fields (title, date)
- Content presence
- Unique slug validation
- Optional field validation (updated date, cover image)
- Tag array validation
- Markdown syntax validation

#### Projects Validation
- All blog post validations
- Tech stack array presence
- Status enum validation (completed, in-progress, archived)
- Demo and repo URL format validation

#### Content Rules
- No duplicate titles across posts and projects
- Valid markdown syntax in all files
- Unmatched code block detection

#### Link Integrity
- Internal link format validation
- Links start with `/blog/` or `/projects/`

### 2. Build Output Tests (`src/tests/build.test.ts`)
13 tests covering:

#### RSS Feeds
- RSS 2.0 feed generation and structure
- Atom feed generation and structure
- JSON feed generation and valid JSON structure
- Cross-format consistency (all feeds have same items)
- Required RSS fields presence

#### Content Index
- JSON file generation
- Valid structure (posts, tags, techStacks arrays)
- Sorted arrays (tags and techStacks alphabetically sorted)
- Valid post entry structure

#### Static Pages
- HTML file generation
- Blog pages existence
- Project pages existence
- 404 page presence

#### Content Consistency
- Same number of posts in RSS feeds and content index

## Schemas (`src/tests/schemas.ts`)

Zod schemas for content validation:

### PostSchema
- title: string (required, min 1 char)
- slug: string (optional)
- date: YYYY-MM-DD format
- updated: YYYY-MM-DD format (optional)
- excerpt: string (optional)
- tags: array of strings
- draft: boolean (default false)
- archived: boolean (default false)
- coverImage: string (optional)
- featured: boolean (default false)

### ProjectSchema
All PostSchema fields plus:
- status: enum ['completed', 'in-progress', 'archived']
- demoUrl: URL or empty string (optional)
- repoUrl: URL or empty string (optional)
- techStack: array of strings (required)

## Test Scripts (package.json)

```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:run": "vitest run",
  "test:content": "vitest run src/tests/content.test.ts"
}
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once (CI mode)
pnpm test:run

# Run only content tests
pnpm test:content
```

## Test Results

Current test run (34 tests):
- ✓ 21 content tests
- ✓ 13 build output tests
- All passing

## Benefits

1. **Early Error Detection** - Catches content issues before build
2. **Schema Validation** - Ensures frontmatter consistency
3. **Build Verification** - Confirms all assets are generated correctly
4. **CI/CD Integration** - Can be run in GitHub Actions
5. **Developer Experience** - Fast feedback loop with watch mode

## Future Enhancements

Potential additions:
- Image optimization verification
- External link checking (with caching)
- Accessibility tests (vitest-axe integration)
- Performance benchmarks
- Snapshot testing for content changes
- Broken internal link detection

## Notes

- Tests run against actual content files in `content/` directory
- Build tests require `public/` and `out/` directories to exist
- RSS feed tests handle single-item edge case (object vs array)
- All tests are deterministic and fast (< 300ms total)
