module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': 'off', // Allow console.log in Lambda functions
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
    },
    globals: {
        'process': 'readonly'
    }
};