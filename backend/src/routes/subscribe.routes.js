import express from "express";
import {
  toggleSubscription,
  getChannelSubscribers,
} from "../controllers/subscribe.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Subscribe / Unsubscribe (Protected)
router.post("/", protect, toggleSubscription);

// Get subscriber count (Public)
router.get("/channel/:channelId", getChannelSubscribers);

export default router;