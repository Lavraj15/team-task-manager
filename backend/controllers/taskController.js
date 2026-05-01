import Task from "../models/Task.js";

// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      dueDate: req.body.dueDate,
      status: "pending",
      userId: req.user.id
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.log("CREATE ERROR:", err.message);
    res.status(500).json(err.message);
  }
};

// ✅ GET TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ DELETE TASK (🔥 YE MISSING THA)
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        dueDate: req.body.dueDate,
        status: req.body.status
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};