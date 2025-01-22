import { Box, HStack, Input, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
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

export function InstkConfirmModal({ isModalOpen, setChangeModal, instk }) {
  useEffect(() => {
    axios.get("api/insk/detailView");
  }, []);
  console.log("instk", instk);

  return (
    <DialogRoot size={"lg"} open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>가입고 승인 관리</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분 코드"}>
                <Input value={instk.inputCommonCode} />
              </Field>

              <Field orientation="horizontal" label={"입고 구분"}>
                <Input
                  value={instk.inputCommonCode === "RETRN" ? "반품" : "회수"}
                />
              </Field>
            </HStack>
            <HStack>
              <Field orientation="horizontal" label={"품목"}>
                <Input readOnly />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"발주/회수 번호"} orientation="horizontal">
                <Input value={instk.inputNo} />
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input readOnly />
              </Field>
            </HStack>
            <Field label={"구매 요청자 "} orientation="horizontal">
              <Input readOnly />
            </Field>
            <Field label={"구매 승인자"} orientation="horizontal">
              <Input value={"나 아님"} />
            </Field>
            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input value={"직접기입?"} />
            </Field>
            <Field label={"가입고 승인자"} orientation="horizontal">
              <Input value={"나"} readOnly />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input value={"가입고 비고 작성"} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">입고 승인</Button>
          </DialogActionTrigger>
          <Button
            onClick={() => {
              setChangeModal();
            }}
          >
            입고 반려
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
