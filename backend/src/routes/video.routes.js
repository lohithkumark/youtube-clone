import express from "express";
import { 
  createVideo, 
  getAllVideos, 
  getVideoById, 
  updateVideo, 
  deleteVideo,
  searchVideos
} from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload video (Protected)
router.post("/", protect, createVideo);

// Get all videos
router.get("/", getAllVideos);

// 🔥 ADD THIS (before :id)
router.get("/search", searchVideos);

// Update video (Protected)
router.put("/:id", protect, updateVideo);

// Get single video
router.get("/:id", getVideoById);

// Delete video (Protected)
router.delete("/:id", protect, deleteVideo);

export default router;