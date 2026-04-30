import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-100">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}