import express from "express";
import {
  toggleSubscribe,
  getSubscriberCount
} from "../controllers/subscribe.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Subscribe / Unsubscribe (Protected)
router.post("/", protect, toggleSubscribe);

// Get subscriber count (Public)
router.get("/channel/:channelId", getSubscriberCount);

export default router;