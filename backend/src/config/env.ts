import {config} from "dotenv";
import z from "zod";

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})

const envSchema = z.object({
    PORT: z.string().default("8080"),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    HOST_URL:z.string(),
    CLIENT_URL:z.string(),
    JWT_ACCESS_TOKEN_SECRET:z.string(),
    JWT_REFRESH_TOKEN_SECRET:z.string(),
    JWT_ALGORITHM:z.string(),
    JWT_ACCESS_EXPIRES_IN:z.string(),
    JWT_REFRESH_EXPIRES_IN:z.string(),
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
    PORT, NODE_ENV,
    HOST_URL, CLIENT_URL,
    JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET,
    JWT_ALGORITHM, JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN,
    DB_URL,
    BCRYPT_SALT_ROUNDS
} = env

