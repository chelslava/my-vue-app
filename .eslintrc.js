module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      'no-undef': 'off', // Отключение проверки для глобальных макросов Vue 3
    },
  };
  