import React from "react";
import { Table } from "@chakra-ui/react";

function StocktakingListHeader(props) {
  return (
    <Table.Row>
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
        창고명
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        품목명
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
        협력업체 직원
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        전화번호
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
