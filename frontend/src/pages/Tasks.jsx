import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", dueDate: "" });
  const [editId, setEditId] = useState(null);

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (!form.title) {
        alert("Title required");
        return;
      }

      if (editId) {
        await API.put(`/tasks/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/tasks", form);
      }

      setForm({ title: "", dueDate: "" });
      fetchTasks();

    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
      alert("Task failed ❌");
    }
  };

  // ✅ DELETE
  const deleteTask = async (id) => {
    try {
      if (!window.confirm("Delete task?")) return;
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("DELETE ERROR:", err);
    }
  };

  // ✅ EDIT
  const editTask = (task) => {
    setForm({
      title: task.title,
      dueDate: task.dueDate?.split("T")[0]
    });
    setEditId(task._id);
  };

  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log("STATUS ERROR:", err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

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
        {tasks?.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{t.title}</h3>
            <p>Status: {t.status}</p>
            <p>Due: {t.dueDate?.split("T")[0]}</p>

            <div className="flex flex-wrap gap-2 mt-3">

              {/* START */}
              <button
                onClick={() => updateStatus(t._id, "in-progress")}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Start
              </button>

              {/* DONE */}
              <button
                onClick={() => updateStatus(t._id, "done")}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Done
              </button>

              {/* EDIT */}
              <button
                onClick={() => editTask(t)}
                className="bg-blue-400 px-2 py-1 rounded"
              >
                Edit
              </button>

              {/* DELETE */}
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