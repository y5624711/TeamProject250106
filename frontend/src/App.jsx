import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationContext from "./context/AuthenticationProvider.jsx";
import React from "react";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { Item } from "./page/standard/item/Item.jsx";
import { Main } from "./page/main/Main.jsx";
import { CommonCode } from "./page/standard/commonCode/CommonCode.jsx";
import Customer from "./page/standard/customer/Customer.jsx";
import { Franchise } from "./page/standard/franchise/Franchise.jsx";
import { Employee } from "./page/standard/employee/Employee.jsx";
import { BusinessAndDepartment } from "./page/standard/businessAndDepartment/BusinessAndDepartment.jsx";
import { LoginPage } from "./page/login/LoginPage.jsx";
import Warehouse from "./page/standard/warehouse/Warehouse.jsx";
import Location from "./page/standard/location/Location.jsx";
import { Purchase } from "./page/state/purchase/Purchase.jsx";
import { Install } from "./page/state/install/Install.jsx";
import Return from "./page/state/return/Return.jsx";
import { Instk } from "./page/state/instk/Instk.jsx";
import Stocktaking from "./page/stock/stocktaking/Stocktaking.jsx";
import InoutHistory from "./page/stock/inoutHistory/InoutHistory.jsx";
import InventoryStatus from "./page/stock/warehouseStatus/InventoryStatus.jsx";
import MemberInfo from "./page/memberInfo/MemberInfo.jsx";

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
      {
        index: true,
        element: <Main />,
      },
      {
        path: `info/:id`,
        element: <MemberInfo />,
      },
      {
        path: "business",
        element: <BusinessAndDepartment />,
      },
      {
        path: "commonCode",
        element: <CommonCode />,
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
      {
        path: "instk",
        element: <Instk />,
      },
      {
        path: "stocktaking/*",
        element: <Stocktaking />,
      },
      {
        path: "inoutHistory/*",
        element: <InoutHistory />,
      },
      {
        path: "warehouseStatus/*",
        element: <InventoryStatus />,
      },
    ],
  },
  {
    path: "/login",
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
