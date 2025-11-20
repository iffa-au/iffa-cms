import {RequestHandler} from "express";
import {userTable} from "../drizzle/schema/user";
import db from "../drizzle/db";
import {eq} from "drizzle-orm";
import {successResponse} from "../utils/http";


export const getAllUsers: RequestHandler = async (req, res, next) => {
    try{
        const users = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email
        }).from(userTable)

        res.json({
            success: true,
            message: "Fetched all users successfully",
            data: {users} // Placeholder for user data
        })

    }catch (error){
        next(error);
    }
}

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const userId = Number(req.params.id);

        const [user] = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            role: userTable.role,
            isEmailVerified: userTable.isEmailVerified,
            createdAt: userTable.createdAt,
            updatedAt: userTable.updatedAt
        }).from(userTable).where(eq(userTable.id, userId));

        successResponse(res, {
            success: true,
            message: "User found successfully",
            data: {user}
        })

    }catch (error){
        next(error);
    }
}