import {
    pgTable, serial,
    varchar, boolean,
    pgEnum
} from "drizzle-orm/pg-core"
import {timestamps} from "./helpers";
import {roles} from "../../constants";


export const userRoles = pgEnum("roles", roles);

export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),

    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password"),

    oauthProvider: varchar("oauth_provider", { length: 50 }),
    oauthProviderId: varchar("oauth_provider_id", { length: 255 }),

    isEmailVerified: boolean("is_email_verified").default(false),

    role: userRoles().default(roles.USER),

    name: varchar("name", { length:50 }).notNull(),
    avatarUrl: varchar("avatarUrl", { length:255 }),
    bio: varchar("bio", { length:500 }),
    phoneNumber: varchar("phone_number", { length:20 }),

    ...timestamps
});



