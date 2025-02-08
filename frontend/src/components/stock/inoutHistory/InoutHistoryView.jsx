import React, { useEffect, useState } from "react";
import { Box, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { Field } from "../../ui/field.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

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

  const location =
    inoutHistoryDetail.row +
    " - " +
    inoutHistoryDetail.col +
    " - " +
    inoutHistoryDetail.shelf;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
      css={{ "--field-label-width": "85px" }}
    >
      <Box>
        {inoutHistoryDetail.inoutCommonCode === "OUT" ? (
          <Field
            label={<SpacedLabel text="입출 구분" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value="일반 출고" readOnly />
          </Field>
        ) : inoutHistoryDetail.inoutCommonCode === "RETRN" ? (
          <Field
            label={<SpacedLabel text="입출 구분" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value="회수 입고" readOnly />
          </Field>
        ) : inoutHistoryDetail.inoutCommonCode === "INSTK" ? (
          <Field
            label={<SpacedLabel text="입출 구분" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value="일반 입고" readOnly />
          </Field>
        ) : inoutHistoryDetail.inoutCommonCode === "LOS" ? (
          <Field
            label={<SpacedLabel text="입출 구분" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value="실사 분실" readOnly />
          </Field>
        ) : (
          <Field
            label={<SpacedLabel text="입출 구분" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value="실사 입고" readOnly />
          </Field>
        )}
        <Field
          label={<SpacedLabel text="입출 코드" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={inoutHistoryDetail.inoutNo} readOnly />
        </Field>
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="품목" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.itemName} readOnly />
          </Field>
          <Field
            label={<SpacedLabel text="시리얼 번호" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.serialNo} readOnly />
          </Field>
        </Box>
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="창고" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.warehouseName} readOnly />
          </Field>
          <Field
            label={<SpacedLabel text="창고 주소" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.warehouseAddress} readOnly />
          </Field>
        </Box>
        {inoutHistoryDetail.inoutCommonCode === "OUT" ? (
          <Field
            label={<SpacedLabel text="가맹점" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.installFranchiseName} readOnly />
          </Field>
        ) : inoutHistoryDetail.inoutCommonCode === "LOS" ? null : (
          <Field
            label={<SpacedLabel text="로케이션" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.row ? location : ""} readOnly />
          </Field>
        )}
        {inoutHistoryDetail.inoutCommonCode === "RETRN" ? (
          <Field
            label={<SpacedLabel text="가맹점" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.returnFranchiseName} readOnly />
          </Field>
        ) : null}
        {inoutHistoryDetail.inoutCommonCode === "OUT" ||
        inoutHistoryDetail.inoutCommonCode === "RETRN" ||
        inoutHistoryDetail.inoutCommonCode === "INSTK" ? (
          <Box display="flex" gap={5}>
            <Field
              label={<SpacedLabel text="요청자" />}
              orientation="horizontal"
              mb={15}
            >
              <Input value={inoutHistoryDetail.businessEmployeeName} readOnly />
            </Field>
            <Field
              label={<SpacedLabel text="사번" />}
              orientation="horizontal"
              mb={15}
            >
              <Input value={inoutHistoryDetail.businessEmployeeNo} readOnly />
            </Field>
          </Box>
        ) : null}
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="승인자" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.customerEmployeeName} readOnly />
          </Field>
          <Field
            label={<SpacedLabel text="사번" />}
            orientation="horizontal"
            mb={15}
          >
            <Input value={inoutHistoryDetail.customerEmployeeNo} readOnly />
          </Field>
        </Box>
        <Field
          label={<SpacedLabel text="날짜" />}
          orientation="horizontal"
          mb={15}
        >
          <Input
            value={inoutHistoryDetail.inoutHistoryDate?.slice(0, 10) || ""}
            readOnly
          />
        </Field>
        <Field
          label={<SpacedLabel text="비고" />}
          orientation="horizontal"
          mb={15}
        >
          {inoutHistoryDetail.inoutHistoryNote ? (
            <Textarea
              style={{ maxHeight: "100px", overflowY: "auto" }}
              value={inoutHistoryDetail.inoutHistoryNote}
              readOnly
            />
          ) : (
            <Input readOnly value={"내용 없음"} />
          )}
        </Field>
      </Box>
    </Box>
  );
}

export default InoutHistoryView;
