const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest
            },
            ecmaVersion: 2022,
            sourceType: 'commonjs'
        },
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
            'no-console': 'off', // Allow console.log in Lambda functions
            'comma-dangle': ['error', 'never']
        },
        ignores: [
            'node_modules/**',
            'coverage/**',
            '*.min.js'
        ]
    }
];