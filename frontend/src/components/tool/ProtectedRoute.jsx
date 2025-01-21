import React, { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ element }) {
  const { isAuthenticated } = useContext(AuthenticationContext);

  // 로그인 안하면 -> 로그인 페이지로
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
