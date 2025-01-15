import {
  Box,
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export function FranchiseList({ onFranchiseClick }) {
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    axios
      .get("/api/franchise/list")
      .then((res) => {
        setFranchises(res.data);
      })
      .catch((err) => {
        console.error("데이터를 불러오는 데 오류가 발생했습니다:", err);
      });
  }, []);

  return (
    <Box>
      <Table.Root interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>#</TableColumnHeader>
            <TableColumnHeader>가맹점명</TableColumnHeader>
            <TableColumnHeader>가맹점주</TableColumnHeader>
            <TableColumnHeader>광역시도</TableColumnHeader>
            <TableColumnHeader>시군</TableColumnHeader>
            <TableColumnHeader>본사 직원</TableColumnHeader>
            <TableColumnHeader>계약 여부</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {franchises.map((franchise) => (
            <Table.Row
              key={franchise.franchiseKey}
              onClick={() => onFranchiseClick(franchise.franchiseKey)} // 클릭 시 부모 컴포넌트로 franchiseKey 전달
            >
              <Table.Cell>{franchise.franchiseKey}</Table.Cell>
              <Table.Cell>{franchise.franchiseName}</Table.Cell>
              <Table.Cell>{franchise.franchiseRep}</Table.Cell>
              <Table.Cell>{franchise.franchiseState}</Table.Cell>
              <Table.Cell>{franchise.franchiseCity}</Table.Cell>
              <Table.Cell>{franchise.businessEmployeeNo}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
