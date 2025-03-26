import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import { validateData } from "../middleware/validation.middleware";
import { signupSchema, loginSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/signup", validateData(signupSchema), signup);

router.post("/login", validateData(loginSchema), login);

router.post("/logout", authMiddleware, logout);

export default router;
