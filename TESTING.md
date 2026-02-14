# Testing Guide

This project uses a comprehensive testing strategy to ensure content integrity, build output quality, and UI consistency.

## Test Types

### 1. Content Integrity Tests

**Location**: `src/tests/content.test.ts`

Validates all markdown content in the `content/` directory to ensure consistency and correctness.

**What it tests**:
- Frontmatter schema validation using Zod
- Required fields presence (title, date)
- Date format validation (YYYY-MM-DD)
- Unique slugs across all content
- Tag array validation
- Markdown syntax (unmatched code blocks)
- Internal link format
- Cover image existence

**Run**:
```bash
pnpm test:content
```

### 2. Build Output Tests

**Location**: `src/tests/build.test.ts`

Verifies that the build process generates all expected assets correctly.

**What it tests**:
- RSS feed generation (RSS 2.0, Atom, JSON)
- Feed format consistency across all formats
- Content index JSON structure
- Static HTML page generation
- Build output completeness

**Run**:
```bash
pnpm test:run src/tests/build.test.ts
```

### 3. Visual Regression Tests

**Location**: `src/tests/visual/`

Captures and compares UI screenshots to detect unintended visual changes.

**What it tests**:
- Navigation bar visibility and positioning
- Theme toggle behavior
- Sticky header scroll behavior
- Page layout consistency
- Responsive design breakpoints
- Component rendering across pages

**Run**:
```bash
pnpm test:visual
```

## Running Tests

### All Tests
```bash
pnpm test:run
```

### Specific Test Suites
```bash
pnpm test:content      # Content integrity only
pnpm test:run          # All tests once (CI mode)
pnpm test:ui           # Interactive UI mode
```

### Watch Mode
```bash
pnpm test              # Continuous testing during development
```

## CI/CD Integration

Tests run automatically on:
- Every pull request
- Before deployment to GitHub Pages

See `.github/workflows/` for workflow configuration.

## Test Structure

```
src/tests/
├── setup.ts              # Test configuration and extensions
├── schemas.ts            # Zod schemas for content validation
├── content.test.ts       # Content integrity tests
├── build.test.ts         # Build output tests
└── visual/               # Visual regression tests (WIP)
```

## Adding New Tests

### Content Tests
1. Add Zod schema to `schemas.ts` if needed
2. Write test in `content.test.ts`
3. Use existing patterns for file iteration and validation

### Build Tests
1. Add test to `build.test.ts`
2. Use file system utilities to verify generated assets
3. Parse and validate structured data (JSON, XML)

### Visual Tests
1. Add page scenario to visual test suite
2. Define viewport sizes and interactions
3. Establish baseline screenshots

## Utilities

### Zod Schemas
Custom schemas for validating frontmatter:
- `PostSchema` - Blog post validation
- `ProjectSchema` - Project validation

### Custom Matchers
- `toMatchSchema()` - Validate data against Zod schema

### Fixtures
Sample content in `content/` directory serves as test fixtures.

## Troubleshooting

### Tests fail on CI but pass locally
- Check for environment differences
- Ensure all build artifacts are present
- Verify file paths are correct for CI environment

### Content tests fail
- Check frontmatter format in markdown files
- Verify all required fields are present
- Ensure dates are in YYYY-MM-DD format

### Build tests fail
- Run `pnpm run build` first to generate assets
- Check that `public/` and `out/` directories exist
- Verify RSS feeds are being generated

## Notes

- Tests run against actual content files
- Build tests require successful build first
- Visual tests establish baselines on first run
- All tests are deterministic and fast (< 1s total)
