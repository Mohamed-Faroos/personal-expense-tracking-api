"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _db = require("./helpers/db");
var _auth = _interopRequireDefault(require("./routers/auth.router"));
var _expense = _interopRequireDefault(require("./routers/expense.router"));
var _expenseType = _interopRequireDefault(require("./routers/expenseType.router"));
var _process;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = ((_process = process) === null || _process === void 0 || (_process = _process.env) === null || _process === void 0 ? void 0 : _process.PORT) || 3000; // Default to port 3000 if process.env.PORT is undefined
var corsOptions = {
  origin: process.env.CORS_URL || "*"
};
(0, _db.initDB)();
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].json());
app.use("/auth", _auth["default"]);
app.use("/expense", _expense["default"]);
app.use("/expense-type", _expenseType["default"]);
app.get("/", function (_req, res) {
  res.send("Welcome to the Expense Tracker API");
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
var _default = exports["default"] = app;