import React, { useEffect, useState } from "react";
import { Box, HStack, Table, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../ui/button.jsx";
import { Checkbox } from "../ui/checkbox.jsx";

export function ItemList({ onShowDetail }) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/item/list")
      .then((res) => {
        setItemList(res.data);
        console.log(itemList);
      })
      .catch((error) => {
        console.error("물품 목록 요청 중 오류 발생: ", error);
      });
  }, []);

  return (
    <Box>
      <Text>물품 조회</Text>
      <HStack>
        <Box>검색 항목</Box>
        <Box>검색 내용</Box>
        <Button>검색</Button>
      </HStack>
      <Box>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>품목 번호</Table.ColumnHeader>
              <Table.ColumnHeader>품목 구분</Table.ColumnHeader>
              <Table.ColumnHeader>품목명</Table.ColumnHeader>
              <Table.ColumnHeader>담당업체</Table.ColumnHeader>
              <Table.ColumnHeader>취급 담당자</Table.ColumnHeader>
              <Table.ColumnHeader>과세구분</Table.ColumnHeader>
              <Table.ColumnHeader>기초재고량</Table.ColumnHeader>
              <Table.ColumnHeader>사용 여부</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemList.map((item) => (
              <Table.Row key={item.itemId}>
                <Table.Cell>{item.itemId}</Table.Cell>
                <Table.Cell>{item.itemType}</Table.Cell>
                <Table.Cell>{item.itemName}</Table.Cell>
                {/*<Table.Cell>{item.partnerName}</Table.Cell>*/}
                <Table.Cell>임시 담당업체</Table.Cell>
                {/*<Table.Cell>{item.managerName}</Table.Cell>*/}
                <Table.Cell>임시 담당자명</Table.Cell>
                <Table.Cell>{item.tax}</Table.Cell>
                <Table.Cell>{item.minimumStock}</Table.Cell>
                <Table.Cell>
                  <Checkbox checked={item.active} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
