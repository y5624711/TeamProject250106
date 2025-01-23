import { Box, Heading, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import React from "react";
import { InstkList } from "../../../components/state/instk/InstkList.jsx";

export function Instk() {
  return (
    <Box display={"flex"}>
      <StateSideBar />
      <Stack flex={1} p={5}>
        <Heading size={"xl"} p={2} mb={3}>
          구매 / 설치관리 > 입고 관리
        </Heading>
        <InstkList />
      </Stack>
    </Box>
  );
}
