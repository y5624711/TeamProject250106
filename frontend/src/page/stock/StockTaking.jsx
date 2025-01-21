import React from "react";
import { StockSideBar } from "../../components/tool/sidebar/StockSideBar.jsx";
import { Box, HStack, Stack } from "@chakra-ui/react";

function StockTaking(props) {
  return (
    <Box>
      <HStack align="flex-start">
        <StockSideBar />
        <Stack>
          <Box>물류 관리 > 재고 실사</Box>
        </Stack>
      </HStack>
    </Box>
  );
}

export default StockTaking;
