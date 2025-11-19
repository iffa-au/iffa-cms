import {RequestHandler} from "express";
import {generateHashedPassword, validatePassword} from "../utils/password";
import {BadRequestError, successResponse, UnauthorizedError} from "../utils/http";
import {loginCredentialsUser, registerCredentialsUser} from "../services/auth.service";

export const signUp: RequestHandler = async(req, res, next)=>{
    try{
        const { name, email, password } = req.body;
        const hashedPassword = await generateHashedPassword(password);
        const user = await registerCredentialsUser(name, email, hashedPassword);

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as string,
        }

        successResponse(res,{
            success: true,
            message: "User registered registered",
            data: req.session.user
        })

    }catch (error){
        next(error);
    }
}

export const signIn: RequestHandler = async(req, res, next)=>{
    try {

        if(req.session.user) throw new BadRequestError("User already signed in");

        const {email, password} = req.body;

        const user = await loginCredentialsUser(email, password);

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as string,
        };

        successResponse(res, {
            success: true,
            message: "User signed in successfully",
            data: req.session.user
        })
    }
    catch (error) {
        next(error);
    }
}

export const signOut: RequestHandler = async(req, res, next) => {
    try{
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.json({
                success: true,
                message: "User signed out successfully"
            })
        })
    }catch (error){
        next(error);
    }
}

