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
  const [instkDetail, setInstkDetail] = useState({});
  useEffect(() => {
    axios.get(`api/instk/confirmView/${instk.inputNo}`,{
      params:{
        inputCommonCode:instk.inputCommonCode,
      }
    }).then((res)=>{
      setInstkDetail(res.data);
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
                <Input value={instk.inputCommonCodeName} readOnly />
              </Field>
              <Field label={"주문 번호"} orientation="horizontal">
                <Input value={instk.inputNo} readOnly />
              </Field>
            </HStack>

            <HStack>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} readOnly/>
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input readOnly value={instk.itemAmount} readOnly/>
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 요청자 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} readOnly/>
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} readOnly/>
              </Field>
            </HStack>

            <HStack>
              <Field label={"주문 승인자"} orientation="horizontal">
                <Input value={instk.requestApprovalEmployeeName}  readOnly/>
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input readOnly value={instk.requestApprovalEmployeeNo}  readOnly/>
              </Field>
            </HStack>

            <HStack>
              <Field label={"창고 주소"} orientation="horizontal">
                <Input value={instkDetail.warehouseAddress}  readOnly/>
              </Field>
              <Field label={"담당 업체"} orientation="horizontal">
                <Input value={instk.customerName}  readOnly/>
              </Field>
            </HStack>

            <HStack>
              <Field label={"입고 승인자"} orientation="horizontal">
                <Input value={localStorage.getItem("name")} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={id} readOnly />
              </Field>
            </HStack>

            <Field label={"주문 비고"} orientation="horizontal">
              <Textarea value={instk.inputNote}  placeholder={"최대50자"}/>
            </Field>

            <Field label={"입고 비고"} orientation="horizontal">
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
