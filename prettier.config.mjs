/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^react-dom$',
    '^react-router-dom$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[.]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderTypeScriptVersion: '5.0.0',
}
