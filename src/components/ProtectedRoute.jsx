import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return Boolean(token);
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;