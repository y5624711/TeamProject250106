import React, { useState } from "react";
import { Box, Center, Stack, Table } from "@chakra-ui/react";
import InoutHistoryDetail from "./InoutHistoryDetail.jsx";
import InoutHistoryListPage from "./InoutHistoryListPage.jsx";
import InoutHistoryListHeader from "./InoutHistoryListHeader.jsx";

function InoutHistoryList({ currentPage, inoutHistoryList }) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedInoutHistory, setSelectedInoutHistory] = useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              {/* 테이블 헤더 */}
              <InoutHistoryListHeader />
            </Table.Header>
            <Table.Body>
              {/* 각 입출내역 */}
              {inoutHistoryList.map((inoutHistory, index) => (
                <InoutHistoryListPage
                  index={index}
                  inoutHistory={inoutHistory}
                  setSelectedInoutHistory={setSelectedInoutHistory}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                  page={currentPage}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center></Center>
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
