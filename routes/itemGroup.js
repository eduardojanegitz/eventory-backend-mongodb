import express from "express";
import { createItemGroup, deleteItemGroup, getAllItemGroup, updateItemGroup } from "../controllers/itemGroupController.js";

const router = express.Router();

router.get("/item-group", getAllItemGroup);
router.post("/item-group", createItemGroup);
router.put("/item-group/:id", updateItemGroup);
router.delete("/item-group/:id", deleteItemGroup);

export default router;