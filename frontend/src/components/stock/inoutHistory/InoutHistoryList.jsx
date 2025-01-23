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
import InoutHistoryListHeader from "./InoutHistoryListHeader.jsx";

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
              {/* 테이블 헤더 */}
              <InoutHistoryListHeader />
            </Table.Header>
            <Table.Body>
              {/* 각 입출내역 */}
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
        {/*입출내역 더블클릭 시 뜨는 팝업창*/}
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
