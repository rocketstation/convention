module.exports = {
  env: { es6: true, node: true },
  extends: ['standard', 'prettier', 'prettier/standard', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'arrow-body-style': ['error', 'always'],
    'complexity': ['error', 5],
    'curly': ['error', 'multi-line'],
    'max-lines': ['error', 255],
    'prettier/prettier': 'error',
    'sort-keys': ['error', 'asc', {
      caseSensitive: false,
      natural: true
    }]
  },
}
