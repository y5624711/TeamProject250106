import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { toaster } from "../../components/ui/toaster.jsx";
import { Field } from "../../components/ui/field.jsx";
import { useNavigate } from "react-router-dom";
import { LoginCheck } from "../main/LoginCheck.jsx";

export function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const authentication = useContext(AuthenticationContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  // isAuthenticated가 true인 경우 메인 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
        navigate("/");
        authentication.login(data.token, data.name);
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
      <LoginCheck />
      <Box textAlign="center">
        <Text pb={5} fontSize={"30px"} fontWeight={"bold"}>
          Choongang System
        </Text>
        <Box
          w="500px"
          h="400px"
          border="1px solid black"
          bg="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center" // 가운데 정렬
        >
          <Stack gap={10} w={"300px"}>
            <Field
              label={"로그인"}
              whiteSpace={"nowrap"}
              orientation="horizontal"
            >
              <Input value={id} onChange={(e) => setId(e.target.value)} />
            </Field>

            <Field
              label={"비밀번호"}
              whiteSpace={"nowrap"}
              orientation="horizontal"
            >
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Button w={"50%"} mx={"auto"} onClick={handleLoginClick}>
              로그인
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
