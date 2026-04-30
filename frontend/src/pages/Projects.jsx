import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchProjects = () => {
    API.get("/projects").then(res => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    if (editId) {
      await API.put(`/projects/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/projects", form);
    }

    setForm({ name: "", description: "" });
    fetchProjects();
  };

  // ✅ DELETE
  const deleteProject = async (id) => {
    if (!window.confirm("Delete project?")) return;
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  // ✅ EDIT
  const editProject = (p) => {
    setForm({
      name: p.name,
      description: p.description
    });
    setEditId(p._id);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* FORM */}
      <div className="flex gap-2 mb-6">
        <input
          value={form.name}
          placeholder="Project Name"
          className="border p-2 rounded"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />
        <input
          value={form.description}
          placeholder="Description"
          className="border p-2 rounded"
          onChange={(e)=>setForm({...form,description:e.target.value})}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.description}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={()=>editProject(p)}
                className="bg-blue-400 px-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={()=>deleteProject(p._id)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}