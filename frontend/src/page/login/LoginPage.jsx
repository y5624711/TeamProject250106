import { Box, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import { toaster } from "../../components/ui/toaster.jsx";
import { Field } from "../../components/ui/field.jsx";
import { PasswordInput } from "../../components/ui/password-input.jsx";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";

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
  }, [isAuthenticated]);

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
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <Box
          w="900px"
          h="550px"
          bg="white"
          display="flex"
          flexDirection="row"
          alignItems="center"
          boxShadow="2xl"
        >
          {/* 왼쪽: 이미지 (반을 꽉 채우도록 설정) */}
          <Box w="50%" h="100%">
            <Image
              src="/Login.png"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
          {/* 오른쪽: 입력 필드 */}
          <Box
            w="50%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text fontSize={"30px"} fontWeight={"bold"} mb={10}>
              Choongang System
            </Text>
            <Stack gap={7} w="300px">
              <Field>
                <Input
                  placeholder="아이디"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </Field>
              <Field>
                <PasswordInput
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLoginClick()}
                />
              </Field>
              <Button
                w="50%"
                mx="auto"
                bg="#0000FF"
                color="white"
                _hover={{ bg: "#0000CC" }}
                onClick={handleLoginClick}
              >
                로그인
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
