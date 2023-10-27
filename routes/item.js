import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemsFromLastMonth,
  totalValue,
  updateItem,
  uploadItemImage
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/item", getAllItems);
router.post("/item", createItem);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);

// router.post("/item/:id/image", upload.single("image"), uploadItemImage);

router.get("/dashboard/item/total", totalValue);
router.get("/dashboard/item/lastmonth", getItemsFromLastMonth);

export default router;
