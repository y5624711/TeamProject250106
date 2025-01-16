import React, { useState } from "react";
import { Center, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";

export function Pagination({ count, pageSize, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage); // 부모로 상태 전달
  };

  return (
    <Center>
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
