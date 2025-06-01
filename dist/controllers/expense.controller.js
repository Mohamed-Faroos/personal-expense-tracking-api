"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpenseSummaries = exports.filterExpenses = exports.editExpense = exports.deleteExpense = exports.addExpense = void 0;
var _httpCode = require("../lib/enum/httpCode");
var _expense = _interopRequireDefault(require("../models/expense.model"));
var _expenseType = _interopRequireDefault(require("../models/expenseType.model"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var EXPENSE_COLORS = {
  FOOD: "#FF6384",
  TRAVELING: "#36A2EB",
  FITNESS: "#FFCE56",
  ROOM: "#4BC0C0",
  ENTERTAINMENT: "#9966FF",
  OTHER: "#FF9F40"
};

/**
 * The function `addExpense` is an asynchronous function that adds a new expense to the database and
 * returns a success message or an error message accordingly.
 */
var addExpense = exports.addExpense = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$user, _req$body, title, amount, description, date, expenseType, userId, expenseDate, typeExists, newExpense, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, title = _req$body.title, amount = _req$body.amount, description = _req$body.description, date = _req$body.date, expenseType = _req$body.expenseType;
          userId = (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user._id;
          if (!(!title || !amount || !description || !date || !expenseType)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Title, Amount, description, date and expenseType are required'
          }));
        case 1:
          expenseDate = new Date(date);
          if (!isNaN(expenseDate.getTime())) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            message: "Invalid date format"
          }));
        case 2:
          _context.n = 3;
          return _expenseType["default"].findById(expenseType);
        case 3:
          typeExists = _context.v;
          if (typeExists) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Expense type not found'
          }));
        case 4:
          newExpense = new _expense["default"]({
            title: title,
            amount: amount,
            date: expenseDate,
            description: description,
            expenseType: expenseType,
            createdBy: userId
          });
          _context.n = 5;
          return newExpense.save();
        case 5:
          return _context.a(2, res.status(_httpCode.HTTP_CODE.CREATED).json({
            message: "Expense added successfully",
            expense: newExpense
          }));
        case 6:
          _context.p = 6;
          _t = _context.v;
          return _context.a(2, res.status(_httpCode.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add expense",
            error: _t.message
          }));
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function addExpense(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * The function `editExpense` updates an existing expense with the provided data in a Node.js
 * application using Express and Mongoose.
 */
var editExpense = exports.editExpense = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var id, _req$body2, title, amount, date, description, expenseType, expense, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          id = req.params.id;
          _req$body2 = req.body, title = _req$body2.title, amount = _req$body2.amount, date = _req$body2.date, description = _req$body2.description, expenseType = _req$body2.expenseType;
          _context2.n = 1;
          return _expense["default"].findById(id);
        case 1:
          expense = _context2.v;
          if (expense) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.NOT_FOUND).json({
            message: "Expense not found"
          }));
        case 2:
          // Update fields
          expense.title = title || expense.title;
          expense.amount = amount || expense.amount;
          expense.date = date || expense.date;
          expense.description = description || expense.description;
          expense.expenseType = expenseType || expense.expenseType;
          _context2.n = 3;
          return expense.save();
        case 3:
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.OK).json({
            message: "Expense updated successfully",
            expense: expense
          }));
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
            message: _t2.message
          }));
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function editExpense(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * The function `deleteExpense` deletes an expense by its ID and returns a success message or an error
 * message if the expense is not found or an internal server error occurs.
 */
var deleteExpense = exports.deleteExpense = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var id, expense, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.p = 0;
          id = req.params.id;
          _context3.n = 1;
          return _expense["default"].findById(id);
        case 1:
          expense = _context3.v;
          if (expense) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(_httpCode.HTTP_CODE.NOT_FOUND).json({
            message: "Expense not found"
          }));
        case 2:
          _context3.n = 3;
          return _expense["default"].findByIdAndDelete(id);
        case 3:
          return _context3.a(2, res.status(_httpCode.HTTP_CODE.OK).json({
            message: "Expense deleted successfully"
          }));
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          return _context3.a(2, res.status(_httpCode.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
            message: _t3.message
          }));
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function deleteExpense(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getExpenseSummaries = exports.getExpenseSummaries = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var userId, expenseTypes, typeMap, labels, backgroundColors, now, startOfCurrentMonth, endOfCurrentMonth, startOfPreviousMonth, endOfPreviousMonth, startOfYear, endOfYear, _yield$Promise$all, _yield$Promise$all2, currentMonthExpenses, previousMonthExpenses, currentYearExpenses, summarize, currentMonth, previousMonth, currentYear, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.p = 0;
          userId = req.user._id;
          _context4.n = 1;
          return _expenseType["default"].find();
        case 1:
          expenseTypes = _context4.v;
          // Map expenseTypeId to label
          typeMap = {};
          labels = [];
          backgroundColors = [];
          expenseTypes.forEach(function (type) {
            typeMap[type._id.toString()] = type.label;
            labels.push(type.label);
            backgroundColors.push(EXPENSE_COLORS[type.label] || "#cccccc");
          });
          now = (0, _moment["default"])();
          startOfCurrentMonth = now.clone().startOf("month").toDate();
          endOfCurrentMonth = now.clone().endOf("month").toDate();
          startOfPreviousMonth = now.clone().subtract(1, "month").startOf("month").toDate();
          endOfPreviousMonth = now.clone().subtract(1, "month").endOf("month").toDate();
          startOfYear = now.clone().startOf("year").toDate();
          endOfYear = now.clone().endOf("year").toDate(); // Fetch all needed expenses by user
          _context4.n = 2;
          return Promise.all([_expense["default"].find({
            createdBy: userId,
            date: {
              $gte: startOfCurrentMonth,
              $lte: endOfCurrentMonth
            }
          }), _expense["default"].find({
            createdBy: userId,
            date: {
              $gte: startOfPreviousMonth,
              $lte: endOfPreviousMonth
            }
          }), _expense["default"].find({
            createdBy: userId,
            date: {
              $gte: startOfYear,
              $lte: endOfYear
            }
          })]);
        case 2:
          _yield$Promise$all = _context4.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          currentMonthExpenses = _yield$Promise$all2[0];
          previousMonthExpenses = _yield$Promise$all2[1];
          currentYearExpenses = _yield$Promise$all2[2];
          // Helper to format chart data and total
          summarize = function summarize(expenses) {
            var dataMap = {};
            var total = 0;
            expenses.forEach(function (exp) {
              var typeLabel = typeMap[exp.expenseType.toString()];
              if (!dataMap[typeLabel]) {
                dataMap[typeLabel] = 0;
              }
              dataMap[typeLabel] += exp.amount;
              total += exp.amount;
            });
            var data = labels.map(function (label) {
              return dataMap[label] || 0;
            });
            return {
              chart: {
                labels: labels,
                datasets: [{
                  data: data,
                  backgroundColor: backgroundColors
                }]
              },
              total: total
            };
          };
          currentMonth = summarize(currentMonthExpenses);
          previousMonth = summarize(previousMonthExpenses);
          currentYear = summarize(currentYearExpenses);
          return _context4.a(2, res.status(_httpCode.HTTP_CODE.OK).json({
            message: "Expense summaries fetched successfully",
            data: {
              currentMonthExpense: currentMonth.chart,
              previousMonthExpense: previousMonth.chart,
              currentYearExpense: currentYear.chart,
              currentMonthTotal: currentMonth.total,
              currentYearTotal: currentYear.total
            }
          }));
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          return _context4.a(2, res.status(_httpCode.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
            error: _t4
          }));
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function getExpenseSummaries(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var filterExpenses = exports.filterExpenses = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _req$body3, startDate, endDate, expenseType, userId, query, expenses, structuredExpenses, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.p = 0;
          _req$body3 = req.body, startDate = _req$body3.startDate, endDate = _req$body3.endDate, expenseType = _req$body3.expenseType;
          userId = req.user._id;
          query = _objectSpread({
            createdBy: userId,
            date: _objectSpread(_objectSpread({}, startDate && {
              $gte: new Date(startDate)
            }), endDate && {
              $lte: new Date(endDate)
            })
          }, expenseType && {
            expenseType: expenseType
          });
          _context5.n = 1;
          return _expense["default"].find(query).sort({
            date: -1
          }).populate("expenseType");
        case 1:
          expenses = _context5.v;
          structuredExpenses = Object.entries(expenses.reduce(function (acc, expense) {
            var dateKey = (0, _moment["default"])(expense.date).format("YYYY-MM-DD");
            if (!acc[dateKey]) {
              acc[dateKey] = [];
            }
            acc[dateKey].push(expense);
            return acc;
          }, {})).map(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
              date = _ref7[0],
              data = _ref7[1];
            return {
              date: date,
              expenses: data
            };
          });
          res.status(200).json({
            data: structuredExpenses
          });
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t5 = _context5.v;
          console.error(_t5);
          res.status(500).json({
            message: "Failed to fetch expenses"
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function filterExpenses(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();