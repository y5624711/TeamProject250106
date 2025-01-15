import { Box, Heading, Stack } from "@chakra-ui/react";

export function FranchiseSideBar() {
  return (
    <Box h={"100%"} bg={"blackAlpha.300"} p={4} minW={"200px"}>
      <Stack spacing={4}>
        <Heading size="md">가맹점 관리</Heading>
      </Stack>
    </Box>
  );
}
