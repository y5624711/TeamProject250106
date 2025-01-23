import React from "react";
import { Table } from "@chakra-ui/react";

function StocktakingListHeader(props) {
  return (
    <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
      <Table.ColumnHeader
        width="80px"
        textAlign="center"
        verticalAlign="middle"
      >
        #
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        창고
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        품목
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        전산 수량
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        실제 수량
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        담당자
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="150px"
        textAlign="center"
        verticalAlign="middle"
      >
        날짜
      </Table.ColumnHeader>
    </Table.Row>
  );
}

export default StocktakingListHeader;
