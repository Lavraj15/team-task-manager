import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status !== "done").length;
  const overdue = tasks.filter(
    t => new Date(t.dueDate) < new Date() && t.status !== "done"
  ).length;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">

  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
    <h3 className="text-gray-500">Total Tasks</h3>
    <p className="text-2xl font-bold">{total}</p>
  </div>

  <div className="bg-green-100 p-6 rounded-2xl shadow-md">
    <h3>Completed</h3>
    <p className="text-2xl font-bold">{completed}</p>
  </div>

  <div className="bg-yellow-100 p-6 rounded-2xl shadow-md">
    <h3>Pending</h3>
    <p className="text-2xl font-bold">{pending}</p>
  </div>

  <div className="bg-red-100 p-6 rounded-2xl shadow-md">
    <h3>Overdue</h3>
    <p className="text-2xl font-bold">{overdue}</p>
  </div>

</div>
    </Layout>
  );
}