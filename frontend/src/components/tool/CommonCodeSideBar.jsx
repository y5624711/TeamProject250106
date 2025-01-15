import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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

export function CommonCodeSideBar() {
  return (
    <Flex>
      {/*SideBar 영역*/}
      <Box
        w="300px"
        pb="4"
        bg="gray.100"
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
            코드 관리
          </Text>
        </Box>

        <Stack spacing="2" mt="4">
          <Heading>공통 코드 조회</Heading>
          <SidebarItem path="/commonCode/item/list">품목 코드</SidebarItem>
          <SidebarItem path="/commonCode/system/list">업무 코드</SidebarItem>
          <Heading>공통 코드 등록</Heading>
          <SidebarItem path="/commonCode/item/add">품목 코드</SidebarItem>
          <SidebarItem path="/commonCode/system/add">업무 코드</SidebarItem>
        </Stack>
      </Box>
    </Flex>
  );
}
