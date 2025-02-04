import { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export function LoginCheck() {
  const { isAuthenticated, isInitialized, isAdmin } = useContext(
    AuthenticationContext,
  );
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 경로 가져오기

  // 관리자 전용 경로 리스트
  const adminList = [
    "/business",
    "/commonCode",
    "/employee",
    "/item",
    "/customer",
    "/franchise",
    "/warehouse",
  ];

  useEffect(() => {
    // 초기화 완료 시 로직 실행
    if (isInitialized) {
      if (!isAuthenticated) {
        navigate("/login"); // 로그인 페이지로 리다이렉트
      } else {
        if (!isAdmin && adminList.includes(location.pathname)) {
          navigate("/"); // 관리자가 아닌데 admin 페이지에 접근하면 메인 페이지로 이동
          alert("권한이 없습니다.");
        }
      }
    }
  }, [isInitialized, navigate]);

  if (!isInitialized) {
    return <Spinner display="none" />; // 초기화 중 로딩 표시
  }

  return null;
}
