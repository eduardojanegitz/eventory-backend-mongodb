import express from "express";
import { createLocation, deleteLocation, getAll, updateLocation } from "../controllers/locationController.js";

const router = express.Router();

router.get("/location", getAll);
router.post("/location", createLocation);
router.put("/location/:id", updateLocation);
router.delete("/location/:id", deleteLocation)

export default router;
