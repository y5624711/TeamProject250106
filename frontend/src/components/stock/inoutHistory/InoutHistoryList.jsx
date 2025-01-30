import React, { useState } from "react";
import { Box, Center, Stack, Table } from "@chakra-ui/react";
import InoutHistoryDetail from "./InoutHistoryDetail.jsx";
import InoutHistoryListPage from "./InoutHistoryListPage.jsx";
import { Sort } from "../../tool/list/Sort.jsx";

function InoutHistoryList({ currentPage, inoutHistoryList, setSearchParams }) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedInoutHistory, setSelectedInoutHistory] = useState(null);

  // 정렬 헤더
  const sortOptions = [
    { key: "inoutHistoryKey", label: "#" },
    { key: "inoutCommonCode", label: "입출 구분" },
    { key: "itemName", label: "품목" },
    { key: "serialNo", label: "시리얼 번호" },
    { key: "customerName", label: "담당 업체" },
    { key: "warehouseName", label: "창고" },
    { key: "franchiseName", label: "가맹점" },
    { key: "businessEmployeeName", label: "본사 직원" },
    { key: "customerEmployeeName", label: "협력 업체 직원" },
    { key: "inoutHistoryDate", label: "날짜" },
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
