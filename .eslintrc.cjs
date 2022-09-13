module.exports = {
  "root": true,
  "extends": [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:mocha/recommended",
    "plugin:markdown/recommended"
  ],
  "rules": {
    "@blackflux/rules/c8-prevent-ignore": 1,
    "@blackflux/rules/kebab-case-enforce": 1,
    "max-len": ["error", {"code": 120}],
    "mocha/no-exclusive-tests": "error",
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "comma-dangle": ["error", "never"],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "indent": ["error", 2, {"SwitchCase": 1}],
    "quotes": [2, "single", {"avoidEscape": true}],
    "linebreak-style": [2, "unix"],
    "semi": [2, "always"],
    "no-unused-vars": [
      1,
      {"vars": "all", "args": "none", "ignoreRestSiblings": true}
    ],
    "no-var": [1],
    "no-fallthrough": [1],
    "spaced-comment": [
      "error",
      "always",
      {
        "line": {"exceptions": ["-", "+"], "markers": ["=", "!"]},
        "block": {
          "exceptions": ["-", "+"],
          "markers": ["=", "!", ":", "::"],
          "balanced": true
        }
      }
    ],
    "@blackflux/rules/prevent-typeof-object": 1,
    "mocha/no-mocha-arrows": 0,
    "mocha/no-hooks-for-single-case": 0,
    "import/no-useless-path-segments": [2, {"commonjs": true}],
    "import/extensions": [2, "always"],
    "import/prefer-default-export": 0
  },
  "env": {"es6": true, "node": true, "mocha": true},
  "globals": {},
  "plugins": ['@typescript-eslint', "json", "markdown", "mocha", "@blackflux/rules"],
  "parser": "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.json', '.md']
  },
  overrides: [
    {
      files: ["**/*.md"],
      processor: "markdown/markdown"
    }
  ]
};