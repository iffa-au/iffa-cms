import {RequestHandler} from "express";
import {ForbiddenError, UnauthorizedError} from "../utils/http";

export const authorizeSelf: RequestHandler = (req, res, next) => {
    try {
        const user = (req as any).user;
        const requestedId = req.params.id;

        if (!user) {
            throw new UnauthorizedError("Unauthorized");
        }

        // IDs must match
        if (String(user.id) !== String(requestedId)) {
            throw new ForbiddenError();
        }

        return next();
    } catch (error) {
        next(error);
    }
};