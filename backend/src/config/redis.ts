// src/utils/redis.ts

import session from "express-session";
import {RedisStore} from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
    },
});

// connect
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
    client: redisClient
});

export { redisStore, session, redisClient };
