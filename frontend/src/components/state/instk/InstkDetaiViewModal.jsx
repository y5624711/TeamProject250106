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
import {
  HStack,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
} from "@chakra-ui/react";
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
    <DialogRoot size={"md"} open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>입고 상세 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={3}>
            <HStack>
              <Field orientation="horizontal" label={"입고 구분 코드"}>
                <Input value={instk.inputCommonCode} />
              </Field>
              <Field orientation="horizontal" label={"입고 구분 명"}>
                <Input value={instk.inputCommonCodeName} />
              </Field>
            </HStack>
            <HStack>
              <Field orientation="horizontal" label={"품목 코드"}>
                <Input readOnly value={instk.itemCommonCode} />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
            </HStack>

            <Field label={"시리얼 번호"} orientation="horizontal">
              {/*<NativeSelectRoot>*/}
              {/*  <NativeSelectField*/}
              {/*    items={["Option 1", "Option 2", "Option 3"]}*/}
              {/*  />*/}
              {/*</NativeSelectRoot>*/}
              <Input readOnly value={"ss"} />
            </Field>
            <Field label={"구매 요청자"} orientation="horizontal">
              <Input readOnly value={instk.requestEmployeeName} />
            </Field>

            <Field label={"입고 승인자"} orientation="horizontal">
              <Input readOnl value={instk.inputStockEmployeeName} />
            </Field>

            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input readOnly value={"아직 안함"} />
            </Field>
            <Field label={"창고 + 로케이션"} orientation="horizontal">
              <Input readOnly value={"아직 안함"} />
            </Field>
            <Field label={"입고 날짜"} orientation="horizontal">
              <Input readOnly value={instk.inputStockDate} />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input readOnly value={""} />
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
