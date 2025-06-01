"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _js = _interopRequireDefault(require("@eslint/js"));
var _config = require("eslint/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = (0, _config.defineConfig)([{
  files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  plugins: {
    js: _js["default"]
  },
  "extends": ["js/recommended"],
  languageOptions: {
    globals: {
      process: 'readonly',
      global: 'readonly',
      console: 'readonly'
    }
  },
  rules: {
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_'
    }]
  }
}]);