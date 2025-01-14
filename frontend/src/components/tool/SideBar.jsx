import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SideBar() {
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
            기준정보 관리
          </Text>
        </Box>

        <Stack spacing="2">
          <Text>사업장/부서 관리</Text>
          <Text>인사 관리</Text>
          <Text>가맹점 관리</Text>
          <Text>협력업체 관리</Text>
          <Text
            onClick={() => navigate("/item")}
            _hover={{ cursor: "pointer" }}
          >
            품목 관리
          </Text>
          <Text>창고 관리</Text>
          <Text>로케이션 관리</Text>
        </Stack>
      </Box>
    </Flex>
  );
}
