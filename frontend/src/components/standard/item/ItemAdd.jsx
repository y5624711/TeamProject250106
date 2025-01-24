import React, { useEffect, useState } from "react";
import {
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
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
import { Field } from "../../ui/field.jsx";
import { toaster } from "../../ui/toaster.jsx";

export function ItemAdd({ isOpen, onClose, onAdd, setChange }) {
  const initialItemData = {
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
  const [itemData, setItemData] = useState(initialItemData);

  // 창이 닫히면 입력 내용 초기화
  const handleClose = () => {
    setItemData(initialItemData);
    onClose();
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

  // 유효성 검증을 계산된 값으로 정의
  const isValid =
    itemData.itemCommonCode &&
    itemData.customerName &&
    itemData.inputPrice &&
    itemData.outputPrice;

  // 품목 등록하기
  const handleAddClick = () => {
    if (!isValid) {
      toaster.create({
        description: "모든 필수 입력값을 입력해 주세요.",
        type: "error",
      });
      return;
    }

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
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>물품 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="15px">
            <Field label={"품목"} required orientation="horizontal">
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
                <SelectTrigger>
                  <SelectValueText>{itemData.itemCommonName}</SelectValueText>
                </SelectTrigger>
                <SelectContent
                  style={{
                    width: "85%",
                    top: "40px",
                    position: "absolute",
                  }}
                >
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
            </Field>
            <Field label={"담당 업체"} required orientation="horizontal">
              <Input readOnly value={itemData.customerName} />
            </Field>
            <Field label="규격" orientation="horizontal">
              <Input
                value={itemData.size}
                onChange={handleInputChange("size")}
              />
            </Field>
            <Field label="단위" orientation="horizontal">
              <Input
                value={itemData.unit}
                onChange={handleInputChange("unit")}
              />
            </Field>
            <Field label="입고가" required orientation="horizontal">
              <Input
                type="number"
                value={itemData.inputPrice}
                onChange={handleInputChange("inputPrice")}
                min="1"
              />
            </Field>
            <Field label="출고가" required orientation="horizontal">
              <Input
                type="number"
                value={itemData.outputPrice}
                onChange={handleInputChange("outputPrice")}
                min="1"
              />
            </Field>
            <Field label="비고" orientation="horizontal">
              <Textarea
                placeholder="최대 50자"
                value={itemData.itemNote}
                onChange={handleInputChange("itemNote")}
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
