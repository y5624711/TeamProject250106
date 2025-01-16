import {
  Box,
  Center,
  HStack,
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import { useSearchParams } from "react-router-dom";

export function FranchiseList({ onFranchiseClick }) {
  const [franchises, setFranchises] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const [page, setPage] = useState(Number(pageParam));

  // 데이터 가져오기
  useEffect(() => {
    const params = {
      page,
      st: search.type,
      sk: search.keyword,
    };

    axios
      .get("/api/franchise/list", { params })
      .then((res) => {
        setFranchises(res.data.list);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.error("데이터를 불러오는 데 오류가 발생했습니다:", err);
      });
  }, [page, search.type, search.keyword]); // 의존성 배열에 page, search.type, search.keyword 추가

  // 페이지 변경 핸들러
  function handlePageChange(e) {
    setPage(e.page); // 페이지 상태 변경
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page); // URL 파라미터에서 page 갱신
    setSearchParams(nextSearchParams); // URL 파라미터 업데이트
  }

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
            <TableColumnHeader>본사 직원 이름</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {franchises.map((franchise) => (
            <Table.Row
              style={{ cursor: "pointer" }}
              key={franchise.franchiseKey}
              onClick={() => onFranchiseClick(franchise.franchiseKey)} // 클릭 시 부모 컴포넌트로 franchiseKey 전달
            >
              <Table.Cell>{franchise.franchiseKey}</Table.Cell>
              <Table.Cell>{franchise.franchiseName}</Table.Cell>
              <Table.Cell>{franchise.franchiseRep}</Table.Cell>
              <Table.Cell>{franchise.franchiseState}</Table.Cell>
              <Table.Cell>{franchise.franchiseCity}</Table.Cell>
              <Table.Cell>{franchise.businessEmployeeName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Center>
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          page={page}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Box>
  );
}
