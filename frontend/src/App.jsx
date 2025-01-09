import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./page/root/RootLayout.jsx";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { Member } from "./page/member/Member.jsx";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function Main() {
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      //  일단 써야해서 만들어놈 , 삭제 시작
      {
        index: true,
        element: <Main />,
      },
      //  삭제 범위
      {
        path: "member",
        element: <Member />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthenticationContext>
      {/*  끝에 ; 지움*/}
      <RouterProvider router={router} />
    </AuthenticationContext>
  );
}

export default App;
