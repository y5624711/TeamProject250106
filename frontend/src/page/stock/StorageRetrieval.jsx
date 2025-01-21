import React from "react";
import { StockSideBar } from "../../components/tool/sidebar/StockSideBar.jsx";
import { Box, HStack, Stack } from "@chakra-ui/react";

function StorageRetrieval(props) {
  return (
    <Box>
      <HStack align="flex-start">
        <StockSideBar />
        <Stack>
          <Box>물류 관리 > 물품입출내역</Box>
          {/*검색 jsx*/}
          {/*<StorageRetrievalSearch*/}
          {/*  storageRetrievalOptionList={storageRetrievalOptionList}*/}
          {/*  setSearch={setSearch}*/}
          {/*  search={search}*/}
          {/*  handleSearchClick={handleSearchClick}*/}
          {/*/>*/}
        </Stack>
      </HStack>
    </Box>
  );
}

export default StorageRetrieval;
