import React, { useState } from "react";
import { Box, Stack, Table } from "@chakra-ui/react";
import StocktakingListPage from "./StocktakingListPage.jsx";
import StocktakingDetail from "./StocktakingDetail.jsx";
import StocktakingListHeader from "./StocktakingListHeader.jsx";

function StocktakingList({ stocktakingList, currentPage }) {
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedStocktaking, setSelectedStocktaking] = useState(null);
  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              {/* 재고실사 테이블 헤더 */}
              <StocktakingListHeader />
            </Table.Header>
            <Table.Body>
              {/* 재고실사 각각의 내용*/}
              {stocktakingList.map((stocktaking, index) => (
                <StocktakingListPage
                  index={(currentPage - 1) * 10 + index}
                  stocktaking={stocktaking}
                  setSelectedStocktaking={setSelectedStocktaking}
                  setIsDetailDialogOpen={setIsDetailDialogOpen}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
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
