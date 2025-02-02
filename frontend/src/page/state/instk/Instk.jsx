import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import React from "react";
import { InstkList } from "../../../components/state/instk/InstkList.jsx";

export function Instk() {
  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StateSideBar />
        <Stack flex={1} p={5} pb={0}>
          <Heading size={"xl"} p={2} mb={3}>
            구매 / 설치 관리 {">"} 입고 관리
          </Heading>
          <InstkList />
        </Stack>
      </HStack>
    </Box>
  );
}
