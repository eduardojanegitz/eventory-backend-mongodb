import express from "express";
import { getAllInventory, createInventory, getItemByLocation } from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { aproveDivergence, createDivergence, getAllDivergences } from "../controllers/divergencesController.js";

const router = express.Router();

router.get("/inventory", getAllInventory);
router.get("/tag/:location", getItemByLocation);
router.post("/inventory", authMiddleware, createInventory);

router.post("/divergences", authMiddleware, createDivergence)
router.get("/divergences", getAllDivergences)
router.delete("/divergences/:id", aproveDivergence)

export default router;