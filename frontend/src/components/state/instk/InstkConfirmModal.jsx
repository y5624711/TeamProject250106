import {
  Box,
  HStack,
  Input,
  Separator,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import error from "eslint-plugin-react/lib/util/error.js";
import { toaster } from "../../ui/toaster.jsx";

export function InstkConfirmModal({
  isModalOpen,
  setChangeModal,
  instk,
  onApprovalSuccess,
}) {
  const { id } = useContext(AuthenticationContext);
  const [inputStockNote, setInputStockNote] = useState("");
  const [instkDetail, setInstkDetail] = useState({});

  // 입고 상세
  useEffect(() => {
    axios
      .get(`api/instk/confirmView/${instk.inputNo}`, {
        params: {
          inputCommonCode: instk.inputCommonCode,
        },
      })
      .then((res) => {
        setInstkDetail(res.data);
      });
  }, []);

  // 입고 추가
  const handleAddInstk = () => {
    axios
      .post("/api/instk/add", {
        inputKey: instk.inputKey,
        inputNo: instk.inputNo,
        inputCommonCode: instk.inputCommonCode,
        inputStockEmployeeNo: id,
        inputStockNote: inputStockNote,
        itemCommonName: instk.itemCommonName,
        employeeWorkPlaceCode: instkDetail.employeeWorkPlaceCode,
        requestEmployeeNo: instk.requestEmployeeNo,
        itemAmount: instk.itemAmount,
      })
      .then((res) => {
        console.log(res);
        toaster.create({
          description: res.data.message.text,
          type: res.data.message.type,
        });
        setChangeModal();
        onApprovalSuccess(); // 승인 성공 후 콜백 실행
      })
      .catch((error) => {
        console.log("입고테이블에 추가중 오류 발생했습니다", error);
      })
      .finally(() => {});
  };

  // 입고 반려 메소드
  const handleRejectInstk = () => {
    axios
      .put("/api/instk/reject", {
        inputKey: instk.inputKey,
      })
      .then((res) => {
        console.log(res.data);
        toaster.create({
          description: res.data.message.text,
          type: res.data.message.type,
        });
      })
      .catch((error) => {
        console.log("입고 반려 중 오류 ", error);
      })
      .finally(() => {
        setChangeModal();
        onApprovalSuccess();
      });
  };
  console.log(instk, instkDetail);
  return (
    <DialogRoot size={"lg"} open={isModalOpen} onOpenChange={setChangeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 승인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분"}>
                <Input value={instk.inputCommonCodeName} readOnly />
              </Field>
              <Field label={"주문 번호"} orientation="horizontal">
                <Input value={instk.inputNo} readOnly />
              </Field>
            </HStack>

            <HStack>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input readOnly value={instk.itemAmount} />
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 요청자 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 승인자"} orientation="horizontal">
                <Input value={instk.requestApprovalEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestApprovalEmployeeNo} />
              </Field>
            </HStack>

            <Field label={"주문 비고"} orientation="horizontal">
              <Textarea
                value={instk.inputNote}
                readOnly
                placeholder={"최대50자"}
              />
            </Field>

            <HStack>
              <Field label={"창고 주소"} orientation="horizontal">
                <Input value={instkDetail.warehouseAddress} readOnly />
              </Field>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input value={instk.customerName} readOnly />
              </Field>
            </HStack>

            <HStack>
              <Field label={"입고 승인자"} orientation="horizontal">
                <Input value={localStorage.getItem("name")} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={id} readOnly />
              </Field>
            </HStack>

            <Separator />

            <Field label={"입고 비고"} orientation="horizontal">
              <Textarea
                value={inputStockNote}
                placeholder={"최대50자"}
                onChange={(e) => {
                  setInputStockNote(e.target.value);
                }}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                handleRejectInstk();
              }}
            >
              반려
            </Button>
          </DialogActionTrigger>

          <Button
            onClick={() => {
              handleAddInstk();
            }}
          >
            승인
          </Button>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setChangeModal();
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}
