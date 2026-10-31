import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    // Build output and generated content are not source files.
    ignores: ['.next/**', 'out/**', '.velite/**', 'test-results/**', 'playwright-report/**'],
  },
  ...nextVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
]

export default eslintConfig
