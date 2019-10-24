import express from "express";

import { AuthController } from "../../controllers/auth/auth.controller";
import auth from "../../middlewares/auth.middleware";

const authController = new AuthController();

const authRouter = express.Router();

authRouter.post("/login", authController.login);

authRouter.post("/register", authController.register);

authRouter.get("/logout", auth, authController.logout);

export default authRouter;
