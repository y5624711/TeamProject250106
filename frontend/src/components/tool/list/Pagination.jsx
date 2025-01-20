import React, { useEffect, useState } from "react";
import { Center, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import { useSearchParams } from "react-router-dom";

export function Pagination({ count, pageSize, onPageChange }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // 새로고침 시 UI 표시가 1페이지로 초기화되는 오류 -> URL의 page 파라미터로 currentPage 초기화
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10); // 10진수로 변환
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage); // 부모로 상태 전달
  };

  return (
    <Center position="absolute" bottom="100px">
      <PaginationRoot
        onPageChange={(e) => handlePageChange(e.page)}
        count={count}
        pageSize={pageSize}
        page={currentPage}
        variant="solid"
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Center>
  );
}
