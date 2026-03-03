import express from "express";
import {
  createChannel,
  getChannelById,
} from "../controllers/channel.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createChannel);
router.get("/:id", getChannelById);

export default router;