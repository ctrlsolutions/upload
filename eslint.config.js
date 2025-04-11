import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import parserVue from 'vue-eslint-parser'
import pluginTS from '@typescript-eslint/eslint-plugin'
import parserTS from '@typescript-eslint/parser'

export default [
  // ✅ Apply to JS and Vue (no TypeScript linting here)
  {
    name: 'app/js-and-vue',
    files: ['**/*.{js,vue}'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,
    },
  },

  // ✅ Apply TypeScript rules only to actual TS files or <script lang="ts">
  {
    name: 'app/ts-only',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTS,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTS,
    },
    rules: {
      ...pluginTS.configs.recommended.rules,
    },
  },

  {
    name: 'app/ignore',
    ignores: ['dist/**', 'coverage/**'],
  },

  // ✅ Prettier config (skip formatting rules)
  skipFormatting,
]
