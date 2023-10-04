import express from "express";
import { createItem, deleteItem, getAllItems, getItemsFromLastMonth, totalValue } from "../controllers/itemController.js";

const router = express.Router();

router.get("/item", getAllItems);
router.post("/item", createItem);
router.delete("/item/:id", deleteItem);

router.get("/dashboard/item/total", totalValue);
router.get("/dashboard/item/lastmonth", getItemsFromLastMonth);


export default router;
