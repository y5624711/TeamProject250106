import { Box, HStack, Input, Stack } from "@chakra-ui/react";
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
  const [inoutHistoryNote, setInoutHistoryNote] = useState("");

  useEffect(() => {
    // axios.get("api/instk/detailView");
    //   요청해서 가져와야하는거 구매승인자,창고주소
  }, []);

  const handleAddInOutHistory = () => {
    axios
      .post("/api/inoutHistory/addhistory", {
        data: {
          serialNo: "",
          warehouseCode: "",
          inoutCommonCode: "",
          businessEmployeeNo: "",
          customerEmployeeNo: "",
          locationKey: "",
          inoutHistoryNote: "",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  // 입고 테이블에 넣는 요청
  const handleAddInstk = () => {
    axios.post("api/instk/add", {
      data: {
        이힝이힝,
      },
    });
  };

  // 가입고 상태 변환 코드
  const handleBuyIn = () => {
    console.log("뭘보 ㅏ");
  };

  //  입고 확정 버튼 클릭시
  const handleApprovalClick = () => {
    handleAddInOutHistory();
    handleAddInstk();
    handleBuyIn();
  };

  return (
    <DialogRoot size={"md"} open={isModalOpen}>
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
                <Input readOnly value={instk.itemCommonCode} />
              </Field>
              <Field orientation="horizontal" label={"품목 명"}>
                <Input readOnly value={instk.itemCommonName} />
              </Field>
            </HStack>
            <HStack>
              <Field label={"주문 번호"} orientation="horizontal">
                <Input value={instk.inputNo} />
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input readOnly value={instk.itemAmount} />
              </Field>
            </HStack>
            <HStack>
              <Field label={" 요청자 사번 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeNo} />
              </Field>
              <Field label={"구매 요청자 "} orientation="horizontal">
                <Input readOnly value={instk.requestEmployeeName} />
              </Field>
            </HStack>
            <HStack>
              <Field label={" 승인자 사번 "} orientation="horizontal">
                <Input readOnly value={instk.requestApprovalEmployeeNo} />
              </Field>

              <Field label={"요청 승인자"} orientation="horizontal">
                <Input value={instk.requestApprovalEmployeeName} />
              </Field>
            </HStack>
            <Field label={"창고 주소(코드)"} orientation="horizontal">
              <Input value={"직접기입?"} />
            </Field>
            <Field label={"가입고 승인자"} orientation="horizontal">
              <Input value={localStorage.getItem("name")} readOnly />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Input value={"가입고 비고 작성"} />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                handleApprovalClick();
              }}
            >
              입고 승인
            </Button>
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
