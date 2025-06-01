"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _middleware = require("../middleware");
var _expense = require("../controllers/expense.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ExpenseRouter = _express["default"].Router();

/* route for user expense api */
ExpenseRouter.post("/add", _middleware.authMiddleware, _expense.addExpense);
ExpenseRouter.put("/edit/:id", _middleware.authMiddleware, _expense.editExpense);
ExpenseRouter["delete"]("/delete/:id", _middleware.authMiddleware, _expense.deleteExpense);
ExpenseRouter.get("/stats", _middleware.authMiddleware, _expense.getExpenseSummaries);
ExpenseRouter.post("/filter", _middleware.authMiddleware, _expense.filterExpenses);
var _default = exports["default"] = ExpenseRouter;