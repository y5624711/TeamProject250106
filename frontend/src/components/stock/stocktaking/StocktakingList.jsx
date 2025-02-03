import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import StocktakingListPage from "./StocktakingListPage.jsx";
import StocktakingDetail from "./StocktakingDetail.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";

function StocktakingList({
  stocktakingList,
  currentPage,
  setSearchParams,
  handlePageChangeClick,
  countStocktaking,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStocktaking, setSelectedStocktaking] = useState(null);

  // 정렬 헤더
  const sortOptions = [
    { key: "stocktakingKey", label: "#" },
    { key: "customerName", label: "담당 업체" },
    { key: "itemCommonName", label: "품목" },
    { key: "countCurrent", label: "전산 수량" },
    { key: "countConfiguration", label: "실제 수량" },
    { key: "countDifference", label: "수량 차이" },
    { key: "warehouseName", label: "창고" },
    { key: "stocktakingType", label: "실사 유형" },
    { key: "customerEmployeeName", label: "담당자" },
    { key: "stocktakingDate", label: "날짜" },
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
                  defaultSortKey={"stocktakingDate"}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* 재고실사 각각의 내용*/}
              {stocktakingList.map((stocktaking, index) => (
                <StocktakingListPage
                  index={index}
                  stocktaking={stocktaking}
                  setSelectedStocktaking={setSelectedStocktaking}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center p={4}>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countStocktaking}
            pageSize={10}
            // page={page}
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
        {/* 더블클릭 시 뜨는 팝업창 */}
        <StocktakingDetail
          stocktakingKey={selectedStocktaking}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default StocktakingList;
