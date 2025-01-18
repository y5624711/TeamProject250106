import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { ItemCommonCode } from "./page/commonCode/ItemCommonCode.jsx";
import Customer from "./page/customer/Customer.jsx";
import { Franchise } from "./page/franchise/Franchise.jsx";
import { Employee } from "./page/employee/Employee.jsx";
import { BusinessAndDepartment } from "./page/businessAndDepartment/BusinessAndDepartment.jsx";
import { LoginPage } from "./page/login/LoginPage.jsx";
import Warehouse from "./page/warehouse/Warehouse.jsx";
import SystemCommonCode from "./page/commonCode/SystemCommonCode.jsx";

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
      { path: "business", element: <BusinessAndDepartment /> },
      { path: "commonCode/system", element: <SystemCommonCode /> },
      {
        path: "commonCode/item",
        element: <ItemCommonCode />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "item",
        element: <Item />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "franchise",
        element: <Franchise />,
      },
      {
        path: "warehouse/management",
        element: <Warehouse />,
      },
    ],
  },

  {
    path: "/auth",
    element: <LoginPage />,
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
