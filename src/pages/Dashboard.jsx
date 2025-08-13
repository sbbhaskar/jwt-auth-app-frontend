import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, accessToken } = useAuth();
  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <pre style={{ background: "#f6f6f6", padding: 12 }}>
{JSON.stringify({ user, hasAccessToken: Boolean(accessToken) }, null, 2)}
      </pre>
      <p>Now build your app features here.</p>
    </div>
  );
}
