import express from "express";
import { getAllInventory, createInventory, getItemByLocation } from "../controllers/inventoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { approveDivergence, createDivergence, getAllDivergences } from "../controllers/divergencesController.js";
import { getOne } from "../controllers/itemController.js";

const router = express.Router();

router.get("/inventory", getAllInventory);
router.get("/inventory/item/:tag", getOne);
router.get("/inventory/location/:location", getItemByLocation);
router.post("/inventory", authMiddleware, createInventory);

router.post("/divergences", authMiddleware, createDivergence)
router.get("/divergences", getAllDivergences)
router.delete("/divergences/:id", approveDivergence)

export default router;