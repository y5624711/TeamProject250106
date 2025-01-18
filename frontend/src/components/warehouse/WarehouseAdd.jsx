import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Box, Input } from "@chakra-ui/react";
import axios from "axios";

export function WarehouseAdd({ isOpen, onConfirm, onClose, title }) {
  const [warehouseCode, setWarehouseCode] = useState();
  const [warehouseName, setWarehouseName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseAddressDetail, setWarehouseAddressDetail] = useState("");
  const [warehousePost, setWarehousePost] = useState("");
  const [warehouseState, setWarehouseState] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [customerEmployeeNo, setCustomerEmployeeNo] = useState("");
  const [warehouseTel, setWarehouseTel] = useState("");
  const [warehouseActive, setWarehouseActive] = useState("");
  const [warehouseNote, setWarehouseNote] = useState("");

  const handleSaveClick = () => {
    axios.post(`/api/warehouse/add`, {
      warehouseCode,
      warehouseName,
      customerCode,
      warehouseAddress,
      warehouseAddressDetail,
      warehousePost,
      warehouseState,
      warehouseCity,
      customerEmployeeNo,
      warehouseTel,
      warehouseActive,
      warehouseNote,
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
              value={warehouseCode}
              onChange={(e) => setWarehouseCode(e.target.value)}
            />
            창고명 (창고코드 자동생성)
            <Input
              type={"text"}
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
            />
            담당 업체
            <Input
              type={"text"}
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
            />
            주소
            <Input
              type={"text"}
              value={warehouseAddress}
              onChange={(e) => setWarehouseAddress(e.target.value)}
            />
            상세 주소
            <Input
              type={"text"}
              value={warehouseAddressDetail}
              onChange={(e) => setWarehouseAddressDetail(e.target.value)}
            />
            우편 번호
            <Input
              type={"text"}
              value={warehousePost}
              onChange={(e) => setWarehousePost(e.target.value)}
            />
            광역 시도
            <Input
              type={"text"}
              value={warehouseState}
              onChange={(e) => setWarehouseState(e.target.value)}
            />
            시군
            <Input
              type={"text"}
              value={warehouseCity}
              onChange={(e) => setWarehouseCity(e.target.value)}
            />
            관리자명
            <Input
              type={"text"}
              value={customerEmployeeNo}
              onChange={(e) => setCustomerEmployeeNo(e.target.value)}
            />
            전화번호
            <Input
              type={"text"}
              value={warehouseTel}
              onChange={(e) => setWarehouseTel(e.target.value)}
            />
            {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
            사용 여부
            <Input
              type={"text"}
              value={warehouseActive}
              onChange={(e) => setWarehouseActive(e.target.value)}
            />
            비고
            <Input
              type={"text"}
              value={warehouseNote}
              onChange={(e) => setWarehouseNote(e.target.value)}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
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
