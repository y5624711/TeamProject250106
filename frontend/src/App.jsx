import axios from "axios";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/standard/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { ItemCommonCode } from "./page/standard/commonCode/ItemCommonCode.jsx";
import Customer from "./page/standard/customer/Customer.jsx";
import { Franchise } from "./page/standard/franchise/Franchise.jsx";
import { Employee } from "./page/standard/employee/Employee.jsx";
import { BusinessAndDepartment } from "./page/standard/businessAndDepartment/BusinessAndDepartment.jsx";
import { LoginPage } from "./page/login/LoginPage.jsx";
import Warehouse from "./page/standard/warehouse/Warehouse.jsx";
import Location from "./page/standard/location/Location.jsx";
import SystemCommonCode from "./page/standard/commonCode/SystemCommonCode.jsx";
import { Purchase } from "./page/state/purchase/Purchase.jsx";
import { Install } from "./page/state/install/Install.jsx";
import Return from "./page/state/return/Return.jsx";

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
        path: "warehouse/*",
        element: <Warehouse />,
      },
      {
        path: "location/*",
        element: <Location />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "install",
        element: <Install />,
      },
      {
        path: "return",
        element: <Return />,
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
