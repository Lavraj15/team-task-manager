import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    await API.put(`/users/${id}/role`, { role });
    fetchUsers();
  };
  

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Manage Users</h1>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>

      {users.map(u => (
        <div key={u._id} className="border p-3 mb-2 flex justify-between">
          <div>
            <p>{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => changeRole(u._id, "admin")}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Make Admin
            </button>

            <button
              onClick={() => changeRole(u._id, "member")}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Make Member
            </button>
          </div>
        </div>
      ))}
    </div>
     </div>
    </Layout>
  );
}