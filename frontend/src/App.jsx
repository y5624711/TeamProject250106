import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonList } from "./page/commonCode/CommonList.jsx";
import { CommonAdd } from "./page/commonCode/CommonAdd.jsx";
import { BusinessAndEmployeeList } from "./page/businessAndDepartment/BusinessAndEmployeeList.jsx";
import { CommonCodeItemList } from "./page/commonCode/CommonCodeItemList.jsx";
import Customer from "./page/customer/Customer.jsx";
import { Franchise } from "./page/franchise/Franchise.jsx";
import { Employee } from "./page/employee/Employee.jsx";
import { CommonCodeItemAdd } from "./page/commonCode/CommonCodeItemAdd.jsx";

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
      { path: "business/list", element: <BusinessAndEmployeeList /> },
      { path: "commonCode/list", element: <CommonList /> },
      { path: "commonCode/add", element: <CommonAdd /> },
      {
        path: "commonCode/item/list",
        element: <CommonCodeItemList />,
      },
      {
        path: "commonCode/item/add",
        element: <CommonCodeItemAdd />,
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
