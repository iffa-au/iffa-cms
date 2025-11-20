import { RequestHandler } from "express";
import { UnauthorizedError } from "../utils/http";
import { validateJWToken } from "../config/jwt";

const authenticate: RequestHandler = async (req, res, next) => {
    try {
        // 1. Try cookie first
        const cookieToken = req.cookies?.token;
        if (cookieToken) {
            const claims = await validateJWToken(cookieToken);
            (req as any).user = claims;
            return next();
        }

        // 2. Try Authorization header next
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedError("No token provided");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError("Invalid Authorization header format");
        }

        const claims = await validateJWToken(token);
        (req as any).user = claims;

        return next();
    } catch (error) {
        return next(error);
    }
};

export default authenticate;
