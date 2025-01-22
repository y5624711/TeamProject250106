import { Box, HStack, Input, Stack } from "@chakra-ui/react";
import React from "react";
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

export function InstkConfirmModal({ isModalOpen }) {
  return (
    <DialogRoot size={"lg"} open={isModalOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>가입고 승인 관리</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분 코드"}>
                <Input readOnly />
              </Field>

              <Field orientation="horizontal" label={"입고 구분"}>
                <Input readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field orientation="horizontal" label={"품목"}>
                <Input readOnly />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field label={"발주/회수 번호"} orientation="horizontal">
                <Input readOnly />
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input readOnly />
              </Field>
            </HStack>
            <Field label={"구매 요청자 "} orientation="horizontal">
              <Input readOnl />
            </Field>
            <Field label={"구매 승인자"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"가입고 승인자"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input readOnly />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">입고 승인</Button>
          </DialogActionTrigger>
          <Button>입고 반려</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
