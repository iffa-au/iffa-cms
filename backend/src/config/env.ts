import {config} from "dotenv";
import z from "zod";

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

const envSchema = z.object({
    PORT: z.string().default("8080"),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    CLIENT_URL:z.string(),
    JWT_SECRET:z.string(),
    JWT_EXPIRES_IN:z.string(),
    DB_URL: z.url(),
    BCRYPT_SALT_ROUNDS:z.string(),
})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environment variables:", parsedEnv.error.format());
    process.exit(1);
}

const env = parsedEnv.data;

export const {
    PORT, NODE_ENV, CLIENT_URL,
    JWT_SECRET, JWT_EXPIRES_IN,
    DB_URL,
    BCRYPT_SALT_ROUNDS
} = env

