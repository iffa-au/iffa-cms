import {RequestHandler} from "express";
import {generateHashedPassword} from "../utils/password";
import {successResponse} from "../utils/http";
import {loginCredentialsUser, registerCredentialsUser} from "../services/auth.service";
import {JWT_EXPIRES_IN, JWT_SECRET, NODE_ENV} from "../config/env";
import {SignJWT} from "jose";
import {generateJWToken} from "../config/jwt";



const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV=== 'production' ? 'none' as const : 'lax' as const,
    maxAge: 1000 * 60 * 60 * 1
}

export const signUp: RequestHandler = async(req, res, next)=>{
    try{
        const { name, email, password } = req.body;
        const hashedPassword = await generateHashedPassword(password);
        const user = await registerCredentialsUser(name, email, hashedPassword);

        const token = await generateJWToken(user);

        res.cookie("token", token, cookieOptions)

        successResponse(res,{
            success: true,
            message: "User registered registered",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    }catch (error){
        next(error);
    }
}

export const signIn: RequestHandler = async(req, res, next)=>{
    try {


        const {email, password} = req.body;

        const user = await loginCredentialsUser(email, password);

        const token = await generateJWToken(user);
        res.cookie("token", token, cookieOptions)

        successResponse(res, {
            success: true,
            message: "User signed in successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch (error) {
        next(error);
    }
}

export const signOut: RequestHandler = async(req, res, next) => {
    try{
        res.clearCookie("token", cookieOptions);

        successResponse(res, {
            success: true,
            message: "User signed out successfully",
            data: {}
        });
    }catch (error){
        next(error);
    }
}

