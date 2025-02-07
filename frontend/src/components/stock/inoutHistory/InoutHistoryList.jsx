import React, { useState } from "react";
import { Box, Center, HStack, Table } from "@chakra-ui/react";
import InoutHistoryDetail from "./InoutHistoryDetail.jsx";
import InoutHistoryListPage from "./InoutHistoryListPage.jsx";
import { Sort } from "../../tool/form/Sort.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";

function InoutHistoryList({
  currentPage,
  inoutHistoryList,
  setSearchParams,
  countInoutHistory,
  handlePageChangeClick,
  search,
  setSearch,
}) {
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
    { key: "businessEmployeeName", label: "요청자" },
    { key: "customerEmployeeName", label: "승인자" },
    { key: "inoutHistoryDate", label: "날짜" },
  ];

  return (
    <Box mt={-2}>
      <Box>
        <Table.Root interactive>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) => {
                  setSearchParams(nextSearchParam);
                  const searchString = nextSearchParam.toString(); // 예: "type=all&keyword=test&sort=locationKey"
                  const sortMatch = searchString.match(/sort=([^&]*)/);
                  const orderMatch = searchString.match(/order=([^&]*)/);
                  setSearch({
                    ...search,
                    order: orderMatch[1],
                    sort: sortMatch[1],
                  });
                }}
                defaultSortKey={"inoutHistoryKey"}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {inoutHistoryList.length > 0 ? (
              inoutHistoryList.map((inoutHistory, index) => (
                <InoutHistoryListPage
                  key={inoutHistory.inoutHistoryKey}
                  index={index}
                  inoutHistory={inoutHistory}
                  setSelectedInoutHistory={setSelectedInoutHistory}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="10">
                  정보가 존재하지 않습니다.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
      <Center p={4}>
        <PaginationRoot
          onPageChange={handlePageChangeClick}
          count={countInoutHistory}
          page={currentPage}
          pageSize={10}
          siblingCount={2}
          defaultPage={currentPage}
          variant="solid"
          size={"md"}
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
    </Box>
  );
}

export default InoutHistoryList;
