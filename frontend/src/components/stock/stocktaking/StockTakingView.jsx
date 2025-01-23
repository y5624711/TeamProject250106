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

  // size 로 키워서 예쁘게 보기
  return (
    <Box>
      <Stack>
        재고 실사 번호
        <Input value={stocktakingDetail.stocktakingKey} readOnly />
        창고명
        <Input value={stocktakingDetail.warehouseName} readOnly />
        창고 코드
        <Input value={stocktakingDetail.warehouseCode} readOnly />
        로케이션
        <Input value={stocktakingDetail.location} readOnly />
        품목명
        <Input value={stocktakingDetail.itemName} readOnly />
        품목 코드
        <Input value={stocktakingDetail.itemCode} readOnly />
        전산 수량
        <Input value={stocktakingDetail.countCurrent} />
        실제 수량
        <Input value={stocktakingDetail.countConfiguration} />
        협력업체
        <Input value={stocktakingDetail.customerName} />
        협력업체 코드
        <Input value={stocktakingDetail.customerCode} />
        업체 전화번호
        <Input value={stocktakingDetail.customerTel} />
        협력업체 직원
        <Input value={stocktakingDetail.customerEmployeeName} />
        협력업체 직원 사번
        <Input value={stocktakingDetail.customerEmployeeNo} />
        직원 전화번호
        <Input value={stocktakingDetail.employeeTel} />
        확인 날짜
        <Input value={stocktakingDetail.stocktakingDate} />
        비고
        <Input value={stocktakingDetail.stocktakingNote} />
      </Stack>
    </Box>
  );
}

export default StockTakingView;
