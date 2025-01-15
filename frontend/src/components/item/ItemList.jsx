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
      })
      .catch((error) => {
        console.error("물품 목록 요청 중 오류 발생: ", error);
      });
  }, []);

  console.log(itemList);

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
              <Table.ColumnHeader>#</Table.ColumnHeader>
              <Table.ColumnHeader>품목명</Table.ColumnHeader>
              <Table.ColumnHeader>담당업체</Table.ColumnHeader>
              <Table.ColumnHeader>입고가</Table.ColumnHeader>
              <Table.ColumnHeader>출고가</Table.ColumnHeader>
              <Table.ColumnHeader>사용여부</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemList.map((item) => (
              <Table.Row
                key={item.itemKey}
                onClick={() => onShowDetail(item.itemKey)}
                style={{ cursor: "pointer" }}
              >
                {/*번호 증가값으로 수정*/}
                <Table.Cell textAlign="center">{item.itemKey}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell textAlign="end">{item.inputPrice}</Table.Cell>
                <Table.Cell textAlign="end">{item.outputPrice}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Checkbox checked={item.itemActive} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
