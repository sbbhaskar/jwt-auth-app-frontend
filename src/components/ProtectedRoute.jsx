import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { accessToken, user, fetchMe } = useAuth();

  useEffect(() => {
    if (accessToken && !user) {
      fetchMe().catch(() => {});
    }
  }, [accessToken, user]); // eslint-disable-line

  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
}
