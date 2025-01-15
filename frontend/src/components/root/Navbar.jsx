import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { useNavigate } from "react-router-dom";

function NavItem({ children, ...rest }) {
  return (
    <Box
      h={"40px"}
      w={{ base: "90px", sm: "110px" }} // 반응형: 작은 화면에서는 더 좁게
      display="flex" // Flexbox 활성화
      justifyContent="center" // 가로 방향 가운데 정렬
      alignItems="center" // 세로 방향 가운데 정렬
      _hover={{ cursor: "pointer", bgColor: "whiteAlpha.700" }}
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
        <Heading>타이틀</Heading>
        <Spacer />
        <Text>유저 아이디</Text>
        <Text>로그아웃</Text>
      </Flex>
      <Flex
        mb={-2}
        bgColor={"lightSlateGray"}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // 줄바꿈 활성화
        overflow="hidden" // 넘치는 요소를 숨김
      >
        <NavItem>가맹점 관리</NavItem>
        <NavItem>협력업체 관리</NavItem>
        <NavItem onClick={() => navigate("/item")}>물품 관리</NavItem>
        <NavItem>자산 관리</NavItem>
        <NavItem onClick={() => navigate("/commonCode")}>공통코드</NavItem>
        <NavItem onClick={() => navigate("/employee")}>인사관리</NavItem>
        <NavItem>회원관리</NavItem>
      </Flex>
    </Box>
  );
}
