import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import { Input, Text } from "@chakra-ui/react";
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

export function ItemCommonCodeAdd({ isOpen, onClose, onAdd, setChange }) {
  const initialItemCodeData = {
    itemCommonCode: "",
    itemCommonName: "",
    itemCommonCodeNote: "",
  };
  const [itemCodeData, setItemCodeData] = useState(initialItemCodeData);

  // 창이 닫히면 입력 내용 초기화
  const handleClose = () => {
    setItemCodeData(initialItemCodeData);
    onClose();
  };

  // input 입력 받기
  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setItemCodeData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    /^[A-Z]{3}$/.test(itemCodeData.itemCommonCode) &&
    itemCodeData.itemCommonName.trim() !== "";

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
      .post("/api/commonCode/item/add", itemCodeData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(itemCodeData);
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
            품목 코드는 대문자 3자리로 입력해야 합니다.
          </Text>
          <Field label="품목 코드">
            <Input
              placeholder="품목 코드"
              value={itemCodeData.itemCommonCode}
              onChange={handleInputChange("itemCommonCode")}
              maxLength={3}
            />
          </Field>
          <Field label="품목명">
            <Input
              placeholder="품목명"
              value={itemCodeData.itemCommonName}
              onChange={handleInputChange("itemCommonName")}
            />
          </Field>
          <Field label="비고">
            <Input
              placeholder="비고"
              value={itemCodeData.itemCommonCodeNote}
              onChange={handleInputChange("itemCommonCodeNote")}
            />
          </Field>
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
