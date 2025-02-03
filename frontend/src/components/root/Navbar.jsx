import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { useNavigate } from "react-router-dom";
import MemberInfo from "../../page/memberInfo/MemberInfo.jsx";

function NavItem({ children, path, textColor, ...rest }) {
  const navigate = useNavigate();

  return (
    <Box
      h={"40px"}
      w={{ base: "90px", sm: "110px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{ cursor: "pointer", bgColor: "whiteAlpha.700" }}
      onClick={() => path && navigate(path)}
      {...rest}
    >
      <Text fontWeight={"bold"} color={textColor} whiteSpace={"nowrap"}>
        {children}
      </Text>
    </Box>
  );
}

export function Navbar() {
  const { id, isAuthenticated, logout, name } = useContext(
    AuthenticationContext,
  );

  const navigate = useNavigate();

  return (
    <Box>
      <Flex gap={5} mt={3} mb={2} w={"98%"} mx={"auto"}>
        <Heading
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Choongang System
        </Heading>
        <Spacer />
        {isAuthenticated && <MemberInfo />}

        {isAuthenticated && (
          <NavItem
            textColor="gray.700"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            로그아웃
          </NavItem>
        )}
      </Flex>
      <Flex bgColor={"#4374D9"} width="100%" gap={10} p={2} pl={3}>
        <NavItem
          path="/business"
          textColor="white"
          _hover={{
            bgColor: "#1F50B5",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          기준정보 관리
        </NavItem>
        <NavItem
          path="/purchase"
          textColor="white"
          _hover={{
            bgColor: "#1F50B5",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          구매/설치 관리
        </NavItem>
        <NavItem
          path="/inoutHistory"
          textColor="white"
          _hover={{
            bgColor: "#1F50B5",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          물류 관리
        </NavItem>
      </Flex>
    </Box>
  );
}
