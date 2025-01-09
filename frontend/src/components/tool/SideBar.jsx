import { useNavigate } from "react-router-dom";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export function SideBar({ title, items, children }) {
  const navigate = useNavigate();
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
          {items.map((item, index) => (
            <Box pb={2} pt={4}>
              <Text
                key={index}
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
