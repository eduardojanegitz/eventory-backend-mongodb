import express from "express";
import {
  calculateAverageAge,
  getItemByCostCenter,
  getItemByItemGroup,
  getItemsFromLastMonth,
  totalValue,
  totalValueByYear,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/dashboard/item/total", totalValue);
router.get("/dashboard/item/lastmonth", getItemsFromLastMonth);
router.get("/dashboard/item/totalByYear", totalValueByYear);
router.get("/dashboard/item/itemByCostCenter", getItemByCostCenter);
router.get("/dashboard/item/itemByItemGroup", getItemByItemGroup);
router.get("/dashboard/item/avaregeAssets", calculateAverageAge);

export default router;
