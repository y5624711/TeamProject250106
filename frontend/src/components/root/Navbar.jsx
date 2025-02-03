import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import { useNavigate } from "react-router-dom";
import MemberInfo from "../../page/memberInfo/MemberInfo.jsx";

function NavItem({ children, path }) {
  const navigate = useNavigate();

  return (
    <Box
      h="40px"
      w={{ base: "90px", sm: "110px" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="white"
      whiteSpace="nowrap"
      _hover={{ bgColor: "#015791", borderRadius: "12px", cursor: "pointer" }}
      onClick={() => path && navigate(path)}
    >
      <Text fontWeight="bold">{children}</Text>
    </Box>
  );
}

export function Navbar() {
  const { id, isAuthenticated, logout, isAdmin } = useContext(
    AuthenticationContext,
  );

  const navigate = useNavigate();

  const menuItems = [
    { label: "기준정보 관리", path: "/business" },
    { label: "구매/설치 관리", path: "/purchase" },
    { label: "물류 관리", path: "/inoutHistory" },
  ];

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
        {isAuthenticated && (
          <Flex alignItems="center">
            <MemberInfo />
            <Heading
              fontSize="sm"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              로그아웃
            </Heading>
          </Flex>
        )}
      </Flex>
      <Flex bgColor="#003B63" width="100%" gap={10} p={2} pl={3}>
        {menuItems.map(({ label, path }) => (
          <NavItem key={path} path={path}>
            {label}
          </NavItem>
        ))}
      </Flex>
    </Box>
  );
}
