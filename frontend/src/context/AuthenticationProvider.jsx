import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext("");

function AuthenticationProvider({ children }) {
  const [userToken, setUserToken] = useState({});
  const [userName, setUserName] = useState("");
  const isAuthenticated = Date.now() < userToken.exp * 1000;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name"); // localStorage에서 name 가져오기
    if (token) {
      const decoded = jwtDecode(token);
      setUserToken(decoded);
    }
    if (name) {
      setUserName(name); // name 상태 업데이트
    }
  }, []);

  // 토큰 만료 시 자동 로그아웃 (하루로 설정 해놓음)
  useEffect(() => {
    if (userToken?.exp) {
      const remainingTime = userToken.exp * 1000 - Date.now();
      console.log(`토큰 만료까지 남은 시간: ${remainingTime / 1000}초`);
      if (remainingTime > 0) {
        const timeout = setTimeout(() => {
          logout();
        }, remainingTime);

        return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
      } else {
        logout(); // 만료 시간이 이미 지난 경우 즉시 로그아웃
      }
    }
  }, [userToken]);

  function login(token, name) {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name); // localStorage에 name 저장
    const decoded = jwtDecode(token);
    setUserToken(decoded);
    setUserName(name);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name"); // name도 삭제
    setUserToken({});
    setUserName("");
  }

  function hasAccess(id) {
    return id === userToken.sub;
  }

  let isAdmin = false;

  if (userToken.scope) {
    isAdmin = userToken.scope.split(" ").includes("EMP");
    console.log(userToken.scope);
  }

  return (
    <AuthenticationContext.Provider
      value={{
        id: userToken.sub,
        name: userName,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        hasAccess,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
