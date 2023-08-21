import express from "express";
import { getProducts } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/itens", getProducts);
// router.get("/usuarios", getCustomers);
// router.get("/inventarios").get((req, res) => getAllInventory.getAll(req, res));
// router.route("/inventarios").post((req, res) => postInventoriedItem.create(req, res));

export default router;
