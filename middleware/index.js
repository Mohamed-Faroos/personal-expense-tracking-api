import jwt from "jsonwebtoken";
import { HTTP_CODE } from "../lib/enum/httpCode";

/**
 * The function `authMiddleware` is used to verify and authenticate a user's access token in
 application.
 */
export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: "Authorization token required" });
        }

        jwt.verify(authorization, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: "Token has expired" });
                }
                return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: "Invalid token" });
            }

            if (!decoded) {
                return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: "User not found" });
            }

            req.user = {
                _id: decoded.userId,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
            };
            next();
        });

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ message: "Authentication error", error: error.message });
    }
};