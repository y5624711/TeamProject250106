import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { HStack, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";

export function InstkDetaiViewModal({ isModalOpen, setChangeModal, instk }) {
  const { id } = useContext(AuthenticationContext);
  const [detailData, setDetailData] = useState();

  const items = ["Option 1", "Option 2", "Option 3"];

  useEffect(() => {
    axios.get(`/api/instk/detailview/${instk.inputKey}`).then((res) => {
      console.log(res.data);
      setDetailData(res.data);
    });
  }, []);

  return (
    <DialogRoot size={"lg"} open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 상세</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={15}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분 명"}>
                <Input value={instk.inputCommonCodeName} />
              </Field>
              <Field orientation="horizontal" label={"주문 번호"}>
                <Input readOnly value={instk.inputNo} />
              </Field>
            </HStack>
            <HStack>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
              <Field label={"시리얼 번호"} orientation="horizontal">
                {/*<NativeSelectRoot>*/}
                {/*  <NativeSelectField*/}
                {/*    items={["Option 1", "Option 2", "Option 3"]}*/}
                {/*  />*/}
                {/*</NativeSelectRoot>*/}
                <Input readOnly value={"요청으로 가져와야함"} />
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 요청자"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input readOnly value={instk.customerName} />
              </Field>
              <Field label={"창고"} orientation="horizontal">
                <Input readOnly value={"창고도 가져와야함"} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"주문 승인자"} orientation="horizontal">
                <Input readOnl value={instk.inputStockEmployeeName} />
              </Field>

              <Field label={"사번"} orientation="horizontal">
                <Input readOnl value={instk.inputStockEmployeeNo} />
              </Field>
            </HStack>

            <Field label={"창고 + 로케이션"} orientation="horizontal">
              <Input readOnly value={"해야함 "} />
            </Field>
            <Field label={"입고 비고"} orientation="horizontal">
              <Input readOnly value={instk.inputNote} />
            </Field>
            <Field label={"입고 날짜"} orientation="horizontal">
              <Input readOnly value={instk.inputStockDate} />
            </Field>
            <Field label={"입고 비고"} orientation="horizontal">
              <Input readOnly value={instk.inputStockNote} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => {
                setChangeModal();
              }}
            >
              취소
            </Button>
          </DialogActionTrigger>
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
