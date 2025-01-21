import React from "react";
import { StockSideBar } from "../../components/tool/sidebar/StockSideBar.jsx";
import { Box, HStack, Stack } from "@chakra-ui/react";

function WarehouseStatus(props) {
  return (
    <Box>
      <HStack align="flex-start">
        <StockSideBar />
        <Stack>
          <Box>물류 관리 > 위치별 재고 현황</Box>
        </Stack>
      </HStack>
    </Box>
  );
}

export default WarehouseStatus;
