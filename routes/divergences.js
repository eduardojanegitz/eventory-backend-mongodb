import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { approveDivergence, createDivergence, getAllDivergences, getAllApprovedDivergences } from "../controllers/divergencesController.js";

const router = express.Router();

router.post("/divergences", authMiddleware, createDivergence)
router.get("/divergences", getAllDivergences)
router.delete("/divergences/:id", approveDivergence)

router.post("/approve/:id", authMiddleware, approveDivergence)
router.get("/approve", getAllApprovedDivergences)

export default router;