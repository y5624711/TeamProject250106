import React from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import {
  Center,
  createListCollection,
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
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";

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
      warName: "1번창고",
      city: "함경북도",
      location: "경흥군",
      address: "상수로길",
      cus_name: "씨씨티비",
      item_name: "전자레인지",
      count: 10,
    },
    {
      id: 2,
      warName: "2번창고",
      city: "경상북도",
      location: "봉화군",
      address: "가나다길",
      cus_name: "중앙포스",
      item_name: "포스기",
      count: 1,
    },
    {
      id: 3,
      warName: "3번창고",
      city: "인천광역시",
      location: "서구",
      address: "검단로",
      cus_name: "면발천국",
      item_name: "라면제조기",
      count: 30,
    },
  ];

  return (
    <HStack align="flex-start" w={"100%"}>
      <StockSideBar />
      <Stack flex={1} p={5}>
        {/*셀렉트 &&검색창*/}
        <Heading size={"xl"} p={2} mb={3}>
          위치별 재고현황
        </Heading>
        <HStack justifyContent="center">
          <SelectRoot
            collection={searchOptions}
            value={"전체"}
            width="160px"
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
          <Input w={"50%"} />
          <Button>검색</Button>
        </HStack>
        <Table.Root variant={"outline"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>창고명</Table.ColumnHeader>
              <Table.ColumnHeader>광역시도</Table.ColumnHeader>
              <Table.ColumnHeader>시군</Table.ColumnHeader>
              <Table.ColumnHeader>창고 위치</Table.ColumnHeader>
              <Table.ColumnHeader>협력업체</Table.ColumnHeader>
              <Table.ColumnHeader>품명</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">수량</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.warName}</Table.Cell>
                <Table.Cell>{item.city}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>{item.cus_name}</Table.Cell>
                <Table.Cell>{item.item_name}</Table.Cell>
                <Table.Cell textAlign="end">{item.count}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Center>
          <PaginationRoot count={3} pageSize={10} page={1} variant="solid">
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
      </Stack>
    </HStack>
  );
}

export default WarehouseStatus;
