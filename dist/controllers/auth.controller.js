"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _httpCode = require("../lib/enum/httpCode");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * The function `register` handles user registration by hashing the password, creating a new user in
 * the database, generating a JWT token.
 */
var register = exports.register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, firstName, lastName, email, password, hashedPassword, user, registeredUser, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password;
          _context.n = 1;
          return _bcrypt["default"].hash(password, 10);
        case 1:
          hashedPassword = _context.v;
          if (firstName) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'First name is required'
          }));
        case 2:
          if (lastName) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Last name is required'
          }));
        case 3:
          if (email) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Email is required'
          }));
        case 4:
          if (password) {
            _context.n = 5;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Password is required'
          }));
        case 5:
          user = new _user["default"]({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdDate: new Date()
          });
          _context.n = 6;
          return user.save();
        case 6:
          registeredUser = _context.v;
          if (registeredUser) {
            _context.n = 7;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Registration failed'
          }));
        case 7:
          return _context.a(2, res.status(_httpCode.HTTP_CODE.CREATED).json({
            message: 'User registered successfully'
          }));
        case 8:
          _context.p = 8;
          _t = _context.v;
          if (!(_t.code === 11000 || _t.code === 11001)) {
            _context.n = 9;
            break;
          }
          return _context.a(2, res.status(_httpCode.HTTP_CODE.ALREADY_EXIST).json({
            errorMessage: "User already exist"
          }));
        case 9:
          return _context.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Registration failed'
          }));
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * The login function handles user authentication by checking the email and password, generating access
 */
var login = exports.login = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _req$body2, email, password, user, passwordMatch, accessToken, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          if (!(!email || !password)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Email and password are required'
          }));
        case 1:
          _context2.n = 2;
          return _user["default"].findOne({
            email: email.toLowerCase()
          });
        case 2:
          user = _context2.v;
          if (user) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.NOT_FOUND).json({
            errorMessage: 'User not found'
          }));
        case 3:
          _context2.n = 4;
          return _bcrypt["default"].compare(password, user.password);
        case 4:
          passwordMatch = _context2.v;
          if (passwordMatch) {
            _context2.n = 5;
            break;
          }
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Incorrect password'
          }));
        case 5:
          accessToken = _jsonwebtoken["default"].sign({
            userId: user._id,
            email: user === null || user === void 0 ? void 0 : user.email,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
          });
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.OK).json({
            message: 'Login successful',
            statusCode: _httpCode.HTTP_CODE.OK,
            data: {
              userId: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              accessToken: accessToken
            }
          }));
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          return _context2.a(2, res.status(_httpCode.HTTP_CODE.BAD_REQUEST).json({
            errorMessage: 'Incorrect email or password'
          }));
      }
    }, _callee2, null, [[0, 6]]);
  }));
  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();