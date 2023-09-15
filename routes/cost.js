import express from "express";
import { getAllCost, createCost, updateCost, deleteCost } from "../controllers/costController.js";

const router = express.Router();

router.get("/cost", getAllCost);
router.post("/cost", createCost);
router.put("/cost/:_id", updateCost);
router.delete("/cost/:_id", deleteCost);

export default router;