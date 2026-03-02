import express from "express";
import { addToHistory, getMyHistory } from "../controllers/history.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addToHistory);
router.get("/", protect, getMyHistory);

export default router;