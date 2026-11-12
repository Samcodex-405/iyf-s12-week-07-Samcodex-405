import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['node_modules/', 'coverage/'] },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            eqeqeq: 'error',
            curly: 'error',
            'prefer-const': 'warn',
        },
    },
    {
        files: ['tests/**/*.js', 'eslint.config.js'],
        languageOptions: { globals: { ...globals.node } },
    },
];
