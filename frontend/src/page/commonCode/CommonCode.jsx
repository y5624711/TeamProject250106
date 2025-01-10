import { Box, Input, Table, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { useSearchParams } from "react-router-dom";

export function CommonCode() {
  const [commonList, setCommonList] = useState([]);
  const [selectedView, setSelectedView] = useState("list"); // 기본 화면 설정
  const [searchParam, setSearchParam] = useSearchParams();

  // <  이게 list 어떤 함수
  useEffect(() => {
    const view = searchParam.get("view") || "list";
    setSelectedView(view);
  }, [searchParam]);

  // 그값을 ,
  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => {
        console.log(searchParam);
        setCommonList(data);
      });
  }, []);

  // Sidebar 데이터
  const sidebarItems = [
    { label: "공통 코드 목록", param: "list" },
    { label: "공통 코드 등록", param: "add" },
  ];

  return (
    <Box>
      <SideBar
        title={"공통코드"}
        items={sidebarItems}
        onItemClick={(param) => setSearchParam({ view: param })}
      >
        {selectedView === "list" && (
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
        {selectedView === "add" && (
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
