import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

export function CommonCodeList() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => setCommonList(data));
  }, []);

  // Sidebar 데이터
  const sidebarItems = [
    { label: "공통 코드 목록", path: "/commonCode/list" },
    { label: "공통 코드 등록", path: "" },
  ];

  return (
    <Box>
      <SideBar title={"공통코드"} pageName={""} items={sidebarItems}>
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
            {commonList.map((list) => (
              <Table.Row key={list.id}>
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
      </SideBar>
    </Box>
  );
}
