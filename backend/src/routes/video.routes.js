import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideos,
  getVideosByChannel,
} from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create video
router.post("/", protect, createVideo);

// Get all
router.get("/", getAllVideos);

// Search
router.get("/search", searchVideos);

// 🔥 IMPORTANT: BEFORE :id
router.get("/channel/:channelId", getVideosByChannel);

// Get single
router.get("/:id", getVideoById);

// Update
router.put("/:id", protect, updateVideo);

// Delete
router.delete("/:id", protect, deleteVideo);

export default router;