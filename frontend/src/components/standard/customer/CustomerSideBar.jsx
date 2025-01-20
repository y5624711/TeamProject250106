import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";

export function CustomerSideBar({ onSelect }) {
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 협력사 관리 </Heading>
        <Box
          onClick={() => {
            onSelect("customerList");
          }}
        >
          협력사 조회
        </Box>
        <Box
          onClick={() => {
            onSelect("customerAdd");
          }}
        >
          협력사 등록
        </Box>
      </Stack>
    </Box>
  );
}
