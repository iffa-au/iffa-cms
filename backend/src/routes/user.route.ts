import { Router } from 'express';
import {getAllUsers, getUserById} from "../controllers/user.controller";
import {authorizeSelf} from "../middlewares/authorize.middleware";


const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorizeSelf, getUserById);

export default userRouter;

