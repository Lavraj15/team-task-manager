import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,

  status: {
    type: String,
    enum: ["pending", "in-progress", "done"], // 🔥 FIX
    default: "pending"
  },

  dueDate: Date,
  userId: String
});

export default mongoose.model("Task", taskSchema);