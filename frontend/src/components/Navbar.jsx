import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-gray-900 text-white shadow-md p-4 flex justify-between items-center">
      
      <h2 className="font-bold text-lg">Task Manager</h2>

      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/projects" className="hover:text-gray-300">Projects</Link>
        <Link to="/tasks" className="hover:text-gray-300">Tasks</Link>
        <Link to="/login" className="hover:text-red-400">Logout</Link>
      </div>

    </div>
  );
}