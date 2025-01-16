import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaginationItems() {
  return null;
}

function WarehouseList({ warehouseList, onShowDetail, countWarehouse }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/warehouse/management?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);
  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>#</Table.ColumnHeader>
                <Table.ColumnHeader>창고명</Table.ColumnHeader>
                <Table.ColumnHeader>담당 업체</Table.ColumnHeader>
                <Table.ColumnHeader>업체 직원</Table.ColumnHeader>
                <Table.ColumnHeader>광역 시도</Table.ColumnHeader>
                <Table.ColumnHeader>시군</Table.ColumnHeader>
                <Table.ColumnHeader>사용 여부</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {warehouseList.map((warehouse) => (
                <Table.Row
                  key={warehouse.warehouseKey}
                  onClick={() => {
                    onShowDetail(warehouse.warehouseKey);
                  }}
                >
                  <Table.Cell>{warehouse.warehouseKey}</Table.Cell>
                  <Table.Cell>{warehouse.warehouseName}</Table.Cell>
                  <Table.Cell>{warehouse.customerCode}</Table.Cell>
                  <Table.Cell>{warehouse.customerEmployeeNo}</Table.Cell>
                  <Table.Cell>{warehouse.warehouseState}</Table.Cell>
                  <Table.Cell>{warehouse.warehouseCity}</Table.Cell>
                  <Table.Cell>
                    {warehouse.warehouseActive ? "사용" : "미사용"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Box>
          <PaginationRoot
            count={countWarehouse}
            pageSize={10}
            defaultPage={currentPage}
            onPageChange={handlePageChangeClick}
            siblingCount={2}
            variant="solid"
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Box>
      </Stack>
    </Box>
  );
}

export default WarehouseList;
