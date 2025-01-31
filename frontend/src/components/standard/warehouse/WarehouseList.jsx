import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import { WarehouseDetail } from "./WarehouseDetail.jsx";
import WarehouseListPage from "./WarehouseListPage.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import { Sort } from "../../tool/list/Sort.jsx";

function WarehouseList({
  warehouseList,
  countWarehouse,
  currentPage,
  handlePageChangeClick,
  setSearchParams,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedWarehouseKey, setSelectedWarehouseKey] = useState(null);

  // 정렬 헤더
  const sortOptions = [
    { key: "warehouseKey", label: "#" },
    { key: "warehouseName", label: "창고" },
    { key: "customerName", label: "담당 업체" },
    { key: "employeeName", label: "관리자" },
    { key: "warehouseState", label: "광역시도" },
    { key: "warehouseCity", label: "시군" },
    { key: "warehouseTel", label: "전화번호" },
  ];

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
                <Sort
                  sortOptions={sortOptions}
                  onSortChange={(nextSearchParam) =>
                    setSearchParams(nextSearchParam)
                  }
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {warehouseList.map((warehouse, index) => (
                <WarehouseListPage
                  index={index}
                  warehouse={warehouse}
                  setSelectedWarehouseKey={setSelectedWarehouseKey}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countWarehouse}
            pageSize={10}
            // page={page}
            siblingCount={2}
            defaultPage={currentPage}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
        <WarehouseDetail
          warehouseKey={selectedWarehouseKey}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default WarehouseList;
