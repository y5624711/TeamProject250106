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
import { HStack, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import React, { useContext } from "react";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";

export function InstkDetaiViewModal({ isModalOpen, setChangeModal, instk }) {
  const { id } = useContext(AuthenticationContext);
  return (
    <DialogRoot size={"md"} open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 상세 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <Field orientation="horizontal" label={"입고 구분 코드"}>
              <Input value={instk.inputCommonCode} />
            </Field>

            <HStack>
              <Field orientation="horizontal" label={"품목 코드"}>
                <Input readOnly value={instk.itemCommonCode} />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
            </HStack>

            <Field label={"시리얼 번호"} orientation="horizontal">
              <Input readOnly value={"아직 안함"} />
            </Field>
            <Field label={"구매 요청자"} orientation="horizontal">
              <Input readOnly value={instk.requestEmployeeName} />
            </Field>

            <Field label={"입고 승인자"} orientation="horizontal">
              <Input readOnl value={"아직 안함"} />
            </Field>

            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input readOnly value={"아직 안함"} />
            </Field>
            <Field label={"창고 + 로케이션"} orientation="horizontal">
              <Input readOnly value={"아직 안함"} />
            </Field>
            <Field label={"입고 날짜"} orientation="horizontal">
              <Input readOnly value={"input_stock_date"} />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input readOnly value={"승인상태시의 비고"} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter></DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setChangeModal();
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}
