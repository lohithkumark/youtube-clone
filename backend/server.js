import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import { protect } from "./src/middleware/auth.middleware.js";
import channelRoutes from "./src/routes/channel.routes.js";
import videoRoutes from "./src/routes/video.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import likeRoutes from "./src/routes/like.routes.js";
import subscribeRoutes from "./src/routes/subscribe.routes.js";
import historyRoutes from "./src/routes/history.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

app.use("/api/channels", channelRoutes);

app.use("/api/videos", videoRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/likes", likeRoutes);

app.use("/api/subscribe", subscribeRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});