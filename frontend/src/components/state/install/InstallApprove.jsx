import React from "react";
import {
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

export function InstallApprove() {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          출고 승인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출고 승인</DialogTitle>
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
            <Field label={"수량"}>
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
          <Field label={"담당자"}>
            <Input readOnly />
          </Field>
          <Field label={"창고 위치"}>
            <Input readOnly />
          </Field>
          <HStack>
            <Field label={"설치 예정 날짜"}>
              <Input readOnly />
            </Field>
            <Field label={"설치 기사"}>
              <Input readOnly />
            </Field>
          </HStack>
          <Field label={"비고"}>
            <Input readOnly />
          </Field>
        </DialogBody>
        <DialogFooter>
          <HStack>
            <Button>출고 승인</Button>
            <Button>출고 반려</Button>
          </HStack>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
