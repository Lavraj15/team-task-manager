import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ FIRST app create karo
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes (example)
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// 🔥 path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 frontend serve (APP ke baad likhna)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));