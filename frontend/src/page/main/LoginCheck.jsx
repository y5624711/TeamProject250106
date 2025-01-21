import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export function LoginCheck() {
  const { isAuthenticated, isInitialized } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 초기화 완료 시 로직 실행
    if (isInitialized) {
      if (!isAuthenticated) {
        navigate("/login"); // 로그인 페이지로 리다이렉트
      }
    }
  }, [isInitialized, navigate]);

  if (!isInitialized) {
    return <Spinner display="none" />; // 초기화 중 로딩 표시
  }

  return null;
}
