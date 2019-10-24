import express from "express";

import authRouter from "../routes/auth/auth.route";

const authMiddlewareRouter = express.Router();

authMiddlewareRouter.use("/auth", authRouter);

export default authMiddlewareRouter;
