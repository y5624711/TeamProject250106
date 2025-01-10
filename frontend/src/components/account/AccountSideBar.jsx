import { Box, Heading, Stack } from "@chakra-ui/react";

export function AccountSideBar({ onSelect }) {
  console.log(onSelect);
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 회원 관리 </Heading>
        <Box
          onClick={() => {
            onSelect("list");
          }}
        >
          회원 조회
        </Box>
        <Box
          onClick={() => {
            onSelect("add");
          }}
        >
          회원 등록
        </Box>
      </Stack>
    </Box>
  );
}
