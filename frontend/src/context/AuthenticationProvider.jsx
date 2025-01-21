import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthenticationContext = createContext("");

function AuthenticationProvider({ children }) {
  const [userToken, setUserToken] = useState({});
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name"); // localStorage에서 name 가져오기
    if (token) {
      const decoded = jwtDecode(token);
      setUserToken(decoded);
    }
    if (name) {
      setUserName(name); // name 상태 업데이트
      console.log(name);
    }
  }, []);

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

  const isAuthenticated = Date.now() < userToken.exp * 1000;
  let isAdmin = false;

  if (userToken.scope) {
    isAdmin = userToken.scope.split(" ").includes("EMP");
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
