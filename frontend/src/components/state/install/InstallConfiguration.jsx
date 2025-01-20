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
import { HStack, Input } from "@chakra-ui/react";

export function InstallConfiguration() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          설치 확인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>설치 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field label={"가맹점명"}>
            <Input readOnly />
          </Field>
          <Field label={"품목명"}>
            <Input readOnly />
          </Field>
          <HStack>
            <Field label={"출고 번호"}>
              <Input readOnly />
            </Field>
            <Field label={"시리얼 번호"}>
              <Input readOnly />
            </Field>
          </HStack>
          <Field label={"가맹점 주소"}>
            <Input readOnly />
          </Field>
          <HStack>
            <Field label={"부서"}>
              <Input readOnl />
            </Field>
            <Field label={"신청자"}>
              <Input readOnly />
            </Field>
          </HStack>
          <Field label={"설치 기사"}>
            <Input readOnly />
          </Field>
          <Field label={"비고"}>
            <Input readOnly />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button>설치 완료</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
