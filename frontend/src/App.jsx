import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./page/root/RootLayout.jsx";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { Main } from "./page/main/Main.jsx";
import { CommonCodeList } from "./page/commonCode/CommonCodeList.jsx";
import { Account } from "./page/account/Account.jsx";
import { Box } from "@chakra-ui/react";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

function MemberView() {
  return <Box>g2</Box>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: "commonCode/list", element: <CommonCodeList /> },
      {
        path: "member",
        element: <Account />,
      },
      {
        path: "member/view:id",
        element: <MemberView />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthenticationContext>
      <RouterProvider router={router} />;
    </AuthenticationContext>
  );
}

export default App;
