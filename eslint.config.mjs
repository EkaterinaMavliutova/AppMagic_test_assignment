import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import js from '@eslint/js';

export default [
  {
    ignores: [
      'playwright-report',
      'test-results',
    ],
  },
  {
    plugins: {
      js,
      playwright,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
    }
  }
];