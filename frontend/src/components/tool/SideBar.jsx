import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export function SideBar({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar 항목을 경로별로 정의
  const sidebarItemsByPath = {
    "/commonCode": [
      { label: "공통 코드 목록", path: "/commonCode/" },
      { label: "공통 코드 등록", path: "/commonCode/add" },
    ],
    "/otherPage": [
      { label: "다른 메뉴 1", path: "/otherPage/menu1" },
      { label: "다른 메뉴 2", path: "/otherPage/menu2" },
    ],
  };

  // 현재 경로에 맞는 Sidebar 항목 선택
  const currentPath = location.pathname.split("/")[1] || "/";
  console.log(currentPath);
  const sidebarItems =
    sidebarItemsByPath[`/${currentPath}`] || sidebarItemsByPath["/"];

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
          display="flex" // Flexbox 사용
          justifyContent="center" // 가로 방향 가운데 정렬
          alignItems="center" // 세로 방향 가운데 정렬
        >
          <Text fontWeight="bold" color={"white"} fontSize={"25px"}>
            {title}
          </Text>
        </Box>

        <Stack spacing="2">
          {sidebarItems.map((item, index) => (
            <Box pb={2} pt={4} key={index}>
              <Text
                as="button"
                onClick={() => navigate(item.path)}
                _hover={{ cursor: "pointer" }}
                textAlign="left"
              >
                {item.label}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>

      {/*메인 컨텐츠 영역*/}
      <Box flex="1" p={4}>
        {children}
      </Box>
    </Flex>
  );
}
