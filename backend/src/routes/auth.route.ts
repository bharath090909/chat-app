import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import { validateData } from "../middleware/validation.middleware";
import { signupSchema } from "../schemas/auth.schema";

const router = express.Router();

router.post("/signup",validateData(signupSchema),signup);

router.post("/login",login);

router.post("/logout",logout);


export default router;