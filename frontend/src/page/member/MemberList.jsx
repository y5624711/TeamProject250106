import { Box, Heading, Stack } from "@chakra-ui/react";
import { MemberAdd } from "../../components/member/MemberAdd.jsx";

function SideBarItem({ children }) {
  return <Box>{children}</Box>;
}

function SideBar() {
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 회원 관리 </Heading>
        <SideBarItem> 회원 조회</SideBarItem>
        <SideBarItem> 회원 등록</SideBarItem>
      </Stack>
    </Box>
  );
}

function ContentBox() {
  return <Box> 뭐냐</Box>;
}

// 왼쪽 탭에 따라서 > 오른쪽을 다르게 보이게 할건가 ?
export function MemberList() {
  return (
    <Box display={"flex"}>
      <SideBar />
      <ContentBox />
      <MemberAdd />
    </Box>
  );
}
