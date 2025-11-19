import {RequestHandler} from "express";
import {UnauthorizedError} from "../utils/http";

const authenticate: RequestHandler = (req, res, next) => {
    try{
        if(!req.session || !req.session.user){
            throw new UnauthorizedError("User not authenticated");
        }
        next();
    }catch (error){
        next(error);
    }
}

export default authenticate;