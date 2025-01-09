import { Box } from "@chakra-ui/react";
import { MemberAdd } from "../../components/member/MemberAdd.jsx";
import { MemberSideBar } from "../../components/member/MemberSideBar.jsx";
import React from "react";
import { MemberList } from "../../components/member/MemberList.jsx";

// 왼쪽 탭에 따라서 > 오른쪽을 다르게 보이게 할건가 ?
export function Member() {
  return (
    <Box display={"flex"}>
      <MemberSideBar />
      <MemberList />
      <MemberAdd />
    </Box>
  );
}
