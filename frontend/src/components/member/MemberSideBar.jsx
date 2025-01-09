import { Box, Heading, Stack } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { SideBarItem } from "./SideBarItem.jsx";
import { useNavigate } from "react-router-dom";

export function MemberSideBar() {
  const navigate = useNavigate();
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 회원 관리 </Heading>
        <SideBarItem> 회원 등록</SideBarItem>
        <SideBarItem
          onClick={() => {
            navigate();
          }}
        >
          {" "}
          회원 조회
        </SideBarItem>
      </Stack>
    </Box>
  );
}
