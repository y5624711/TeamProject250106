import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import InoutHistoryDetail from "./InoutHistoryDetail.jsx";
import InoutHistoryListPage from "./InoutHistoryListPage.jsx";

function InoutHistoryList({
  handlePageChangeClick,
  currentPage,
  countInoutHistory,
  inoutHistoryList,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedInoutHistory, setSelectedInoutHistory] = useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive showColumnBorder>
            <Table.Header>
              <Table.Row>
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
                  시리얼 번호
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  품목명
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  창고명
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  width="200px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  가맹점명
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
                  협력업체 직원
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  width="150px"
                  textAlign="center"
                  verticalAlign="middle"
                >
                  날짜
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {inoutHistoryList.map((inoutHistory) => (
                <InoutHistoryListPage
                  inoutHistory={inoutHistory}
                  setSelectedInoutHistory={setSelectedInoutHistory}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countInoutHistory}
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
        <InoutHistoryDetail
          inoutHistoryKey={selectedInoutHistory}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default InoutHistoryList;
