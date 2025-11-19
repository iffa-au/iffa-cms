import {ErrorRequestHandler} from "express";
import {ErrorResponse} from "../utils/http";
import {NODE_ENV} from "../config/env";

const errorMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    try {

        const statusCode = err.statusCode ?? 500;
        const message = err.message || "Internal Server Error";
        const errors = err.errors && Array.isArray(err.errors)? err.errors : undefined;

        const responseBody: ErrorResponse = {
            success: false,
            message,
            ...(errors ? { errors: errors } : {})
        }

        if(NODE_ENV!=="production"){
            (responseBody as any).stack = err.stack;
            console.log("Error Stack:", err.stack);
        }else{
            console.log("Error:", message);
        }

        res.status(statusCode).json(responseBody);


    }catch (middlewareError){
        next(middlewareError);
    }
}

export default errorMiddleware;