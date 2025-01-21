import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import StorageRetrievalDetail from "./StorageRetrievalDetail.jsx";
import StorageRetrievalListPage from "./StorageRetrievalListPage.jsx";

function StorageRetrievalList({
  storageRetrievalList,
  countStorageRetrieval,
  handlePageChangeClick,
  currentPage,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStorageRetrieval, setSelectedStorageRetrieval] =
    useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader width="80px">#</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">입출 구분</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">
                  시리얼 번호
                </Table.ColumnHeader>
                <Table.ColumnHeader width="150px">품목명</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">창고명</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">가맹점명</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">본사 직원</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">
                  본사 직원 사번
                </Table.ColumnHeader>
                <Table.ColumnHeader width="150px">
                  협력업체 직원
                </Table.ColumnHeader>
                <Table.ColumnHeader width="200px">
                  협력업체 직원 사번
                </Table.ColumnHeader>
                <Table.ColumnHeader width="100px">날짜</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {storageRetrievalList.map((storageRetrieval) => (
                <StorageRetrievalListPage
                  storageRetrieval={storageRetrieval}
                  setSelectedStorageRetrieval={setSelectedStorageRetrieval}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countStorageRetrieval}
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
        <StorageRetrievalDetail
          storageRetrieval={selectedStorageRetrieval}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default StorageRetrievalList;
