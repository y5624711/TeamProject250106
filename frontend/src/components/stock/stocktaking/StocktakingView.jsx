import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";

function StocktakingView({ stocktakingKey }) {
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
      <Field label="창고" orientation="horizontal" mb={15}>
        <Input value={stocktakingDetail.warehouseName} readOnly />
      </Field>

      <Box display="flex" gap={4}>
        <Field label="품목" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.itemName} readOnly />
        </Field>
        <Field label="담당 업체" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.customerName} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="전산 수량" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.countCurrent} readOnly />
        </Field>
        <Field label="실제 수량" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.countConfiguration} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="담당자" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.customerEmployeeName} readOnly />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={stocktakingDetail.customerEmployeeNo} readOnly />
        </Field>
      </Box>
      <Field label="실사 유형" orientation="horizontal" mb={15}>
        <Input
          value={
            stocktakingDetail.stocktakingType === false
              ? "비정기 실사"
              : "정기 실사"
          }
          readOnly
        />
      </Field>
      <Field label="실사 날짜" orientation="horizontal" mb={15}>
        <Input
          value={stocktakingDetail.stocktakingDate?.slice(0, 10) || ""}
          readOnly
        />
      </Field>
      <Field label="비고" orientation="horizontal" mb={15}>
        <Textarea
          style={{ maxHeight: "100px", overflowY: "auto" }}
          value={stocktakingDetail.stocktakingNote}
          readOnly
        />
      </Field>
    </Box>
  );
}

export default StocktakingView;
