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
import React from "react";

export function InstkDetaiViewModal() {
  return (
    <DialogRoot size={"lg"}>
      <DialogTrigger asChild>
        <Button variant="outline" size="md">
          입고 상세 확인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 상세 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <Field orientation="horizontal" label={"입고 구분 코드"}>
              <Input readOnly />
            </Field>

            <HStack>
              <Field orientation="horizontal" label={"품목 코드"}>
                <Input readOnly />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly />
              </Field>
            </HStack>

            <Field label={"시리얼 번호"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"구매 요청자"} orientation="horizontal">
              <Input readOnly />
            </Field>

            <Field label={"입고 승인자"} orientation="horizontal">
              <Input readOnl />
            </Field>

            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"창고 + 로케이션"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"입고 날짜"} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input readOnly />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button> 완료</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
