import express from "express";
import { createVideo, getAllVideos , getVideoById , updateVideo , deleteVideo} from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload video (Protected)
router.post("/", protect, createVideo);

router.get("/", getAllVideos);

// Update video (Protected)
router.put("/:id", protect, updateVideo);


router.get("/:id", getVideoById);

// Delete video (Protected)
router.delete("/:id", protect, deleteVideo);

export default router;