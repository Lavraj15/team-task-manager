import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("CHECK TOKEN:", token); // debug

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
}