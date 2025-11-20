import {RequestHandler} from "express";
import {UnauthorizedError} from "../utils/http";

const authenticate: RequestHandler = (req, res, next) => {
    try{

        next();
    }catch (error){
        next(error);
    }
}

export default authenticate;