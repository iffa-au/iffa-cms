import {Router} from "express";

import {signUp, signIn, signOut, refreshAccessToken} from "../controllers/auth.controller";
import {validate} from "../middlewares/validate.middleware";
import {loginValidator, registerValidator} from "../validators/auth.validator";

const authRouter = Router();

authRouter
    .post("/sign-up", validate(registerValidator), signUp)
    .post("/sign-in", validate(loginValidator), signIn)
    .post("/sign-out", signOut)
    .get("/refresh", refreshAccessToken)

export default authRouter;