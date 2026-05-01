import Task from "../models/Task.js";

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";

// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, dueDate, projectId } = req.body;

    const task = new Task({
      title,
      dueDate,
      status: "pending",
      userId: req.user.id,
      projectId
    });

    await task.save();

    // 🔥 MUST: populated response bhejo
    const populated = await Task.findById(task._id)
      .populate("projectId", "name");

    res.status(201).json(populated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// ✅ GET TASKS
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    let query = { userId: req.user.id };

    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      query.projectId = projectId;
    }

    const tasks = await Task.find(query)
      .populate("projectId", "name")   // 🔥 MUST
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json(err.message);
  }
};


// ✅ DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json("Task not found");
    }

    res.json({ msg: "Deleted" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json(err.message);
  }
};


// ✅ UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("projectId", "name"); // 🔥 ADD

    res.json(updated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};