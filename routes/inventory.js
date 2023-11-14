import express from "express";
import { getAllInventory, createInventory, getItemByLocation } from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getOne } from "../controllers/itemController.js";

const router = express.Router();

router.get("/inventory", getAllInventory);
router.get("/inventory/item/:tag", getOne);
router.get("/inventory/location/:location", getItemByLocation);
router.post("/inventory", authMiddleware, createInventory);

export default router;