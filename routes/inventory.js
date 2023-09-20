import express from "express";
import { getAllInventory, createInventory, getItemByLocation } from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/inventory", getAllInventory);
router.get("/tag/:location", getItemByLocation);
router.post("/inventory", authMiddleware, createInventory);

export default router;