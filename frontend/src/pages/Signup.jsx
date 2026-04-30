import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // ✅ Signup
      await API.post("/auth/signup", data);

      // 🔥 Auto Login
      const res = await API.post("/auth/login", {
        email: data.email,
        password: data.password
      });

      // 🔐 Token save
      localStorage.setItem("token", res.data.token);

      // 🚀 Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Signup Failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">

        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <input placeholder="Name"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e)=>setData({...data,name:e.target.value})}
        />

        <input placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e)=>setData({...data,email:e.target.value})}
        />

        <input type="password" placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e)=>setData({...data,password:e.target.value})}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-purple-500 text-white py-2 rounded"
        >
          Signup
        </button>

      </div>
    </div>
  );
}