import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonCode } from "./page/commonCode/CommonCode.jsx";
import { CommonList } from "./page/commonCode/CommonList.jsx";
import { CommonAdd } from "./page/commonCode/CommonAdd.jsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "commonCode", element: <CommonCode /> },
      { path: "commonCode/list", element: <CommonList /> },
      { path: "commonCode/add", element: <CommonAdd /> },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "item",
        element: <Item />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthenticationContext>
      <RouterProvider router={router} />
    </AuthenticationContext>
  );
}

export default App;
