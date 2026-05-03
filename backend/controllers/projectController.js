import Project from "../models/Project.js";

// ✅ CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      admin: req.user.id,
      members: [req.user.id]
    });

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ GET PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id   // 🔥 user ke projects
    }).populate("members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ✅ DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted" });

  } catch (err) {
    res.status(500).json(err.message);
  }
};