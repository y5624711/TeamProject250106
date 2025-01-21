import React from "react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Box, Stack } from "@chakra-ui/react";

function Return(props) {
  return (
    <Box>
      <StateSideBar />
      <Stack w={"100%"} mx={"auto"}>
        {/*<Text fontSize="xl" mx={10} my={3}>*/}
        {/*  구매/설치 관리 {">"} 반품/회수 관리*/}
        {/*</Text>*/}
      </Stack>
    </Box>
  );
}

export default Return;
