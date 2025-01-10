import { Box } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { CommonList } from "./CommonList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export function CommonCode() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => setCommonList(data));
  }, []);

  // Sidebar 데이터
  const sidebarItems = [
    { label: "공통 코드 목록", path: "/commonCode/" },
    { label: "공통 코드 등록", path: "/commonCode/add" },
  ];

  return (
    <Box>
      <SideBar title={"공통코드"} items={sidebarItems}>
        <CommonList commonList={commonList} />
      </SideBar>
    </Box>
  );
}
