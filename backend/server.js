import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});