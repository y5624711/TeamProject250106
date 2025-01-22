import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function SidebarItem({ children, path, ...rest }) {
  const navigate = useNavigate();

  return (
    <Box
      h="40px"
      display="flex"
      alignItems="center"
      px="4"
      _hover={{ bgColor: "gray.200", cursor: "pointer" }}
      onClick={() => path && navigate(path)}
      {...rest}
    >
      <Text fontWeight="medium" color="gray.700">
        {children}
      </Text>
    </Box>
  );
}

export function StateSideBar() {
  return (
    <Flex>
      <Box
        w="230px"
        pb="4"
        bg="gray.100"
        h={"100vh"}
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Box
          bgColor={"steelBlue"}
          h={"70px"}
          display="flex"
          justifyContent="center" // 가로 방향 가운데 정렬
          alignItems="center" // 세로 방향 가운데 정렬
        >
          <Text fontWeight="bold" color={"white"} fontSize={"25px"}>
            구매 / 설치 관리
          </Text>
        </Box>

        <Stack spacing="2" mt="4" alignItems="center">
          <SidebarItem path="/purchase">구매 관리</SidebarItem>
          <SidebarItem path="/instk">입고 관리</SidebarItem>
          <SidebarItem path="/install">설치 관리</SidebarItem>
          <SidebarItem path="/return">반품/회수 관리</SidebarItem>
        </Stack>
      </Box>
    </Flex>
  );
}
