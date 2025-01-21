import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { toaster } from "../../components/ui/toaster.jsx";

export function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const authentication = useContext(AuthenticationContext);

  function handleLoginClick() {
    axios
      .post("/api/login/siteIn", {
        employeeNo: id,
        employeePassword: password,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        authentication.login(data.token);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.100" // 배경색 추가 (선택 사항)
    >
      <Box textAlign="center">
        <Text pb={5} fontSize={"30px"} fontWeight={"bold"}>
          Choongang System
        </Text>
        <Stack
          w="500px"
          h="400px"
          border="1px solid black"
          p={8}
          bg="white"
          gap={10}
        >
          <Text fontSize={"25px"}>로그인</Text>
          <Flex whiteSpace={"nowrap"} gap={10}>
            <Text w={"50px"}>아이디</Text>
            <Input value={id} onChange={(e) => setId(e.target.value)} />
          </Flex>

          <Flex whiteSpace={"nowrap"} gap={10}>
            <Text w={"50px"}>비밀번호</Text>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Flex>
          <Button w={"50%"} mx={"auto"} onClick={handleLoginClick}>
            로그인
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
