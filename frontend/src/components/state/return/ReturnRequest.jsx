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
import { Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";

function ReturnRequest({ isOpen, onClose, onRequest }) {
  //반품 요청창 초기상태
  const initialRequestData = {
    serialNo: "",
    itemCommonName: "",
    franchiseName: "",
    customerName: "",
    businessEmployeeNo: "",
    businessEmployeeName: "",
    returnRequestNote: "",
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [serialNo, setSerialNo] = useState("");

  //정보 기입
  const handleInput = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setRequestData((prev) => ({ ...prev, [field]: value }));
  };

  // console.log("serial no1", requestData.serialNo);
  // console.log("serial no2", serialNo);
  //시리얼 번호로 정보 불러오기
  useEffect(() => {
    if (serialNo) {
      axios.get(`api/return/serialNo/${serialNo}`).then((res) => {
        // console.log("호출정보", res.data);
        setRequestData((prev) => ({
          ...prev,
          itemCommonName: res.data[0].itemCommonName || "등록되지 않음",
          itemCommonCode: res.data[0].itemCommonCode || "",
          customerName: res.data[0].customerName || "등록되지 않음",
          customerCode: res.data[0].customerCode || "",
        }));
      });
    }
  }, [serialNo]);

  // console.log("requestData", requestData);

  //반품 요청
  const handleRequestButtonClick = () => {
    axios
      .post("/api/return/request", requestData)
      .then((res) => res.data)
      .then((data) => {
        onRequest(requestData);
        setRequestData(initialRequestData);
      });
  };

  const handleCancel = () => {
    setRequestData(initialRequestData);
    onClose();
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field orientation="horizontal" label="시리얼 번호">
            <Input
              placeholder="00000000000000000000"
              value={requestData.serialNo}
              onChange={handleInput("serialNo")}
            />
            <Button onClick={() => setSerialNo(requestData.serialNo)}>
              조회
            </Button>
          </Field>
          <Field orientation="horizontal" label="품목명">
            <Input
              readOnly
              value={requestData.itemCommonName}
              placeholder={"OOOO"}
            />
          </Field>
          <Field orientation="horizontal" label="가맹점명">
            <Input
              value={requestData.franchiseName}
              placeholder="OOO점"
              onChange={handleInput("franchiseName")}
            />
          </Field>
          <Field orientation="horizontal" label="신청자 사번">
            <Input
              value={requestData.businessEmployeeNo}
              placeholder="0000000000000"
              onChange={handleInput("businessEmployeeNo")}
            />
          </Field>
          <Field orientation="horizontal" label="신청자 명">
            <Input
              value={requestData.businessEmployeeName}
              placeholder="홍길동"
              onChange={handleInput("businessEmployeeName")}
            />
          </Field>
          <Field orientation="horizontal" label="회수 업체">
            <Input
              readOnly
              value={requestData.customerName}
              placeholder="OOOO"
            />
          </Field>
          <Field orientation="horizontal" label="비고">
            <Textarea
              value={requestData.returnRequestNote}
              placeholder="최대 50자"
              onChange={handleInput("businessEmployeeName")}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={handleRequestButtonClick}>요청</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnRequest;
