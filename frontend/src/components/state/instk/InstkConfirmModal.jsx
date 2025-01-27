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
  const [inputStockNote, setInputStockNote] = useState("");
  console.log("확인창 id",id)
  useEffect(() => {
    axios.get(`api/instk/confirmView/${instk.inputNo}`,{
      params:{
        inputCommonCode:instk.inputCommonCode,
      }
    });
  }, []);



  // 입고테이블에 추가 , 가입고 상태 변환 ,품목에 시리얼 번호 추가,품목 입출내역에 추가 ,입고 상세에 시리얼 번호 로케이션 등등
  const handleAddInstk = () => {
    axios
      .post("/api/instk/add", {
        inputKey: instk.inputKey,
        inputStockEmployeeNo:id ,
        inputStockNote: inputStockNote,
        itemCommonName: instk.itemCommonName,
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
              <Field label={"주문 요청자 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
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
              <Field label={"창고 주소"} orientation="horizontal">
                <Input value={""} />
              </Field>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input value={""} />
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
              <Textarea value={inputStockNote}  placeholder={"최대50자"}  onChange={(e)=>{
                setInputStockNote(e.target.value);
              }} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              onClick={() => {
                handleAddInstk();
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
