import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import {NotFoundError} from "./utils/http";

import {session, redisStore} from "./config/redis";
import authenticate from "./middlewares/authenticate.middleware";
import {NODE_ENV, REDIS_SESSION_NAME, REDIS_SESSION_SECRET} from "./config/env";

const app = express();

// Security middleware - should be early in the chain
app.use(helmet())

// Session middleware - manages user sessions
app.use(
    session({
        store: redisStore,
        name:REDIS_SESSION_NAME,
        secret: REDIS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: NODE_ENV !== "development", // set to true in production HTTPS
            sameSite: NODE_ENV === "development" ? "lax" : "strict",
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

// Body parsing middleware - parses incoming request bodies
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Cookie parsing middleware - parses cookies from request headers
app.use(cookieParser())

// Route handlers - define your API endpoints
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticate, userRouter)

app.get("/", (req, res)=>{
    res.send("Welcome to IFFA CMS!");
})

app.get("/health", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
})

app.get("/session-test", (req, res)=>{
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not signed in" });
    }

    // TS now knows req.session.user exists
    const user = req.session.user;

    res.json({
        message: "Session active",
        user,
    });
})

// 404 handler - catches all unmatched routes
app.use((req, res)=>{
    throw new NotFoundError("Resource not found")
})

// Error handling middleware - must be last, catches all errors
app.use(errorMiddleware);

export default app;