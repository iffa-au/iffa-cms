import {RequestHandler} from "express";
import {UnauthorizedError} from "../utils/http";
import {validateToken} from "../controllers/auth.controller";

const authenticate: RequestHandler = (req, res, next) => {
    try{
        let token = req.cookies?.token;
        let claim = validateToken(token);
        (req as any).user = claim;
        if(claim) return next();

        let header = req.headers.authorization;
        if(!header) throw new UnauthorizedError("No Header");
        token = header.split(" ")[1];
        if(!token) throw new UnauthorizedError("No token");
        claim = validateToken(token);
        if(!claim) throw new UnauthorizedError("Invalid token");
        (req as any).user = claim;
        if(claim) return next();

    }catch (error){
        next(error);
    }
}

export default authenticate;