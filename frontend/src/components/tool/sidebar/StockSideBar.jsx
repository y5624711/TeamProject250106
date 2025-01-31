import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function SidebarItem({ children, path, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      h="40px"
      display="flex"
      alignItems="center"
      px="4"
      _hover={{ bgColor: "gray.200", cursor: "pointer" }}
      onClick={() => path && navigate(path)}
      bg={location.pathname === path ? "gray.200" : "transparent"} // 현재 경로와 일치하면 배경색 변경
      {...rest}
    >
      <Text fontWeight="medium" color="gray.700">
        {children}
      </Text>
    </Box>
  );
}

export function StockSideBar() {
  return (
    <Flex>
      <Box
        w="220px"
        pb="4"
        bg="gray.100"
        h={"80vh"} // 화면 길이 계산해서 80%
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
          <Text fontWeight="bold" color={"white"} fontSize={"22px"}>
            물류 관리
          </Text>
        </Box>
        <Stack spacing="2" mt="4">
          <SidebarItem path="/inoutHistory">물품 입출내역</SidebarItem>
          <SidebarItem path="/stocktaking">재고 실사</SidebarItem>
          <SidebarItem path="/warehouseStatus">위치별 재고 현황</SidebarItem>
        </Stack>
      </Box>
    </Flex>
  );
}
