import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { useNavigate } from "react-router-dom";

function NavItem({ children, path, ...rest }) {
  const navigate = useNavigate();

  return (
    <Box
      h={"40px"}
      w={{ base: "90px", sm: "110px" }} // 반응형: 작은 화면에서는 더 좁게
      display="flex" // Flexbox 활성화
      justifyContent="center" // 가로 방향 가운데 정렬
      alignItems="center" // 세로 방향 가운데 정렬
      _hover={{ cursor: "pointer", bgColor: "whiteAlpha.700" }}
      onClick={() => path && navigate(path)}
      {...rest}
    >
      <Text fontWeight={"bold"} color={"gray.700"} whiteSpace={"nowrap"}>
        {children}
      </Text>
    </Box>
  );
}

export function Navbar() {
  const { id, isAuthenticated, logout } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  return (
    <Box>
      <Flex gap={5} pt={5} w={"80%"} mx={"auto"}>
        <Heading>Choongang System</Heading>
        <Spacer />
        <Text>유저 아이디</Text>
        <Text>로그아웃</Text>
      </Flex>
      <Flex bgColor={"lightSlateGray"} width="100%" justify="center" gap={10}>
        <NavItem path="/business">기준정보 관리</NavItem>
        <NavItem>구매/설치 관리</NavItem>
        <NavItem>물류 관리</NavItem>
      </Flex>
    </Box>
  );
}
