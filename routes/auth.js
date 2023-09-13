import { login, logout, refresh } from "../controllers/authController.js";
import express from "express";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/auth/login", loginLimiter, login);

router.get("/auth/refresh", refresh);

router.post("/auth/logout", logout);

export default router;
