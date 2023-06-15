module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:i18next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'ylsv-plugin',
    'unused-imports',
  ],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'indent': [2, 2],
    'react/jsx-filename-extension': [2, {extensions: ['.js', '.jsx', '.tsx']}],
    'import/no-unresolved': 'off',
    "unused-imports/no-unused-imports": "error",
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'object-curly-spacing': ['error', 'never'],
    'no-underscore-dangle': 'off',
    'semi': ['error', 'never'],
    'i18next/no-literal-string': ['error', {markupOnly: true, ignoreAttribute: ['data-testid', 'to']}],
    'max-len': ['error', {ignoreComments: true, code: 120}],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
    "react/display-name": "off", // Checks effect dependencies
    "no-undef": "off",
    "react/jsx-props-no-spreading": "off",
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "ylsv-plugin/path-checker": ["error", {alias: "@"}],
    "ylsv-plugin/public-api-checker": ["error", {
      alias: "@",
      testFiles: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'],
    }],
    "ylsv-plugin/layer-imports": ["error", {
      alias: "@",
      ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
    }],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      }
    }
  ]
}
