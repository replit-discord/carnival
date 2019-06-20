module.exports = {
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "env": {
      "es6": true
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  extends: ["prettier", "plugin:prettier/recommended"]
};