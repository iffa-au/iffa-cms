import {RequestHandler} from "express";
import {userTable} from "../drizzle/schema/user";
import db from "../drizzle/db";


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