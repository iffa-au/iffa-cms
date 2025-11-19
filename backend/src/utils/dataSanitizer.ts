import {userTable} from "../drizzle/schema/user";


export const userToSession = {
    id: userTable.id,
    name: userTable.name,
    email: userTable.email,
    role: userTable.role
}