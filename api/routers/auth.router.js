"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../controllers/auth.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var AuthRouter = _express["default"].Router();

/* route for user login api */
AuthRouter.post("/login", _auth.login);

/* route for user registration api */
AuthRouter.post("/register", _auth.register);
var _default = exports["default"] = AuthRouter;