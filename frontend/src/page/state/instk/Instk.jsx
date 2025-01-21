import { Box } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import React from "react";
import { InstkList } from "../../../components/state/instk/InstkList.jsx";

export function Instk() {
  return (
    <Box display={"flex"}>
      <StateSideBar />
      <InstkList />
    </Box>
  );
}
