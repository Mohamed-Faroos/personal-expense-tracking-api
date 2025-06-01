"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _httpCode = require("../lib/enum/httpCode");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * The function `authMiddleware` is used to verify and authenticate a user's access token in
 application.
 */
var authMiddleware = exports.authMiddleware = function authMiddleware(req, res, next) {
  try {
    var authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(_httpCode.HTTP_CODE.UNAUTHORIZED).json({
        message: "Authorization token required"
      });
    }
    _jsonwebtoken["default"].verify(authorization, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(_httpCode.HTTP_CODE.UNAUTHORIZED).json({
            message: "Token has expired"
          });
        }
        return res.status(_httpCode.HTTP_CODE.UNAUTHORIZED).json({
          message: "Invalid token"
        });
      }
      if (!decoded) {
        return res.status(_httpCode.HTTP_CODE.UNAUTHORIZED).json({
          message: "User not found"
        });
      }
      req.user = {
        _id: decoded.userId,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email
      };
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(_httpCode.HTTP_CODE.INTERNAL_SERVER_ERROR).json({
      message: "Authentication error",
      error: error.message
    });
  }
};