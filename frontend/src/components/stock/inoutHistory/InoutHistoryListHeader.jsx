import React from "react";
import { Table } from "@chakra-ui/react";

function InoutHistoryListHeader(props) {
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
        입출 구분
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        시리얼 번호
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
        창고명
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        가맹점명
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        본사 직원
      </Table.ColumnHeader>

      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        협력업체 직원
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

export default InoutHistoryListHeader;
