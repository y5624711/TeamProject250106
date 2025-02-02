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
import { Box, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import Select from "react-select";

function StocktakingAdd({
  isOpen,
  onConfirm,
  onClose,
  title,
  setStocktakingList,
  searchParams,
}) {
  const [warehouseCode, setWarehouseCode] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [countCurrent, setCountCurrent] = useState("");
  const [countConfiguration, setCountConfiguration] = useState("");
  const [customerEmployeeNo, setCustomerEmployeeNo] = useState("");
  const [stocktakingNote, setStocktakingNote] = useState("");
  const [stocktakingType, setStocktakingType] = useState(true);
  const initialStocktakingAdd = {
    warehouseName: "",
    warehouseCode: "",
    itemCode: "",
    itemName: "",
    countCurrent: "",
    countConfiguration: "",
    stocktakingNote: "",
    stocktakingType: true,
    customerEmployeeNo: "",
  };
  const [stocktakingAdd, setStocktakingAdd] = useState(initialStocktakingAdd);
  const [warehouseList, setWarehouseList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const resetState = () => {
    setWarehouseCode("");
    setWarehouseName("");
    setItemName("");
    setItemCode("");
    setCountCurrent("");
    setCountConfiguration("");
    setCustomerEmployeeNo("");
    setStocktakingNote("");
    setStocktakingType(true);
  };

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setStocktakingAdd(initialStocktakingAdd);
    resetState();
    onClose();
  };

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/stocktaking/warehouse`).then((res) => {
      const warehouseOptions = res.data.map((warehouse) => ({
        value: warehouse.warehouseCode,
        label: warehouse.warehouseName,
      }));
      setWarehouseList(warehouseOptions);
    });
  }, []);

  // 물품 정보 가져오기
  useEffect(() => {
    if (warehouseCode) {
      axios.get(`/api/stocktaking/item/${warehouseCode}`).then((res) => {
        const itemOptions = res.data.map((item) => ({
          value: item.itemCode,
          label: item.itemName,
        }));
        setItemList(itemOptions);
      });
    }
  }, [warehouseCode]);

  // 창고 변경 시 관리자 컬렉션 생성
  const handleWarehouseChange = (selectedOption) => {
    setWarehouseName(selectedOption.label);
    setWarehouseCode(selectedOption.value);
    setSelectedWarehouse(selectedOption);

    // 선택 즉시 stocktakingAdd 업데이트
    setStocktakingAdd((prev) => ({
      ...prev,
      warehouseName: selectedOption.label,
      warehouseCode: selectedOption.value,
    }));
  };

  // 물품 변경
  const handleItemChange = (selectedOption) => {
    setItemName(selectedOption.label);
    setItemCode(selectedOption.value);
    setSelectedItem(selectedOption);

    // 선택 즉시 stocktakingAdd 업데이트
    setStocktakingAdd((prev) => ({
      ...prev,
      itemName: selectedOption.label,
      itemCode: selectedOption.value,
    }));
  };

  // 창고 클릭 시
  const onWarehouseClick = () => {
    if (selectedWarehouse) {
      setStocktakingAdd((prev) => ({
        ...prev,
        warehouseName: selectedWarehouse.label,
        warehouseCode: selectedWarehouse.value,
      }));
    }
  };

  const handleSaveClick = () => {
    axios
      .post(`/api/stocktaking/add`, {
        warehouseCode,
        itemCode,
        countCurrent,
        countConfiguration,
        customerEmployeeNo,
        stocktakingNote,
        stocktakingType,
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
        const message = e?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
    resetState();
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose(); // 다이얼로그가 닫히면 항상 초기화
    }
  }, [isOpen]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <Field label="창고" orientation="horizontal" mb={15}>
              <Select
                options={warehouseList}
                value={warehouseList.find(
                  (opt) => opt.value === stocktakingAdd.warehouseName,
                )}
                onChange={handleWarehouseChange}
                placeholder="창고 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "470px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "470px",
                  }),
                }}
              />
              <Button onClick={onWarehouseClick}>조회</Button>
              <Input
                type={"text"}
                value={warehouseCode}
                onChange={(e) => setWarehouseCode(e.target.value)}
              />
            </Field>
            <Field label="품목" orientation="horizontal" mb={15}>
              <Select
                options={itemList}
                value={itemList.find(
                  (opt) => opt.value === stocktakingAdd.itemName,
                )}
                onChange={handleItemChange}
                placeholder="물품 선택"
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
            <Field label="실사 유형" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={stocktakingType}
                onChange={(e) => setStocktakingType(e.target.value)}
              />
            </Field>
          </Box>

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
