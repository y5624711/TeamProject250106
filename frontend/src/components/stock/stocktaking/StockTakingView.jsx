import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Input, Stack } from "@chakra-ui/react";

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

  // size로 키워서 예쁘게 보기
  return (
    <Box>
      <Stack>
        재고 실사 번호
        <Input value={stocktakingDetail.stocktakingKey} readOnly />
        창고명
        <Input value={stocktakingDetail.warehouseName} readOnly />
        창고 코드
        <Input value={stocktakingDetail.warehouseCode} readOnly />
        품목명
        <Input value={stocktakingDetail.itemName} readOnly />
        품목 코드
        <Input value={stocktakingDetail.itemCode} readOnly />
        재고 실사 번호
        <Input value={stocktakingDetail.stocktakingKey} readOnly />
        재고 실사 번호
        <Input value={stocktakingDetail.stocktakingKey} readOnly />
        재고 실사 번호
        <Input value={stocktakingDetail.stocktakingKey} readOnly />
      </Stack>
    </Box>
  );
}

export default StockTakingView;
