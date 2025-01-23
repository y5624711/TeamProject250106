import React from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import {
  createListCollection,
  Flex,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Button } from "../../../components/ui/button.jsx";

function WarehouseStatus() {
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "품목", value: "item" },
      { label: "위치", value: "position" },
    ],
  });

  // 컬럼 배열 정의
  const columnsList = [
    { key: "common_code_key", label: "#" },
    { key: "common_code_name", label: "공통코드" },
    { key: "common_code", label: "공통코드명" },
  ];

  const items = [
    {
      id: 1,
      cus_name: "씨씨티비",
      item_code: "MIC",
      item_name: "전자레인지",
      position: "아오지",
      location: "함경북도 경흥군",
      count: 1,
    },
    {
      id: 2,
      cus_name: "중앙포스",
      item_code: "POS",
      item_name: "포스기",
      position: "아오지",
      location: "함경북도 경흥군",
      count: 90,
    },
    {
      id: 3,
      cus_name: "면발천국",
      item_code: "RAM",
      item_name: "라면제조기",
      position: "아오지",
      location: "함경북도 경흥군",
      count: 150,
    },
    {
      id: 4,
      cus_name: "온장원",
      item_code: "REF",
      item_name: "냉장고",
      position: "아오지",
      location: "함경북도 경흥군",
      count: 200,
    },
    {
      id: 5,
      cus_name: "시몬선반",
      item_code: "WAR",
      item_name: "온장고",
      position: "아오지",
      location: "함경북도 경흥군",
      count: 101,
    },
  ];

  return (
    <Flex>
      <StockSideBar />
      <Stack w={"100vh"} mx={"auto"} pt={"20px"}>
        {/*셀렉트 &&검색창*/}
        <Heading>위치별 재고현황</Heading>
        <HStack>
          <SelectRoot
            collection={searchOptions}
            value={"전체"}
            size="sm"
            width="200px"
            position="relative"
          >
            <SelectTrigger>
              <SelectValueText placeholder="전체" />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "100px",
                top: "40px",
                position: "absolute",
              }}
            >
              {searchOptions.items.map((option) => (
                <SelectItem item={option} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          {/*검색창*/}
          <Input />
          <Button>검색</Button>
        </HStack>
        <Table.Root interactive showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>업체명</Table.ColumnHeader>
              <Table.ColumnHeader>품목코드</Table.ColumnHeader>
              <Table.ColumnHeader>품명</Table.ColumnHeader>
              <Table.ColumnHeader>창고명</Table.ColumnHeader>
              <Table.ColumnHeader>창고 위치</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">수량</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.cus_name}</Table.Cell>
                <Table.Cell>{item.item_code}</Table.Cell>
                <Table.Cell>{item.item_name}</Table.Cell>
                <Table.Cell>{item.position}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell textAlign="end">{item.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </Flex>
  );
}

export default WarehouseStatus;
