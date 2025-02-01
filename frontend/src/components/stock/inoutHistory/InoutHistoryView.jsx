import React, { useEffect, useState } from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../ui/field.jsx";

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
      {inoutHistoryDetail.inoutCommonCode === "OUT" ? (
        <Field label="입출 구분" orientation="horizontal" mb={15}>
          <Input value="출고" readOnly />
        </Field>
      ) : inoutHistoryDetail.inoutCommonCode === "RETRN" ? (
        <Field label="입출 구분" orientation="horizontal" mb={15}>
          <Input value="회수 입고" readOnly />
        </Field>
      ) : (
        <Field label="입출 구분" orientation="horizontal" mb={15}>
          <Input value="일반 입고" readOnly />
        </Field>
      )}
      <Box display="flex" gap={4}>
        <Field label="품목" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.itemName} readOnly />
        </Field>
        <Field label="시리얼" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.serialNo} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="창고" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.warehouseName} readOnly />
        </Field>
        <Field label="창고 주소" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.warehouseAddress} readOnly />
        </Field>
      </Box>
      {inoutHistoryDetail.inoutCommonCode === "INSTL" ? (
        <Field label="가맹점" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.franchiseName} readOnly />
        </Field>
      ) : (
        <Field label="로케이션" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.locationKey} readOnly />
        </Field>
      )}
      <Box display="flex" gap={4}>
        <Field label="직원 (본사)" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.businessEmployeeName} readOnly />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.businessEmployeeNo} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="직원 (협력)" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.customerEmployeeName} readOnly />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={inoutHistoryDetail.customerEmployeeNo} readOnly />
        </Field>
      </Box>
      <Field label="날짜" orientation="horizontal" mb={15}>
        <Input value={inoutHistoryDetail.inoutHistoryDate} readOnly />
      </Field>
      <Field label="비고" orientation="horizontal" mb={15}>
        <Textarea
          style={{ maxHeight: "100px", overflowY: "auto" }}
          value={inoutHistoryDetail.inoutHistoryNote}
          readOnly
        />
      </Field>
    </Box>
  );
}

export default InoutHistoryView;
