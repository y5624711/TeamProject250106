import { Box, Heading, Stack } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { SideBarItem } from "./SideBarItem.jsx";

export function MemberSideBar() {
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 회원 관리 </Heading>
        <SideBarItem> 회원 등록</SideBarItem>
        <SideBarItem> 회원 조회</SideBarItem>
      </Stack>
    </Box>
  );
}
