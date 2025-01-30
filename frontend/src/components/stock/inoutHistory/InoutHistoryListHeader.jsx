import React from "react";
import { Table } from "@chakra-ui/react";

function InoutHistoryListHeader({ setSearchParams }) {
  // 정렬 헤더
  const sortOptions = [
    { key: "locationKey", label: "#" },
    { key: "warehouseName", label: "창고" },
    { key: "row", label: "행" },
    { key: "col", label: "열" },
    { key: "shelf", label: "단" },
    { key: "itemCommonName", label: "품목" },
    { key: "locationNote", label: "비고" },
  ];

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
        입출 구분
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
        시리얼 번호
      </Table.ColumnHeader>
      <Table.ColumnHeader
        width="200px"
        textAlign="center"
        verticalAlign="middle"
      >
        담당 업체
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
        가맹점
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
        담당 업체 직원
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
