import {Router} from "express";

import {signUp, signIn, signOut} from "../controllers/auth.controller";
import {validate} from "../middlewares/validate.middleware";
import {loginValidator, registerValidator} from "../validators/auth.validator";
import passport from "passport";

const authRouter = Router();

authRouter.post("/sign-up", validate(registerValidator), signUp);

authRouter.post("/sign-in", validate(loginValidator), signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;