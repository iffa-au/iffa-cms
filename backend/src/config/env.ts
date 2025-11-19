import {config} from "dotenv";
import z from "zod";

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

const envSchema = z.object({
    PORT: z.string().default("8080"),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    CLIENT_URL:z.string(),
    REDIS_SESSION_NAME:z.string(),
    REDIS_SESSION_SECRET:z.string(),
    DB_URL: z.url(),
    BCRYPT_SALT_ROUNDS:z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z.string()
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:", parsedEnv.error.format());
    process.exit(1);
}

const env = parsedEnv.data;

export const {
    PORT, NODE_ENV, CLIENT_URL,
    REDIS_SESSION_NAME, REDIS_SESSION_SECRET,
    DB_URL,
    BCRYPT_SALT_ROUNDS,
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
} = env

