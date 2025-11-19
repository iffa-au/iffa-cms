import {
    pgTable, serial,
    varchar, boolean,
    integer, pgEnum, uuid
} from "drizzle-orm/pg-core"
import {timestamps} from "./helpers";

export enum Roles{
    ADMIN = "4736",
    STAFF = "4689",
    USER = "4031"
}

export const userRoles = pgEnum("roles", Roles);

export const userTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password"),

    oauthProvider: varchar("oauth_provider", { length: 50 }),
    oauthProviderId: varchar("oauth_provider_id", { length: 255 }),

    isEmailVerified: boolean("is_email_verified").default(false),

    role: userRoles().default(Roles.USER),

    name: varchar("name", { length:50 }).notNull(),
    avatarUrl: varchar("avatarUrl", { length:255 }),
    bio: varchar("bio", { length:500 }),
    phoneNumber: varchar("phone_number", { length:20 }),

    ...timestamps
});



