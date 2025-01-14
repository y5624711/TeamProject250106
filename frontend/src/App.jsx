import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/item/Item.jsx";
import CustomerAdd from "./page/customer/CustomerAdd.jsx";
import CustomerList from "./page/customer/CustomerList.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonCode } from "./page/commonCode/CommonCode.jsx";
import { CommonList } from "./page/commonCode/CommonList.jsx";
import { CommonAdd } from "./page/commonCode/CommonAdd.jsx";
import Customer from "./page/customer/Customer.jsx";

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
        path: "item",
        element: <Item />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "customer/add",
        element: <CustomerAdd />,
      },
      {
        path: "customer/list",
        element: <CustomerList />,
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
