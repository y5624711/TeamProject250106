import React, { useEffect, useState } from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";

function ReturnApprove({
  isOpen,
  onClose,
  returnRequestKey,
  setReturnRequestKey,
}) {
  const initialApproveData = {
    customerEmployeeNo: "",
    customerEmployeeName: "",
    customerConfigurerNo: "",
    customerConfigurerName: "",
    returnApproveNote: "",
  };
  const [approveData, setApproveData] = useState(initialApproveData);

  //요청 정보 가져오기
  useEffect(() => {
    axios.get(`/api/return/approve/${returnRequestKey}`).then((res) => {
      console.log("호출", res.data);
      setApproveData(res.data[0]);
    });
  }, [returnRequestKey]);

  //정보 기입
  const handleApproveInput = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setApproveData((prev) => ({ ...prev, [field]: value }));
  };

  console.log("셋팅", approveData);

  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 승인 여부</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field orientation="horizontal" label="시리얼 번호">
            <Input readOnly defaultValue={approveData.serialNo} />
          </Field>
          <Field orientation="horizontal" label="품목명">
            <Input readOnly value={approveData.itemCommonName} />
          </Field>
          <Field orientation="horizontal" label="가맹점명">
            <Input readOnly value={approveData.franchiseName} />
          </Field>
          <Field orientation="horizontal" label="신청자 사번">
            <Input readOnly value={approveData.businessEmployeeNo} />
          </Field>
          <Field orientation="horizontal" label="신청자 명">
            <Input readOnly value={approveData.businessEmployeeName} />
          </Field>
          <Field orientation="horizontal" label="회수 업체">
            <Input readOnly value={approveData.customerName} />
          </Field>
          <Field orientation="horizontal" label="요청 비고">
            {<Input readOnly value={"내용 없음"} /> || (
              <Textarea readOnly value={approveData.returnRequestNote} />
            )}
          </Field>
          {approveData.returnConsent ? (
            <Box>
              <Field orientation="horizontal" label="승인자 사번">
                <Input readOnly value={approveData.customerEmployeeNo} />
              </Field>
              <Field orientation="horizontal" label="승인자 명">
                <Input readOnly value={approveData.customerEmployeeName} />
              </Field>
              <Field orientation="horizontal" label="검수기사 사번">
                <Input readOnly value={approveData.customerConfigurerNo} />
              </Field>
              <Field orientation="horizontal" label="검수기사 명">
                <Input readOnly value={approveData.customerConfigurerName} />
              </Field>
              <Field orientation="horizontal" label="비고">
                <Textarea readOnly value={approveData.returnApproveNote} />
              </Field>
            </Box>
          ) : (
            <Box>
              <Field orientation="horizontal" label="승인자 사번">
                <Input
                  value={approveData.customerEmployeeNo}
                  placeholder="0000000000000"
                  onChange={handleApproveInput("customerEmployeeNo")}
                />
              </Field>
              <Field orientation="horizontal" label="승인자 명">
                <Input
                  value={approveData.customerEmployeeName}
                  placeholder="홍길동"
                  onChange={handleApproveInput("customerEmployeeName")}
                />
              </Field>
              <Field orientation="horizontal" label="검수기사 사번">
                <Input
                  value={approveData.customerConfigurerNo}
                  placeholder="0000000000000"
                  onChange={handleApproveInput("customerConfigurerNo")}
                />
              </Field>
              <Field orientation="horizontal" label="검수기사 명">
                <Input
                  value={approveData.customerConfigurerName}
                  placeholder="홍길동"
                  onChange={handleApproveInput("customerConfigurerName")}
                />
              </Field>
              <Field orientation="horizontal" label="비고">
                <Textarea
                  value={approveData.returnApproveNote}
                  placeholder="최대 50자"
                  onChange={handleApproveInput("returnApproveNote")}
                />
              </Field>
            </Box>
          )}
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>취소</Button>
          <Button>승인</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnApprove;
