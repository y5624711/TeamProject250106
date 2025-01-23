import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, HStack, Input, Stack } from "@chakra-ui/react";

function StockTakingView({ stocktakingKey }) {
  const [stocktakingDetail, setStocktakingDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/stocktaking/view/${stocktakingKey}`)
      .then((res) => {
        setStocktakingDetail(res.data);
      })
      .catch((error) => {
        console.error("창고 상세 정보 요청 중 오류 발생: ", error);
      });
  }, []);

  // size 로 키워서 예쁘게 보기
  return (
    <Box>
      <Center>
        <Stack gap={4}>
          <HStack>
            <Stack w={370}>
              창고
              <Input value={stocktakingDetail.warehouseName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              로케이션
              <Input value={stocktakingDetail.location} />
            </Stack>
          </HStack>

          <HStack>
            <Stack w={370}>
              품목명
              <Input value={stocktakingDetail.itemName} readOnly />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              담당 업체
              <Input value={stocktakingDetail.customerName} readOnly />
            </Stack>
          </HStack>

          <HStack>
            <Stack w={370}>
              전산 수량
              <Input value={stocktakingDetail.countCurrent} />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              실제 수량
              <Input value={stocktakingDetail.countConfiguration} />
            </Stack>
          </HStack>

          <HStack>
            <Stack w={370}>
              담당자
              <Input value={stocktakingDetail.customerEmployeeName} />
            </Stack>
            <Box w={10} />
            <Stack w={370}>
              사번
              <Input value={stocktakingDetail.customerEmployeeNo} />
            </Stack>
          </HStack>
          <Box w={795}>
            실사 날짜
            <Input value={stocktakingDetail.stocktakingDate} />
          </Box>
          <Box w={795}>
            비고
            <Input value={stocktakingDetail.stocktakingNote} />
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}

export default StockTakingView;
