import {ZodError, ZodSchema} from 'zod';
import {NextFunction, Request, Response} from "express";
import {ValidationError} from "../utils/http";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errors = error.issues;
                    const messages = errors.map((error) => error.message); // Return message

                    return next(new ValidationError("Validation failed", messages));
                }
                next(error);
            }
        };
