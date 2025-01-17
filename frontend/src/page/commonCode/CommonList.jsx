import { Box, HStack, Stack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function CommonList() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/system/list")
      .then((res) => res.data)
      .then((data) => {
        setCommonList(data);
      });
  }, []);

  return (
    <Box>
      <HStack>
        <Stack>
          <Table.Root>
            <Table.Header>
              <Table.Row whiteSpace={"nowrap"}>
                <Table.ColumnHeader>id</Table.ColumnHeader>
                <Table.ColumnHeader>공통코드</Table.ColumnHeader>
                <Table.ColumnHeader>코드명</Table.ColumnHeader>
                <Table.ColumnHeader>비고</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {commonList.map((list, index) => (
                <Table.Row key={list.commonCodeKey || index}>
                  <Table.Cell>{list.commonCodeKey}</Table.Cell>
                  <Table.Cell>{list.commonCode}</Table.Cell>
                  <Table.Cell>{list.commonCodeName}</Table.Cell>
                  <Table.Cell>{list.commonCodeNote}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Stack>
      </HStack>
    </Box>
  );
}
