import express from "express";
import { createChannel, getChannelById } from "../controllers/channel.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create channel (protected)
router.post("/", protect, createChannel);

// Get channel by ID (public)
router.get("/:id", getChannelById);

export default router;