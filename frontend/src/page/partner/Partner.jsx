import React from "react";
import { SideBar } from "../../components/tool/SideBar.jsx";

function Partner(props) {
  // Sidebar 데이터
  const sidebarItems = [
    { label: "협력사 목록", path: "/partner/list" },
    { label: "협력사 등록", path: "/partner/add" },
  ];

  return (
    <div>
      <SideBar title={"협력사 관리"} items={sidebarItems}></SideBar>
    </div>
  );
}

export default Partner;
