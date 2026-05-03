
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import mongoose from "mongoose";

// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, projectId, assignedTo } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      projectId,
      assignedTo: req.user.id
    });

    await task.save();

    const populated = await Task.findById(task._id)
      .populate("projectId", "name")
      .populate("assignedTo", "name");

    res.json(populated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// ✅ GET TASKS
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    let query = {};

    if (projectId) {
      query.projectId = projectId;
    }

    const tasks = await Task.find(query)
      .populate("projectId", "name")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {
    console.log("GET TASK ERROR:", err);
    res.status(500).json(err.message);
  }
};


// ✅ DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id); // 🔥 debug

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json("Task not found");
    }

    res.json({ msg: "Deleted" });

  } catch (err) {
    console.log(err);
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

export const getDashboard = async (req, res) => {
  try {
    const total = await Task.countDocuments();

    const todo = await Task.countDocuments({ status: "todo" });
    const progress = await Task.countDocuments({ status: "in-progress" });
    const done = await Task.countDocuments({ status: "done" });

    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "done" }
    });

    res.json({
      total,
      todo,
      progress,
      done,
      overdue
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};