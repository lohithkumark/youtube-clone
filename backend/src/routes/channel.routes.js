import express from "express";
import { createChannel, getChannelById, getMyChannel, getAllChannels } from "../controllers/channel.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create channel (protected)
router.post("/", protect, createChannel);

// Get My Channel (Protected)
router.get("/me", protect, getMyChannel);

router.get("/", getAllChannels);

// Get channel by ID (public)
router.get("/:id", getChannelById);

export default router;