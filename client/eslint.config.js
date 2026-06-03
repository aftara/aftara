import globals from 'globals';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

export default [
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { ...globals.browser, ...globals.es2021 } },
    plugins: { react, 'react-hooks': hooks },
    rules: { ...hooks.configs.recommended.rules, 'react/react-in-jsx-scope': 'off' },
    settings: { react: { version: 'detect' } },
  },
];
