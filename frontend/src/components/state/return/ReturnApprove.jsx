import React, { useEffect, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { Box, HStack, Input, Separator, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

function ReturnApprove({
  isOpen,
  onClose,
  onApprove,
  returnRequestKey,
  setReturnRequestKey,
}) {
  const initialApproveData = {
    customerEmployeeNo: "",
    customerEmployeeName: "",
    customerConfigurerNo: "",
    customerConfigurerName: "",
    returnDate: "",
    returnApproveNote: "",
  };
  const [approveData, setApproveData] = useState(initialApproveData);

  //요청 정보 가져오기
  useEffect(() => {
    if (returnRequestKey) {
      setApproveData(initialApproveData);
      axios.get(`/api/return/approve/${returnRequestKey}`).then((res) => {
        console.log("호출", res.data);
        setApproveData(res.data[0]);
      });
    }
  }, [returnRequestKey]);

  //정보 기입 (변화 적용)
  const handleApproveInput = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setApproveData((prev) => ({ ...prev, [field]: value }));
  };

  //반품 승인 정보 전달
  const handleApproveButtonClick = () => {
    axios
      .post(`api/return/approve`, approveData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        onApprove(approveData);
        setApproveData(initialApproveData);
        onClose();
      })
      .catch((e) => {
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  //반려 전달
  const handleDisapproveButton = () => {
    axios
      .put(`api/return/disapprove/${returnRequestKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  // console.log("셋팅", approveData);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {approveData.returnConsent ? "반품 승인 상세" : "반품 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Field orientation="horizontal" label="가맹점">
            <Input readOnly value={approveData.franchiseName} />
          </Field>
          <HStack>
            <Field orientation="horizontal" label="품목">
              <Input readOnly value={approveData.itemCommonName} />
            </Field>
            <Field orientation="horizontal" label="시리얼 번호">
              <Input readOnly defaultValue={approveData.serialNo} />
            </Field>
          </HStack>
          <HStack>
            <Field orientation="horizontal" label="신청자">
              <Input readOnly value={approveData.businessEmployeeName} />
            </Field>
            <Field orientation="horizontal" label="사번">
              <Input readOnly value={approveData.businessEmployeeNo} />
            </Field>
          </HStack>

          <Field orientation="horizontal" label="담당 업체">
            <Input readOnly value={approveData.customerName} />
          </Field>
          <Field orientation="horizontal" label="신청 날짜">
            <Input
              readOnly
              type={"date"}
              value={approveData.returnRequestDate}
            />
          </Field>
          <Field orientation="horizontal" label="신청 비고">
            {<Input readOnly value={"내용 없음"} /> || (
              <Textarea readOnly value={approveData.returnRequestNote} />
            )}
          </Field>
          {approveData.returnConsent ? (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <HStack>
                <Field orientation="horizontal" label="승인자">
                  <Input readOnly value={approveData.customerEmployeeName} />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input readOnly value={approveData.customerEmployeeNo} />
                </Field>
              </HStack>
              <HStack>
                <Field orientation="horizontal" label="검수기사">
                  <Input readOnly value={approveData.customerConfigurerName} />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input readOnly value={approveData.customerConfigurerNo} />
                </Field>
              </HStack>
              <Field orientation="horizontal" label="회수 예정일">
                <Input readOnly value={approveData.returnDate || "미정"} />
              </Field>
              <Field orientation="horizontal" label="승인 날짜">
                <Input readOnly value={approveData.returnApproveDate} />
              </Field>
              <Field orientation="horizontal" label="승인 비고">
                {<Input readOnly value={"내용 없음"} /> || (
                  <Textarea readOnly value={approveData.returnApproveNote} />
                )}
              </Field>
            </Box>
          ) : (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Separator />
              <HStack>
                <Field orientation="horizontal" label="승인자">
                  <Input
                    value={approveData.customerEmployeeName}
                    // placeholder="홍길동"
                    onChange={handleApproveInput("customerEmployeeName")}
                  />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input
                    value={approveData.customerEmployeeNo}
                    // placeholder="0000000000000"
                    onChange={handleApproveInput("customerEmployeeNo")}
                  />
                </Field>
              </HStack>
              <HStack>
                <Field orientation="horizontal" label="검수기사">
                  <Input
                    value={approveData.customerConfigurerName}
                    // placeholder="홍길동"
                    onChange={handleApproveInput("customerConfigurerName")}
                  />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input
                    value={approveData.customerConfigurerNo}
                    // placeholder="0000000000000"
                    onChange={handleApproveInput("customerConfigurerNo")}
                  />
                </Field>
              </HStack>
              <Field orientation="horizontal" label="회수 예정일">
                <Input
                  type="date" // 사용자가 달력으로 날짜 선택 가능
                  value={approveData.returnDate || ""}
                  onChange={handleApproveInput("returnDate")}
                />
              </Field>
              <Field orientation="horizontal" label="승인 비고">
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
          {approveData.returnConsent ? (
            <Button onClick={onClose} variant="outline">
              취소
            </Button>
          ) : (
            <HStack>
              {/*<Button onClick={onClose} variant="outline">*/}
              {/*  취소*/}
              {/*</Button>*/}
              <Button onClick={handleDisapproveButton} variant="outline">
                반려
              </Button>
              <Button onClick={handleApproveButtonClick}>승인</Button>
            </HStack>
          )}
          <DialogCloseTrigger />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnApprove;
