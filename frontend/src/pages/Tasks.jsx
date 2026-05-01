import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");

  const [form, setForm] = useState({ title: "", dueDate: "" });
  const [editId, setEditId] = useState(null);

  const selectedProject = projects.find(p => p._id === projectId);

  // ✅ LOAD PROJECTS
  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ LOAD TASKS (🔥 ALL TASKS FIRST)
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (id) => {
    try {
      let url = "/tasks";

      if (id) {
        url = `/tasks?projectId=${id}`;
      }

      const res = await API.get(url);
      setTasks(res.data);

    } catch (err) {
      console.log("TASK ERROR:", err);
    }
  };

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (!projectId) {
        alert("Select project first ❗");
        return;
      }

      if (!form.title) {
        alert("Title required");
        return;
      }

      if (editId) {
        await API.put(`/tasks/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/tasks", {
          ...form,
          projectId
        });
      }

      setForm({ title: "", dueDate: "" });
      fetchTasks(projectId);

    } catch (err) {
      alert("Task failed ❌");
    }
  };

  // ✅ DELETE
  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await API.delete(`/tasks/${id}`);
    fetchTasks(projectId);
  };

  // ✅ EDIT
  const editTask = (task) => {
    setForm({
      title: task.title,
      dueDate: task.dueDate?.split("T")[0]
    });
    setEditId(task._id);
  };

  // ✅ STATUS
  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks(projectId);
  };

  return (
    <Layout>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-2">
        {projectId
          ? `Tasks - ${selectedProject?.name}`
          : "All Tasks"}
      </h1>

      {/* DROPDOWN */}
      <select
        value={projectId}
        onChange={(e) => {
          const id = e.target.value;
          setProjectId(id);
          fetchTasks(id);
        }}
        className="border p-2 rounded mb-4"
      >
        <option value="">All Projects</option>
        {projects.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* FORM */}
      <div className="flex gap-2 mb-6">
        <input
          value={form.title}
          placeholder="Task Title"
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="date"
          value={form.dueDate}
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid grid-cols-2 gap-4">

        {tasks.length === 0 && (
          <p>No tasks found</p>
        )}

        {tasks.map(t => (
          <div key={t._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{t.title}</h3>

            {/* 🔥 PROJECT NAME */}
            <p className="text-sm text-gray-500">
              Project: {t.projectId?.name || "N/A"}
            </p>

            <p>Status: {t.status}</p>
            <p>Due: {t.dueDate?.split("T")[0]}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(t._id, "in-progress")}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Start
              </button>

              <button
                onClick={() => updateStatus(t._id, "done")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Done
              </button>

              <button
                onClick={() => editTask(t)}
                className="bg-blue-400 px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(t._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
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