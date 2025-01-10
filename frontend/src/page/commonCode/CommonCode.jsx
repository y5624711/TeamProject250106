import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { CommonList } from "./CommonList.jsx";
import { CommonAdd } from "./CommonAdd.jsx";

export function CommonCode() {
  const [selectedMenu, setSelectedMenu] = useState("list");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Sidebar 데이터
  const sidebarItems = [
    { label: "공통 코드 목록", param: "list" },
    { label: "공통 코드 등록", param: "add" },
  ];

  // 메뉴 선택시 호출되는 함수
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setShowDetail(false); //메뉴 변경 시 상세보기 상태 초기화
  };

  return (
    <Box>
      <SideBar
        title={"공통코드"}
        items={sidebarItems}
        onItemClick={handleSelectMenu}
      >
        {selectedMenu === "list" && !showDetail && <CommonList />}
        {selectedMenu === "add" && <CommonAdd />}
      </SideBar>
    </Box>
  );
}
