import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
  uploadItemImage,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/item", getAllItems);
router.post("/item", createItem);
router.put("/item/:id", updateItem);
router.delete("/item/:id", deleteItem);

// router.post("/item/:id/image", upload.single("image"), uploadItemImage);

export default router;
