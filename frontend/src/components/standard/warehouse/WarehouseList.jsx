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

function WarehouseList({
  warehouseList,
  countWarehouse,
  currentPage,
  handlePageChangeClick,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedWarehouseKey, setSelectedWarehouseKey] = useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root showColumnBorder interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  width="100px"
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
                  width="150px"
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
                  업체 직원
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  광역 시도
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  시군
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  전화번호
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {warehouseList.map((warehouse, index) => (
                <WarehouseListPage
                  index={(currentPage - 1) * 10 + index}
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
