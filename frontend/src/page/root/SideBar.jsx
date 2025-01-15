import { Box, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar 항목을 경로별로 정의
  const sidebarTitleItem = {
    "/commonCode": [{ title: "공통코드" }],
    "/item": [{ title: "없음" }],
  };

  const sidebarItemsByPath = {
    "/commonCode": [
      { label: "공통 코드 목록", path: "/commonCode/list" },
      { label: "공통 코드 등록", path: "/commonCode/add" },
    ],
    "/item": [
      { label: "다른 메뉴 1", path: "/otherPage/menu1" },
      { label: "다른 메뉴 2", path: "/otherPage/menu2" },
    ],
  };

  // 현재 경로의 루트 경로를 찾음
  const basePath = Object.keys(sidebarItemsByPath).find((path) =>
    location.pathname.startsWith(path),
  );
  const titleBasePath = Object.keys(sidebarTitleItem).find((path) =>
    location.pathname.startsWith(path),
  );

  const menuItems = basePath ? sidebarItemsByPath[basePath] : [];
  const titleItems = titleBasePath ? sidebarTitleItem[titleBasePath] : [];

  return (
    <Box
      w="300px"
      pb="4"
      bg="gray.100"
      borderRight="1px solid"
      borderColor="gray.200"
    >
      <Stack>
        {titleItems.map((item, index) => (
          <Box
            bgColor={"steelBlue"}
            h={"70px"}
            display="flex" // Flexbox 사용
            justifyContent="center" // 가로 방향 가운데 정렬
            alignItems="center" // 세로 방향 가운데 정렬
            key={`title-${index}`}
          >
            <Text fontWeight="bold" color={"white"} fontSize={"25px"}>
              {item.title}
            </Text>
          </Box>
        ))}

        {menuItems.map((item, index) => (
          <Box pb={2} pt={4} key={`menu-${index}`}>
            <Text
              onClick={() => navigate(item.path)}
              _hover={{ cursor: "pointer" }}
            >
              {item.label}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
