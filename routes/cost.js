import express from "express";
import { getAllCost, createCost, updateCost, deleteCost } from "../controllers/costController.js";

const router = express.Router();

router.get("/cost", getAllCost);
router.post("/cost", createCost);
router.put("/cost/:id", updateCost);
router.delete("/cost/:id", deleteCost);

export default router;