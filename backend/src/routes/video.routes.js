import express from "express";
import { createVideo } from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload video (Protected)
router.post("/", protect, createVideo);

export default router;