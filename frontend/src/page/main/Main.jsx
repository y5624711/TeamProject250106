import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MainInstallList } from "../../components/standard/main/MainInstallList.jsx";
import { MainInstkList } from "../../components/standard/main/MainInstkList.jsx";
import { MainBuyList } from "../../components/standard/main/MainBuyList.jsx";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";

export function Main() {
  const { company, isAdmin } = useContext(AuthenticationContext);
  const [user, setUser] = useState({});
  const [companyStatus, setCompanyStatus] = useState({});
  useEffect(() => {
    axios
      .get("api/main/boardMain")
      .then((res) => res.data)
      .then((data) => {
        setUser(data.id);
        setCompanyStatus(data.companyStatus);
      });
  }, []);

  if (!company) {
    return <Spinner />;
  }

  return (
    <Flex w="100%" p={6} justify="center" align="center">
      <Flex w="100%" justify="center" gap={20}>
        {/* 왼쪽 박스 */}
        <Box
          position="relative"
          minW="400px"
          h="600px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mt={3}
        >
          {/* 배경 이미지 */}
          <Image
            src="/mainInfo.jpg"
            alt="background"
            objectFit="cover"
            w="100%"
            h="100%"
            position="absolute"
            opacity="0.5"
            zIndex="-1"
            filter="brightness(80%) contrast(120%) sepia(20%)" // ✅ 색상 조절
          />

          {/* 텍스트 박스 */}
          <Box position="relative" color="black" fontWeight="bold">
            <Stack spacing={4} align="center">
              {isAdmin ? (
                <>
                  <Heading fontSize="40px">
                    {companyStatus.businessName || ""}
                  </Heading>
                  <Text fontSize="16px">
                    {companyStatus.businessAddress || ""}
                  </Text>
                </>
              ) : (
                <>
                  <Heading fontSize="40px">
                    {companyStatus.customerName || ""}
                  </Heading>
                  <Text fontSize="16px">
                    {companyStatus.customerAddress || ""}{" "}
                    {companyStatus.customerAddressDetails || ""}
                  </Text>
                </>
              )}
            </Stack>

            <Stack justify="center" align="center" mt={6}>
              <Text fontSize="25px">{user.employeeName} 님 환영합니다</Text>
              <Text fontSize="16px">No. {user.employeeNo}</Text>
              <Text fontSize="16px">Tel. {user.employeeTel}</Text>
            </Stack>
          </Box>
        </Box>

        {/* 메인 컨텐츠 리스트 */}
        <Stack w="100%">
          {/* 구매 리스트 */}
          <MainBuyList company={company} />
          {/* 입고 리스트 */}
          <MainInstkList company={company} />
          {/* 설치 리스트 */}
          <MainInstallList company={company} />
        </Stack>
        <Box
          position="relative"
          minW="400px"
          h="600px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mt={3}
        >
          {/* 배경 이미지 */}
          <Image
            src="/main2.jpg"
            alt="background"
            objectFit="cover"
            w="100%"
            h="100%"
            position="absolute"
            opacity="0.4"
            zIndex="-1"
            filter="brightness(60%) contrast(120%) sepia(10%)"
          />
        </Box>
      </Flex>
    </Flex>
  );
}
