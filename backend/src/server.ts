import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import {NotFoundError} from "./utils/http";

import authenticate from "./middlewares/authenticate.middleware";

const app = express();

// Security middleware - should be early in the chain
app.use(helmet())

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

// 404 handler - catches all unmatched routes
app.use((req, res)=>{
    throw new NotFoundError("Resource not found")
})

// Error handling middleware - must be last, catches all errors
app.use(errorMiddleware);

export default app;