import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table } from "@chakra-ui/react";
import { Checkbox } from "../../components/ui/checkbox.jsx";

export function CommonList({ onShowDetail }) {
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
    </Box>
  );
}
