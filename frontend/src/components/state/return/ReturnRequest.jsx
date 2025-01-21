import React from "react";
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

function ReturnRequest({ isOpen, onClose }) {
  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field orientation="horizontal" label="시리얼 번호">
            <Input placeholder="00000000000000000000" />
            <Button>조회</Button>
          </Field>
          <Field orientation="horizontal" label="품목명">
            <Input />
          </Field>
          <Field orientation="horizontal" label="가맹점명">
            <Input placeholder="000점" />
          </Field>
          <Field orientation="horizontal" label="신청자 사번">
            <Input placeholder="0000000000000" />
          </Field>
          <Field orientation="horizontal" label="신청자 명">
            <Input placeholder="홍길동" />
          </Field>
          <Field orientation="horizontal" label="회수 업체">
            <Input placeholder="OOOO" />
          </Field>
          <Field orientation="horizontal" label="비고">
            <Textarea placeholder="최대 50자" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>취소</Button>
          <Button>요청</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnRequest;
