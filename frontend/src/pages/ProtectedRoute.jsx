import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const stored = JSON.parse(localStorage.getItem("user"));
  const user = stored?.user || stored; 

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
