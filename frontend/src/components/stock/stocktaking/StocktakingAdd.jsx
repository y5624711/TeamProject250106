import React from "react";
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

function StocktakingAdd({ isOpen, onConfirm, onClose, title }) {
  const handleSaveClick = () => {
    axios
      .post(`/api/stocktaking/add`, {
        // warehouseCode,
        // warehouseName,
        // customerCode,
        // warehouseAddress,
        // warehouseAddressDetail,
        // warehousePost,
        // warehouseState,
        // warehouseCity,
        // customerEmployeeNo,
        // warehouseTel,
        // warehouseActive,
        // warehouseNote,
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
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            창고 코드 (후에 자동생성으로 변경)
            <Input
              type={"text"}
              // value={warehouseCode}
              // onChange={(e) => setWarehouseCode(e.target.value)}
            />
          </Box>
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
