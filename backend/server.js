const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");

const authRoutes = require("./routes/authRoutes");

const path = require("path");

const app = express();

const uploadsPath = path.join(__dirname, "uploads");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(uploadsPath));

app.get("/", (req, res) => {
  res.send("Backend is alive");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});