import express from "express";
import { toggleSubscription, getMySubscriptions } from "../controllers/subscription.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, toggleSubscription);
router.get("/", protect, getMySubscriptions);

export default router;