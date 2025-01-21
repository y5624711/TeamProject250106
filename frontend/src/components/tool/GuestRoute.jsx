import React, { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { Navigate } from "react-router-dom";

export function GuestRoute({ element }) {
  const { isAuthenticated } = useContext(AuthenticationContext);

  // 로그인한 사용자 -> 메인 페이지로 리디렉션
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
}
