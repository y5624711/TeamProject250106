import { Flex, Spinner, Stack } from "@chakra-ui/react";
import { MainInstallList } from "../../components/standard/main/MainInstallList.jsx";
import { MainInstkList } from "../../components/standard/main/MainInstkList.jsx";
import { MainBuyList } from "../../components/standard/main/MainBuyList.jsx";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { MainLeftInfoBox } from "../../components/standard/main/MainLeftInfoBox.jsx";

export function Main() {
  const { company, isAdmin, userScope } = useContext(AuthenticationContext);
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
    <Flex w="100%" p={4} mt={6} justify="center" align="center" mx={"auto"}>
      <Flex w="90%" justify="center" gap={20}>
        {/* 왼쪽 박스 */}
        <MainLeftInfoBox
          user={user}
          companyStatus={companyStatus}
          isAdmin={isAdmin}
          company={company}
        />

        {/* 메인 컨텐츠 리스트 */}
        <Stack w="100%">
          {/* 구매 리스트 */}
          <MainBuyList company={company} scope={userScope} />
          {/* 입고 리스트 */}
          <MainInstkList company={company} scope={userScope} />
          {/* 설치 리스트 */}
          <MainInstallList company={company} scope={userScope} />
        </Stack>
      </Flex>
    </Flex>
  );
}
