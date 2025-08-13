import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";


export default function App() {
  const { user, logout } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 720, margin: "40px auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <Link to="/" style={{ fontWeight: 700 }}>JWT Auth Demo</Link>
        <nav style={{ display: "flex", gap: 12 }}>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user && <button onClick={logout}>Logout</button>}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
