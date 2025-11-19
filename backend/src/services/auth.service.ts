import db from "../drizzle/db";
import {userTable} from "../drizzle/schema/user";
import {eq} from "drizzle-orm";
import {BadRequestError, UnauthorizedError} from "../utils/http";
import {validatePassword} from "../utils/password";

export const getUserByEmail =
    async (email: string) =>
    {
        const [user] = await db.select().from(userTable).where(eq(userTable.email, email));
        return user;
    }

export const registerCredentialsUser =
    async (name: string, email: string, password: string) => {
        return await db.transaction(async(tx)=>{
            const [user] = await tx.insert(userTable).values({
                name,
                email,
                password
            }).returning()
            return user;
        })
    }

export const loginCredentialsUser =
    async (email: string, password: string) => {
        const user = await getUserByEmail(email);
        if(!user) throw new UnauthorizedError("Invalid email or password");
        if(!user.password) throw new BadRequestError("Invalid request");
        const isPasswordValid = await validatePassword(password, user.password);
        if(!isPasswordValid) throw new UnauthorizedError("Invalid email or password");
        return user;
    }