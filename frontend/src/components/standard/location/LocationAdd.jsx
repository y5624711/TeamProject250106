import React, { useEffect, useState } from "react";
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
import { Box, Input, Textarea } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { Field } from "../../ui/field.jsx";
import Select from "react-select";
import { toaster } from "../../ui/toaster.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

function LocationAdd({ isOpen, onClose, title }) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [shelf, setShelf] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const initialLocationAdd = {
    warehouseName: "",
    warehouseCode: "",
    locationNote: "",
    row: "",
    col: "",
    shelf: "",
    located: true,
  };
  const [locationAdd, setLocationAdd] = useState(initialLocationAdd);

  const resetState = () => {
    setWarehouseName("");
    setWarehouseCode("");
    setRow("");
    setCol("");
    setShelf("");
    setLocationNote("");
  };

  // 관리자 컬렉션 생성
  const handleWarehouseChange = (selectedOption) => {
    setWarehouseName(selectedOption.label);
    setWarehouseCode(selectedOption.value);
    setSelectedLocation(selectedOption);

    // 선택 즉시 warehouseAdd 업데이트
    setLocationAdd((prev) => ({
      ...prev,
      warehouseName: selectedOption.label,
      warehouseCode: selectedOption.value,
    }));
  };

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setLocationAdd(initialLocationAdd);
    resetState();
    onClose();
  };

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/location/warehouse`).then((res) => {
      const warehouseOptions = res.data.map((warehouse) => ({
        value: warehouse.warehouseCode,
        label: warehouse.warehouseName,
      }));
      setWarehouseList(warehouseOptions);
    });
  }, []);

  const handleSaveClick = () => {
    axios
      .post(`/api/location/add`, {
        warehouseCode,
        row,
        col,
        shelf,
        locationNote,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        handleClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
    resetState();
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose(); // 다이얼로그가 닫히면 항상 초기화
    }
  }, [isOpen]);

  //유효성 검사
  const validate = () => {
    return warehouseCode != "" && row != "" && col != "" && shelf != "";
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <Field
              label={<SpacedLabel text="창고" />}
              orientation="horizontal"
              mb={15}
              required
            >
              <Select
                options={warehouseList}
                value={warehouseList.find(
                  (opt) => opt.value === locationAdd.employeeName,
                )}
                onChange={handleWarehouseChange}
                placeholder="창고 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "538.5px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "538.5px",
                  }),
                }}
              />
            </Field>
            <Box display="flex" gap={20}>
              <Field label="행" orientation="horizontal" mb={15} required>
                <Input
                  type={"text"}
                  value={row}
                  onChange={(e) => setRow(e.target.value)}
                />
              </Field>
              <Field label="열" orientation="horizontal" mb={15} required>
                <Input
                  type={"text"}
                  value={col}
                  onChange={(e) => setCol(e.target.value)}
                />
              </Field>
              <Field label="단" orientation="horizontal" mb={15} required>
                <Input
                  type={"text"}
                  value={shelf}
                  onChange={(e) => setShelf(e.target.value)}
                />
              </Field>
            </Box>
            <Field
              label={<SpacedLabel text="비고" />}
              orientation="horizontal"
              mb={15}
            >
              <Textarea
                placeholder="최대 50자"
                style={{ maxHeight: "100px", overflowY: "auto" }}
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
              />
            </Field>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={handleClose} />
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={100}
            closeDelay={100}
            disabled={validate()}
          >
            <Button
              variant="solid"
              onClick={() => {
                handleSaveClick();
              }}
              disabled={!validate()}
            >
              등록
            </Button>
          </Tooltip>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default LocationAdd;
