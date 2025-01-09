import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";

function NavItem({ children, ...rest }) {
  return (
    <Box h={"30px"} w={"110px"} placeItems={"center"} {...rest}>
      {children}
    </Box>
  );
}

function TextItem({ children, ...rest }) {
  return (
    <Text
      fontWeight={"bold"}
      color={"gray.700"}
      {...rest}
      _hover={{ color: "black", cursor: "pointer" }}
    >
      {children}
    </Text>
  );
}

export function Navbar() {
  const { id, isAuthenticated, logout } = useContext(AuthenticationContext);

  return (
    <Box>
      <Flex gap={5} pt={5} w={"80%"} mx={"auto"}>
        <Heading>타이틀</Heading>
        <Spacer />
        <Heading>유저 아이디</Heading>
        <Heading>로그아웃</Heading>
      </Flex>
      <Flex
        bgColor={"blue.500"}
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <NavItem>
          <TextItem>가맹점 관리</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>협력업체 관리</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>물품 관리</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>설치 관리</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>공통코드</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>조회</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>인사관리</TextItem>
        </NavItem>
        <NavItem>
          <TextItem>회원관리</TextItem>
        </NavItem>
      </Flex>
    </Box>
  );
}
