import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
} from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
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
} from "../ui/dialog.jsx";
import { Field } from "../ui/field.jsx";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import { toaster } from "../ui/toaster.jsx";

export function ItemAdd({ isOpen, onClose, onAdd, setChange }) {
  const initailItemData = {
    itemCommonCode: "",
    itemCommonName: "",
    customerName: "",
    customerCode: "",
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemNote: "",
  };
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [itemData, setItemData] = useState(initailItemData);

  // 창이 닫히면 입력 내용 초기화
  const handleClose = () => {
    setItemData(initailItemData);
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setItemData((prev) => ({ ...prev, [field]: value }));
  };

  // 품목 구분 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/item/commonCode")
      .then((res) => setItemCommonCodeList(res.data))
      .catch((error) => console.error("데이터 로딩 중 오류 발생:", error));
  }, []);

  // 품목 선택 시 협력업체 이름 가져오기
  useEffect(() => {
    console.log(itemData);
    if (itemData.itemCommonCode) {
      axios
        .get(`/api/item/customer/${itemData.itemCommonCode}`)
        .then((res) => {
          const customerData = res.data[0] || {};
          setItemData((prev) => ({
            ...prev,
            customerName: customerData.customerName || "없음",
            customerCode: customerData.customerCode || "",
          }));
        })
        .catch((error) => {
          console.error("협력업체 정보 로드 중 오류 발생: ", error);
          setItemData((prev) => ({
            ...prev,
            customerName: "",
            customerCode: "",
          }));
        });
    }
  }, [itemData.itemCommonCode]);

  // 품목 등록하기
  const handleAddClick = () => {
    axios
      .post("/api/item/add", itemData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(itemData);
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 버튼 활성화를 위한 유효성 검사
  useEffect(() => {
    const { itemCommonCode, customerName, inputPrice, outputPrice } = itemData;
    setIsValid(!!(itemCommonCode && customerName && inputPrice && outputPrice));
  }, [itemData]);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setItemData(initailItemData); // 창 닫히면 초기화
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>물품 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <SelectRoot
              onValueChange={(e) => {
                const selectedItem = itemCommonCodeList.find(
                  (item) => item.item_common_name === e.value[0],
                );
                setItemData((prev) => ({
                  ...prev,
                  itemCommonName: selectedItem?.item_common_name,
                  itemCommonCode: selectedItem?.item_common_code || "",
                }));
              }}
            >
              <SelectLabel>
                품목{" "}
                <Text as="span" color="red.500">
                  *
                </Text>
              </SelectLabel>
              <SelectTrigger>
                <SelectValueText>
                  {itemData.itemCommonName || "품목 선택"}
                </SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {itemCommonCodeList.map((item) => (
                  <SelectItem
                    key={item.item_common_code}
                    item={item.item_common_name}
                  >
                    {item.item_common_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Field label={"담당업체"} required>
              <Input
                readOnly
                placeholder="담당업체"
                value={itemData.customerName}
              />
            </Field>
            <Field label="규격">
              <Input
                placeholder="규격"
                value={itemData.size}
                onChange={handleInputChange("size")}
              />
            </Field>
            <Field label="단위">
              <Input
                placeholder="단위"
                value={itemData.unit}
                onChange={handleInputChange("unit")}
              />
            </Field>
            <Field label="입고가" required>
              <NumberInputRoot>
                <NumberInputField
                  placeholder="입고가"
                  value={itemData.inputPrice}
                  onChange={handleInputChange("inputPrice")}
                />
              </NumberInputRoot>
            </Field>
            <Field label="출고가" required>
              <NumberInputRoot>
                <NumberInputField
                  placeholder="출고가"
                  value={itemData.outputPrice}
                  onChange={handleInputChange("outputPrice")}
                />
              </NumberInputRoot>
            </Field>
            <Field label="비고">
              <Input
                placeholder="비고"
                value={itemData.itemNote}
                onChange={handleInputChange("itemNote")}
              />
            </Field>
          </Box>
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
