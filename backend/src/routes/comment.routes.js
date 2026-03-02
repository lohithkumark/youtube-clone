import express from "express";
import {
  addComment,
  getCommentsByVideo,
  deleteComment
} from "../controllers/comment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Add comment (Protected)
router.post("/", protect, addComment);

// Get comments by video (Public)
router.get("/video/:videoId", getCommentsByVideo);

// Delete comment (Protected)
router.delete("/:id", protect, deleteComment);

export default router;