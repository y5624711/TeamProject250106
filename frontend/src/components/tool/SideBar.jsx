import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

export function SideBar() {
  const [isCommonCodeOpen, setIsCommonCodeOpen] = useState(false);
  const toggleCommonCodeMenu = () => {
    setIsCommonCodeOpen((prev) => !prev); // 공통 코드 클릭 시 하위 메뉴 토글
  };
  return (
    <Flex>
      {/*SideBar 영역*/}
      <Box
        w="300px"
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
          <Text fontWeight="bold" color={"white"} fontSize={"25px"}>
            기준정보 관리
          </Text>
        </Box>

        <Stack spacing="2" mt="4">
          <SidebarItem path="/business">사업장/부서 관리</SidebarItem>
          <SidebarItem path="/employee">인사 관리</SidebarItem>
          <SidebarItem path="/franchise">가맹점 관리</SidebarItem>
          <SidebarItem path="/customer">협력업체 관리</SidebarItem>
          <SidebarItem path="/item">품목 관리</SidebarItem>
          <SidebarItem path="/warehouse">창고 관리</SidebarItem>
          <SidebarItem path="/location">로케이션 관리</SidebarItem>
          <SidebarItem onClick={toggleCommonCodeMenu}>
            {isCommonCodeOpen ? "공통코드 관리   ▼" : "공통코드 관리"}
          </SidebarItem>
          {isCommonCodeOpen && (
            <>
              <SidebarItem path="/commonCode/system">업무 코드</SidebarItem>
              <SidebarItem path="/commonCode/item">품목 코드</SidebarItem>
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
}
