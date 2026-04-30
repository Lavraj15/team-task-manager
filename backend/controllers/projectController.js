import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = new Project({
    ...req.body,
    createdBy: req.user.id
  });
  await project.save();
  res.json(project);
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