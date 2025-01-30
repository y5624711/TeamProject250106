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

function LocationAdd({ isOpen, onConfirm, onClose, title }) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [shelf, setShelf] = useState("");
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [locationNote, setLocationNote] = useState("");

  const handleSaveClick = () => {
    axios.post(`/api/location/add`, {
      warehouseCode,
      row,
      col,
      shelf,
      itemCommonCode,
      locationNote,
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
            창고 코드
            <Input
              type={"text"}
              value={warehouseCode}
              onChange={(e) => setWarehouseCode(e.target.value)}
            />
            행
            <Input
              type={"text"}
              value={row}
              onChange={(e) => setRow(e.target.value)}
            />
            열
            <Input
              type={"text"}
              value={col}
              onChange={(e) => setCol(e.target.value)}
            />
            단
            <Input
              type={"text"}
              value={shelf}
              onChange={(e) => setShelf(e.target.value)}
            />
            물품명
            <Input
              type={"text"}
              value={itemCommonCode}
              onChange={(e) => setItemCommonCode(e.target.value)}
            />
            비고
            <Input
              type={"text"}
              value={locationNote}
              onChange={(e) => setLocationNote(e.target.value)}
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

export default LocationAdd;
