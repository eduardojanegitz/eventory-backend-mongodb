import express from "express";
import { inventory } from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/inventory", inventory.getAllInventory);
router.post("/inventory", authMiddleware, inventory.create);

export default router;