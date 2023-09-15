import express from "express";
import { cost } from "../controllers/costController.js";

const router = express.Router();

router.get("/cost", cost.getAllCost);
router.post("/cost", cost.create);

export default router;