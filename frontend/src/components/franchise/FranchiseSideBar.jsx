import { Box, Heading, Stack } from "@chakra-ui/react";

export function FranchiseSideBar({ onSelect }) {
  return (
    <Box h={"100%"} bg={"blackAlpha.300"}>
      <Stack>
        <Heading> 가맹점 관리 </Heading>
        <Box
          onClick={() => {
            onSelect("list");
          }}
        >
          가맹점 조회
        </Box>
        <Box
          onClick={() => {
            onSelect("add");
          }}
        >
          가맹점 등록
        </Box>
      </Stack>
    </Box>
  );
}
