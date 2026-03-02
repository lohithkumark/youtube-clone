import express from "express";
import { toggleLike, getVideoLikes } from "../controllers/like.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Like / Unlike (Protected)
router.post("/", protect, toggleLike);

// Get like count (Public)
router.get("/video/:videoId", getVideoLikes);

export default router;