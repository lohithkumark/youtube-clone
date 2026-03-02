import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import { protect } from "./src/middleware/auth.middleware.js";

dotenv.config();

connectDB();

const app = express();

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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});