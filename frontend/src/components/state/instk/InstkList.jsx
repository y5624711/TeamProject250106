import { Box, Heading, Table } from "@chakra-ui/react";
import React from "react";
import { InstkConfirmModal } from "./InstkConfirmModal.jsx";
import { InstkDetaiViewModal } from "./InstkDetaiViewModal.jsx";

export function InstkList() {
  return (
    <Box>
      <Heading>구매/설치관리 >가입고 관리</Heading>
      <Box> 검색 화면 </Box>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>입고 구분</Table.ColumnHeader>
            <Table.ColumnHeader>발주 번호</Table.ColumnHeader>
            <Table.ColumnHeader>품목 명</Table.ColumnHeader>
            <Table.ColumnHeader>협력 업체</Table.ColumnHeader>
            <Table.ColumnHeader>날짜</Table.ColumnHeader>
            <Table.ColumnHeader>상태 현황</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>a.index</Table.Cell>
            <Table.Cell>a.</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell>5</Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>7</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table.Root>

      <InstkConfirmModal />
      <InstkDetaiViewModal />
    </Box>
  );
}
