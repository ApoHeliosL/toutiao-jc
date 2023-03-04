// .eslintrc.js
module.exports = {
  root: '',
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [], //需要忽略的组件名
      },
    ],
  },
};
