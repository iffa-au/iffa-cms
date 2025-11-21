import {RequestHandler} from "express";
import {ForbiddenError, UnauthorizedError} from "../utils/http";
import {validateAccessToken} from "../config/jwt";

const verifyJWT: RequestHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new UnauthorizedError("Authorization header missing");
        const token = authHeader.split(" ")[1];
        const isValid = await validateAccessToken(token);
        if (!isValid) throw new ForbiddenError();
        (req as any).userId = Number(isValid.sub);
        next();
    }catch (error) {
        next(error);
    }

}

export default verifyJWT;