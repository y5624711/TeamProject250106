import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonList } from "./page/commonCode/CommonList.jsx";
import { CommonAdd } from "./page/commonCode/CommonAdd.jsx";
import { CommonCodeItem } from "./page/commonCode/CommonCodeItem.jsx";
import Customer from "./page/customer/Customer.jsx";
import { Franchise } from "./page/franchise/Franchise.jsx";
import { Employee } from "./page/employee/Employee.jsx";
import { BusinessAndEmployee } from "./page/businessAndDepartment/BusinessAndEmployee.jsx";

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
      { path: "business", element: <BusinessAndEmployee /> },
      { path: "commonCode/system/list", element: <CommonList /> },
      { path: "commonCode/system/add", element: <CommonAdd /> },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "item",
        element: <Item />,
      },
      {
        path: "commonCode/item",
        element: <CommonCodeItem />,
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
