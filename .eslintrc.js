module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'react-app/jest',
    // "airbnb",
    // "airbnb-typescript",
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // project: "./tsconfig.json",
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-uses-react': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': ['off'],
    'no-unused-vars': 'warn',
    'react/prop-types': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
