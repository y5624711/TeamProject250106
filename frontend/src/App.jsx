import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./page/root/RootLayout.jsx";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import PartnerAdd from "./page/partner/PartnerAdd.jsx";
import PartnerList from "./page/partner/PartnerList.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonCodeList } from "./page/commonCode/CommonCodeList.jsx";

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
      { path: "commonCode/list", element: <CommonCodeList /> },
      {
        path: "partner/add",
        element: <PartnerAdd />,
      },
      {
        path: "partner/list",
        element: <PartnerList />,
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
