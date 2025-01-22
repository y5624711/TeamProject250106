import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import {
  createListCollection,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { toaster } from "../../ui/toaster.jsx";
import axios from "axios";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { SelectCode } from "./SelectCode.jsx";

export function CommonCodeAdd({ isOpen, onClose, onAdd, setChange }) {
  const selectOptions = createListCollection({
    items: [
      { label: "시스템코드", value: "SYSTEM" },
      { label: "물품코드", value: "ITEM" },
    ],
  });

  const initialCodeData = {
    commonCode: "",
    commonCodeName: "",
    commonCodeNote: "",
    commonCodeType: "",
  };
  const [codeData, setCodeData] = useState(initialCodeData);
  const [checkCodeSelect, setCheckCodeSelect] = useState(false);
  const [codeType, setCodeType] = useState("");

  // 창이 닫히면 입력 내용 초기화
  const handleClose = () => {
    setCodeData(initialCodeData);
    setCheckCodeSelect(false);
    setCodeType("");
    onClose();
  };

  // input 입력 받기
  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setCodeData((prev) => ({ ...prev, [field]: value }));
  };

  // SelectCode에서 선택된 값을 반영하는 함수
  const handleCodeTypeChange = (value) => {
    // 배열이 아닌 단일 값으로 처리
    const stringValue = Array.isArray(value) ? value.join(",") : value; // 필요 시 배열을 문자열로 변환
    setCodeData((prev) => ({ ...prev, commonCodeType: stringValue }));
    setCodeType(stringValue);
    setCheckCodeSelect(true);
  };

  const isValid =
    (codeType === "ITEM"
      ? /^[A-Z]{3}$/.test(codeData.commonCode)
      : /^[A-Z]{3,5}$/.test(codeData.commonCode)) &&
    codeData.commonCodeName.trim() !== "" &&
    checkCodeSelect;

  // 품목 공통 코드 등록하기
  const handleAddClick = () => {
    if (!isValid) {
      toaster.create({
        description: "품목 코드는 대문자 3자리로 입력해야 합니다.",
        type: "error",
      });
      return;
    }
    axios
      .post("/api/commonCode/add", codeData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(codeData);
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>물품 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text fontSize={"xs"} mt={-5}>
            시스템코드는 대문자 3~5자리, 품목 코드는 대문자 3자리로 입력해야
            합니다.
          </Text>

          {/*코드 종류 선택*/}
          <SelectCode
            selectOptions={selectOptions}
            onChange={handleCodeTypeChange}
          />

          <Stack w={"90%"} gap={5} pt={"5"}>
            <Field label="코드" orientation="horizontal">
              <Input
                placeholder="코드"
                value={codeData.commonCode || ""}
                onChange={handleInputChange("commonCode")}
                maxLength={
                  codeType === "ITEM"
                    ? 3
                    : codeType === "SYSTEM"
                      ? 5
                      : undefined
                }
              />
            </Field>
            <Field label="코드명" orientation="horizontal">
              <Input
                placeholder="코드명"
                value={codeData.commonCodeName || ""}
                onChange={handleInputChange("commonCodeName")}
              />
            </Field>
            <Field label="비고" orientation="horizontal">
              <Textarea
                resize={"none"}
                placeholder="비고"
                value={codeData.commonCodeNote || ""}
                onChange={handleInputChange("commonCodeNote")}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleAddClick} disabled={!isValid}>
            등록
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
