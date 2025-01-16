import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Stack, Table } from "@chakra-ui/react";
import axios from "axios";
import { Switch } from "../../components/ui/switch.jsx";
import { Button } from "../../components/ui/button.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

export function CommonCodeItem() {
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);

  // 물품 공통 코드 정보를 가져오기
  useEffect(() => {
    axios
      .get(`/api/commonCode/item/list`)
      .then((res) => {
        setItemCommonCodeList(res.data);
      })
      .catch((error) => {
        console.error("물품 구분 코드 정보 요청 중 오류 발생: ", error);
      });
  }, []);
  console.log(itemCommonCodeList);

  return (
    <Box>
      <Flex>
        <SideBar />
        <Box w="100%">
          <Stack>
            <HStack w="70%" justify="space-between">
              <Switch>전체 상품 조회</Switch>
              <Button>수정</Button>
            </HStack>
            <Table.Root>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.ColumnHeader textAlign="center">#</Table.ColumnHeader>
                  <Table.ColumnHeader>품목코드</Table.ColumnHeader>
                  <Table.ColumnHeader>품목코드명</Table.ColumnHeader>
                  <Table.ColumnHeader>비고</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {itemCommonCodeList.map((item) => (
                  <Table.Row
                    textAlign="center"
                    key={item.itemCommonCodeKey}
                    onClick={() => onShowDetail(item.itemKey)}
                    style={{ cursor: "pointer" }}
                  >
                    <Table.Cell textAlign="center">
                      {item.itemCommonCodeKey}
                    </Table.Cell>
                    <Table.Cell>{item.itemCommonCode}</Table.Cell>
                    <Table.Cell>{item.itemCommonName}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
