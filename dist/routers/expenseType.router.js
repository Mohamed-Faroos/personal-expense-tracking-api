"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = require("../middleware");
var _expenseType = require("../controllers/expenseType.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ExpenseTypeRouter = _express["default"].Router();

/* route for user login api */
ExpenseTypeRouter.get("/all", _middleware.authMiddleware, _expenseType.getAllExpenseTypes);
var _default = exports["default"] = ExpenseTypeRouter;