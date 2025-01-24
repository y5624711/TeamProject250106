import { Box, HStack, Input, Stack, Textarea } from "@chakra-ui/react";
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

export function InstkConfirmModal({ isModalOpen, setChangeModal, instk }) {
  const { id } = useContext(AuthenticationContext);
  const [inoutHistoryNote, setInoutHistoryNote] = useState("");

  useEffect(() => {
    // axios.get("api/instk/detailView");
    //   요청해서 가져와야하는거 구매승인자,창고주소
  }, []);

  // 입고테이블에 추가 , 가입고 상태 변환 ,품목에 시리얼 번호 추가,품목 입출내역에 추가
  const handleAddInOutHistory = () => {
    axios
      .post("/api/instk/add", {
        data: {
          serialNo: "",
          warehouseCode: "",
          inoutCommonCode: "",
          businessEmployeeNo: "",
          customerEmployeeNo: "",
          locationKey: "",
          inoutHistoryNote: "",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  return (
    <DialogRoot size={"lg"} open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 승인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분"}>
                <Input value={instk.inputCommonCodeName} />
              </Field>
              <Field label={"주문 번호"} orientation="horizontal">
                <Input value={instk.inputNo} />
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
              <Field label={"주문 승인자"} orientation="horizontal">
                <Input value={instk.requestApprovalEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestApprovalEmployeeNo} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"구매 요청자 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
              </Field>
            </HStack>

            <HStack>
              <Field label={"창고 주소"} orientation="horizontal">
                <Input value={"경기도 개성시"} />
              </Field>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input value={"면발천국"} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"입고 승인자"} orientation="horizontal">
                <Input value={localStorage.getItem("name")} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={localStorage.getItem("name")} readOnly />
              </Field>
            </HStack>
            <Field label={"비고"} orientation="horizontal">
              <Textarea value={""} placeholder={"최대50자"} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => {
                handleApprovalClick();
              }}
            >
              승인
            </Button>
          </DialogActionTrigger>
          <Button
            variant="outline"
            onClick={() => {
              setChangeModal();
            }}
          >
            반려
          </Button>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setChangeModal();
          }}
        />
      </DialogContent>
      z
    </DialogRoot>
  );
}
