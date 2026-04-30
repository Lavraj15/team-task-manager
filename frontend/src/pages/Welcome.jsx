import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">

      <h1 className="text-4xl font-bold mb-4">
        Welcome to Team Task Manager 🚀
      </h1>

      <p className="mb-8 text-lg">
        Manage your projects and tasks efficiently
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-purple-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Signup
        </button>
      </div>

    </div>
  );
}