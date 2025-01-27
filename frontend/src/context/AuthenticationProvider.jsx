import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext("");

function AuthenticationProvider({ children }) {
  const [userToken, setUserToken] = useState({});
  const [userName, setUserName] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
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
    setIsInitialized(true); // 초기화 완료
  }, []);

  // 토큰 만료 시 자동 로그아웃 (하루로 설정 해놓음)
  useEffect(() => {
    if (userToken?.exp) {
      const currentTime = Date.now();
      const expirationTime = userToken.exp * 1000;
      const remainingTime = expirationTime - currentTime;

      if (remainingTime > 0) {
        console.log(`토큰 만료까지 남은 시간: ${remainingTime / 1000}초`);

        const timeout = setTimeout(() => {
          logout();
        }, remainingTime);

        return () => clearTimeout(timeout); // 이전 타이머 정리
      } else {
        console.log("토큰이 이미 만료되었습니다. 로그아웃 처리합니다.");
        logout();
      }
    }
  }, [userToken, isInitialized]);

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
    setIsInitialized(false);
    setUserToken({});
    setUserName("");
  }

  function hasAccess(id) {
    return id === userToken.sub;
  }

  let isAdmin = false;

  if (userToken.scope) {
    isAdmin = userToken.scope.split(" ").includes("BIZ");
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
        isInitialized: isInitialized,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;
