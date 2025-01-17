import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export function LoginPage() {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w={"600px"} h={"600px"} border={"1px solid black"}>
        <Heading> 로그인 페이지 </Heading>
      </Box>
    </Box>
  );
}
