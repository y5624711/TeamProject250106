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

export function StockSideBar() {
  return (
    <Flex>
      {/*StandardSideBar 영역*/}
      <Box
        w="220px"
        pb="4"
        bg="gray.100"
        h={"100vh"} // <  화면 길이 계산해서 100%
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
          <SidebarItem path="/storageRetrieval">물품입출내역</SidebarItem>
          <SidebarItem path="/stockTaking">재고 실사</SidebarItem>
          <SidebarItem path="/warehouseStatus">위치별 재고 현황</SidebarItem>
        </Stack>
      </Box>
    </Flex>
  );
}
