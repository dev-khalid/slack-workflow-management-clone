// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import * as importPlugin from 'eslint-plugin-import';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import promise from 'eslint-plugin-promise';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', 'coverage/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin,
      sonarjs: sonarjsPlugin,
      // @ts-ignore
      promise: promise,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        // Enforce PascalCase for classes, interfaces, enums, etc.
        {
          selector: ['class', 'interface', 'typeAlias', 'enum', 'typeParameter'],
          format: ['PascalCase'],
        },
        // Enforce camelCase or UPPER_CASE for constants
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        // camelCase for variables, properties and methods
        {
          selector: ['variable', 'parameter', 'method', 'accessor', 'property'],
          format: ['camelCase'],
        },
        {
          selector: ['object'],
          format: ['UPPER_CASE', 'camelCase'],
        },
        // Prefix private/protected properties with underscore
        {
          selector: 'memberLike',
          modifiers: ['private', 'protected'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',

      // NestJS best practices
      'max-classes-per-file': ['error', 1],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Import-related rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // SonarJS rules for code quality
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/max-switch-cases': ['error', 10],
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-one-iteration-loop': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',

      // Promise-related rules
      'promise/always-return': 'error',
      'promise/avoid-new': 'warn',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',

      'promise/no-native': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',
      'promise/no-multiple-resolved': 'error',

      // General code quality rules
      complexity: ['error', 10],
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      eqeqeq: ['error', 'always'],
      'max-depth': ['error', 4],
      'max-lines': ['warn', { max: 300 }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['warn', 4],
      'no-else-return': 'error',
      'no-magic-numbers': ['warn', { ignore: [-1, 0, 1] }],
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'no-throw-literal': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
    },
  },
  {
    // Special rules for test files
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts', 'test/**/*.ts'],
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);
