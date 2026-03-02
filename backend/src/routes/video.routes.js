import express from "express";
import { createVideo, getAllVideos , getVideoById , updateVideo} from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload video (Protected)
router.post("/", protect, createVideo);

router.get("/", getAllVideos);

// Update video (Protected)
router.put("/:id", protect, updateVideo);


router.get("/:id", getVideoById);

export default router;