import React, { useState } from "react";
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
import { Box, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";

function StocktakingAdd({ isOpen, onConfirm, onClose, title }) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [countCurrent, setCountCurrent] = useState("");
  const [countConfiguration, setCountConfiguration] = useState("");
  const [customerEmployeeNo, setCustomerEmployeeNo] = useState("");
  const [stocktakingNote, setStocktakingNote] = useState();

  const handleSaveClick = () => {
    axios
      .post(`/api/stocktaking/add`, {
        warehouseCode,
        itemCommonCode,
        countCurrent,
        countConfiguration,
        customerEmployeeNo,
        stocktakingNote,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Field label="창고 코드" orientation="horizontal" mb={15}>
            <Input
              type={"text"}
              value={warehouseCode}
              onChange={(e) => setWarehouseCode(e.target.value)}
            />
          </Field>
          <Field label="품목 코드" orientation="horizontal" mb={15}>
            <Input
              type={"text"}
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </Field>
          <Box display="flex" gap={4}>
            <Field label="전산 수량" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={countCurrent}
                onChange={(e) => setCountCurrent(e.target.value)}
              />
            </Field>
            <Field label="실제 수량" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={countConfiguration}
                onChange={(e) => setCountConfiguration(e.target.value)}
              />
            </Field>
          </Box>
          <Field label="담당자 사번" orientation="horizontal" mb={15}>
            <Input
              type={"text"}
              value={customerEmployeeNo}
              onChange={(e) => setCustomerEmployeeNo(e.target.value)}
            />
          </Field>
          <Field label="비고" orientation="horizontal" mb={15}>
            <Input
              type={"text"}
              value={stocktakingNote}
              onChange={(e) => setStocktakingNote(e.target.value)}
            />
          </Field>
          {/*  TODO: 실사유형 radio로 체크  */}
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClose} />
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button
            variant="solid"
            onClick={() => {
              handleSaveClick();
              onConfirm();
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default StocktakingAdd;
