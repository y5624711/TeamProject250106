import { Box, Input, Table, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

export function CommonCode() {
  const [commonList, setCommonList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("list");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => {
        setCommonList(data);
      });
  }, []);

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
        {selectedMenu === "list" && !showDetail && (
          <Table.Root>
            <Table.Header>
              <Table.Row whiteSpace={"nowrap"}>
                <Table.ColumnHeader>공통코드</Table.ColumnHeader>
                <Table.ColumnHeader>코드명</Table.ColumnHeader>
                <Table.ColumnHeader>사용여부</Table.ColumnHeader>
                <Table.ColumnHeader>비고</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {commonList.map((list, index) => (
                <Table.Row key={list.id || index}>
                  <Table.Cell>{list.common_code}</Table.Cell>
                  <Table.Cell>{list.name}</Table.Cell>
                  <Table.Cell>
                    <Checkbox checked={list.active} readOnly />
                  </Table.Cell>
                  <Table.Cell>{list.note}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
        {selectedMenu === "add" && (
          <Box>
            <Text>입력</Text>
            <Input />
            <Input />
          </Box>
        )}
      </SideBar>
    </Box>
  );
}
