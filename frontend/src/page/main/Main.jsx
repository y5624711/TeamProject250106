import {
  Box,
  Flex,
  Heading,
  Separator,
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
        <Box bg="gray.100" w={"300px"} whiteSpace={"nowrap"} p={"10"}>
          <Stack gap={6} justify="center" align="center">
            {isAdmin ? (
              <>
                <Heading fontSize={"40px"}>
                  {companyStatus.businessName || ""}
                </Heading>
                <Text fontSize={"16px"}>
                  {companyStatus.businessAddress || ""}{" "}
                </Text>
              </>
            ) : (
              <>
                <Heading fontSize={"40px"}>
                  {companyStatus.customerName || ""}
                </Heading>
                <Text fontSize={"16px"}>
                  {companyStatus.customerAddress || ""}{" "}
                  {companyStatus.customerAddressDetails || ""}
                </Text>
              </>
            )}
          </Stack>
          <Separator size="lg" mt={5} mb={5} />
          <Stack justify="center" align="center">
            <Text fontSize={"22px"}>{user.employeeName} 님 환영합니다</Text>
            <Text fontSize={"16px"}>No. {user.employeeNo}</Text>
            <Text fontSize={"16px"}>Tel. {user.employeeTel}</Text>
          </Stack>
        </Box>

        {/* 메인 컨텐츠 리스트 */}
        <Stack w="100%" gap={7}>
          {/* 구매 리스트 */}
          <MainBuyList company={company} />
          {/* 입고 리스트 */}
          <MainInstkList company={company} />
          {/* 설치 리스트 */}
          <MainInstallList company={company} />
        </Stack>
        <Box w={"300px"} p={"10"} />
      </Flex>
    </Flex>
  );
}
