console.log("Starting Server...");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});