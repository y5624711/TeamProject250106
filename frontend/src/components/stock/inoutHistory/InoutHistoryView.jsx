import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
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
      입출번호
      <Input value={inoutHistoryDetail.inoutHistoryKey} readOnly />
      {inoutHistoryDetail.inoutCommonCode === "in" ? (
        <Box>
          입출 구분
          <Input value="입고" readOnly />
        </Box>
      ) : (
        <Box>
          입출 구분
          <Input value="출고" readOnly />
        </Box>
      )}
      시리얼
      <Input value={inoutHistoryDetail.serialNo} readOnly />
      창고 코드
      <Input value={inoutHistoryDetail.warehouseCode} readOnly />
      본사직원 사번
      <Input value={inoutHistoryDetail.businessEmployeeNo} readOnly />
      협력업체 직원 사번
      <Input value={inoutHistoryDetail.customerEmployeeNo} readOnly />
      가맹점 코드
      <Input value={inoutHistoryDetail.franchiseCode} readOnly />
      로케이션
      <Input value={inoutHistoryDetail.locationKey} readOnly />
      날짜
      <Input value={inoutHistoryDetail.inoutHistoryDate} readOnly />
      비고
      <Input value={inoutHistoryDetail.inoutHistoryNote} readOnly />
    </Box>
  );
}

export default InoutHistoryView;
