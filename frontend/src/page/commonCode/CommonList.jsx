import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function CommonList() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/list")
      .then((res) => res.data)
      .then((data) => {
        setCommonList(data);
      });
  }, []);

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader>공통코드</Table.ColumnHeader>
            <Table.ColumnHeader>코드명</Table.ColumnHeader>
            <Table.ColumnHeader>비고</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {commonList.map((list, index) => (
            <Table.Row key={list.common_code_key || index}>
              <Table.Cell>{list.common_code}</Table.Cell>
              <Table.Cell>{list.common_code_name}</Table.Cell>
              <Table.Cell>{list.common_code_note}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
