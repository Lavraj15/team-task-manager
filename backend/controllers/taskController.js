import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo")
    .populate("project");

  res.json(tasks);
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
};