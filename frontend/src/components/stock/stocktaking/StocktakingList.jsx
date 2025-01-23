import React, { useState } from "react";
import { Box, Center, HStack, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import StocktakingListPage from "./StocktakingListPage.jsx";
import StocktakingDetail from "./StocktakingDetail.jsx";
import StocktakingListHeader from "./StocktakingListHeader.jsx";

function StocktakingList({
  stocktakingList,
  handlePageChangeClick,
  countStocktaking,
  currentPage,
}) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStocktaking, setSelectedStocktaking] = useState(null);
  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive showColumnBorder>
            <Table.Header>
              {/* 재고실사 테이블 헤더 */}
              <StocktakingListHeader />
            </Table.Header>
            <Table.Body>
              {/* 재고실사 각각의 내용*/}
              {stocktakingList.map((stocktaking) => (
                <StocktakingListPage
                  stocktaking={stocktaking}
                  setSelectedStocktaking={setSelectedStocktaking}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Center>
          <PaginationRoot
            onPageChange={handlePageChangeClick}
            count={countStocktaking}
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
