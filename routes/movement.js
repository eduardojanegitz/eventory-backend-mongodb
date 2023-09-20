import express from "express";
import { createMovement, getAll } from "../controllers/movementController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/movement", authMiddleware, createMovement);
router.get("/movement", getAll);

export default router;
