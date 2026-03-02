import express from "express";
import { createVideo, getAllVideos , getVideoById} from "../controllers/video.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Upload video (Protected)
router.post("/", protect, createVideo);

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

export default router;