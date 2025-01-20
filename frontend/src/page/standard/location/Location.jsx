import React from "react";
import { SideBar } from "../../../components/tool/SideBar.jsx";
import { Box, HStack, Stack } from "@chakra-ui/react";

function Location(props) {
  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>로케이션 관리</Stack>
      </HStack>
    </Box>
  );
}

export default Location;
