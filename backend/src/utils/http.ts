import { Response } from "express";

/**
 * Base HTTP Error class for extending specific HTTP errors
 */
export class HttpError extends Error{
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

/**
 * 400 Bad Request Error
 */
export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
}

/**
 * 400 Validation Error with multiple detailed errors
 */
export class ValidationError extends HttpError {
    errors: string[];

    constructor(message: string, errors: string[]) {
        super(message, 400);
        this.errors = errors;
    }
}

/**
 * 401 Unauthorized Error
 */
export class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(message, 401);
    }
}

/**
 * 404 Not Found Error
 */
export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends HttpError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}

/**
 * Interface for standard API error response
 */
export interface ErrorResponse {
    success: boolean;
    message: string;
    errors?: string[];
}

/**
 * Standardized success response sender with flexible data type
 */
export const successResponse = <T>(
    res: Response,
    options: {
        statusCode?: number;
        success: boolean;
        message: string;
        data?: T;
    }
):  Response=> {
    const { statusCode = 200, success, message, data } = options;
    const responseBody: { success: boolean; message: string; data?: T } = {
        success,
        message,
    };
    if (data !== undefined) {
        responseBody.data = data;
    }
    return res.status(statusCode).json(responseBody);
};