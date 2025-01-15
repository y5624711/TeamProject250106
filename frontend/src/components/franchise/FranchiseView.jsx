import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

export function FranchiseView({ franchiseKey }) {
  const [franchise, setFranchise] = useState(null);

  useEffect(() => {
    const franchiseData = () => {
      axios
        .get(`/api/franchise/view/${franchiseKey}`)
        .then((response) => {
          setFranchise(response.data);
        })
        .catch((error) => {
          console.error("가맹점 데이터를 가져오는 데 실패했습니다:", error);
        });
    };

    if (franchiseKey) {
      franchiseData();
    }
  }, [franchiseKey]);

  if (!franchise) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box>
      <Heading size="lg" mb={4}>
        가맹점 상세 정보
      </Heading>
      <Text fontWeight="bold">
        본사 직원 사번: {franchise.businessEmployeeNo}
      </Text>
      <Text>가맹점명: {franchise.franchiseName}</Text>
      <Text>가맹점 코드: {franchise.franchiseCode}</Text>
      <Text>가맹점주: {franchise.franchiseRep}</Text>
      <Text>사업자 번호: {franchise.franchiseNo}</Text>
      <Text>전화번호: {franchise.franchiseTel}</Text>
      <Text>주소: {franchise.franchiseAddress}</Text>
      <Text>상세 주소: {franchise.franchiseAddressDetail}</Text>
      <Text>우편 번호: {franchise.franchisePost}</Text>
      <Text>광역시도: {franchise.franchiseState}</Text>
      <Text>시군: {franchise.franchiseCity}</Text>
      <Text>사용 여부: {franchise.franchiseActive ? "활성" : "비활성"}</Text>
      <Text>비고: {franchise.franchiseNote}</Text>
    </Box>
  );
}
