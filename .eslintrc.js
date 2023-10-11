module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", "ts", "tsx"] },
    ],

    "import/no-unresolved": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
