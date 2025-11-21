import {RequestHandler} from "express";
import {generateHashedPassword} from "../utils/password";
import {ForbiddenError, successResponse, UnauthorizedError} from "../utils/http";
import {loginCredentialsUser, registerCredentialsUser} from "../services/auth.service";
import {NODE_ENV} from "../config/env";
import {generateAccessToken, generateRefreshToken, validateRefreshToken} from "../config/jwt";
import db from "../drizzle/db";
import {userTable} from "../drizzle/schema/user";
import {eq} from "drizzle-orm";



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

        const accessToken = await generateAccessToken({id: user.id, role: user.role as string});
        const refreshToken = await generateRefreshToken({id: user.id});
        await db.transaction(async(tx)=>{
            await tx.update(userTable).set({
                refreshToken
            }).where(eq(userTable.id, user.id));
        })
        res.cookie("jwt", refreshToken, cookieOptions);

        successResponse(res,{
            success: true,
            message: "Doctor registered registered",
            data: {
                accessToken
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

        const accessToken = await generateAccessToken({id: user.id, role: user.role as string});
        const refreshToken = await generateRefreshToken({id: user.id});
        await db.transaction(async(tx)=>{
            await tx.update(userTable).set({
                refreshToken
            }).where(eq(userTable.id, user.id));
        })
        res.cookie("jwt", refreshToken, cookieOptions);

        successResponse(res,{
            success: true,
            message: "Doctor registered registered",
            data: {
                accessToken
            }
        })
    }
    catch (error) {
        next(error);
    }
}

export const signOut: RequestHandler = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.jwt;

        // Always clear cookie
        res.clearCookie("jwt", cookieOptions);

        // No JWT in cookie → still return success
        if (!refreshToken) {
            return successResponse(res, {
                success: true,
                message: "User signed out successfully"
            });
        }

        // Check if refresh token exists in DB
        const [foundUser] = await db.select()
            .from(userTable)
            .where(eq(userTable.refreshToken, refreshToken));

        if (!foundUser) {
            // Do NOT throw errors — still return OK
            return successResponse(res, {
                success: true,
                message: "User signed out successfully"
            });
        }

        // Remove refresh token from DB
        await db.transaction(async (tx) => {
            await tx.update(userTable)
                .set({ refreshToken: "" })
                .where(eq(userTable.id, foundUser.id));
        });

        return successResponse(res, {
            success: true,
            message: "User signed out successfully"
        });

    } catch (error) {
        next(error);
    }
};


export const refreshAccessToken: RequestHandler = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.jwt) throw new UnauthorizedError("Refresh token not found");
        const refreshToken = cookie.jwt;
        const [foundUser] = await db.select().from(userTable).where(eq(userTable.refreshToken, refreshToken));
        if (!foundUser) throw new ForbiddenError();
        const validRefreshToken = await validateRefreshToken(refreshToken);
        if (!validRefreshToken || Number(validRefreshToken.sub)!==foundUser.id) throw new ForbiddenError();
        const accessToken = await generateAccessToken({id: foundUser.id, role: foundUser.role as string});
        successResponse(res, {
            success: true,
            message: "Access token refreshed successfully",
            data: { accessToken }
        });
    }catch (error) {
        next(error);
    }
}