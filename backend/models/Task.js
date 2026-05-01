
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true   // 🔥 MUST
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);