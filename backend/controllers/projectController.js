import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,   // 🔥 MUST
      userId: req.user.id
    });

    await project.save();
    res.json(project);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};