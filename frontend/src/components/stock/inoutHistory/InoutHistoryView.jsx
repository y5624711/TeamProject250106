import React, { useEffect, useState } from "react";
import { Box, Center, HStack, Input, Stack } from "@chakra-ui/react";
import axios from "axios";

function InoutHistoryView({ inoutHistoryKey }) {
  const [inoutHistoryDetail, setInoutHistoryDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/inoutHistory/view/${inoutHistoryKey}`)
      .then((res) => {
        setInoutHistoryDetail(res.data);
      })
      .catch((error) => {
        console.error("창고 상세 정보 요청 중 오류 발생: ", error);
      });
  }, []);

  return (
    <Box>
      <Center>
        <Stack gap={4}>
          {inoutHistoryDetail.inoutCommonCode === "in" ||
          inoutHistoryDetail.inoutCommonCode === "IN" ? (
            <Box w={795}>
              입출 구분
              <Input value="입고" readOnly />
            </Box>
          ) : (
            <Box w={795}>
              입출 구분
              <Input value="출고" readOnly />
            </Box>
          )}
          <HStack>
            <Stack w={370}>
              품목
              <Input value={inoutHistoryDetail.itemName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              시리얼
              <Input value={inoutHistoryDetail.serialNo} readOnly />
            </Stack>
          </HStack>
          <HStack>
            <Stack w={370}>
              창고
              <Input value={inoutHistoryDetail.warehouseName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              창고 주소
              <Input value={inoutHistoryDetail.warehouse_address} />
            </Stack>
          </HStack>
          {inoutHistoryDetail.inoutCommonCode === "in" ? (
            <Box w={795}>
              로케이션
              <Input value={inoutHistoryDetail.locationKey} readOnly />
            </Box>
          ) : (
            <Box w={795}>
              가맹점
              <Input value={inoutHistoryDetail.franchiseName} readOnly />
            </Box>
          )}
          <HStack>
            <Stack w={370}>
              본사직원
              <Input value={inoutHistoryDetail.businessEmployeeName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              사번
              <Input value={inoutHistoryDetail.businessEmployeeNo} readOnly />
            </Stack>
          </HStack>
          <HStack>
            <Stack w={370}>
              협력 업체 직원
              <Input value={inoutHistoryDetail.customerEmployeeName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              사번
              <Input value={inoutHistoryDetail.customerEmployeeNo} readOnly />
            </Stack>
          </HStack>
          <Box w={795}>
            날짜
            <Input value={inoutHistoryDetail.inoutHistoryDate} readOnly />
          </Box>
          <Box w={795}>
            비고
            <Input value={inoutHistoryDetail.inoutHistoryNote} readOnly />
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}

export default InoutHistoryView;
