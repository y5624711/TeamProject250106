import React, { useEffect, useState } from "react";
import {
  Box,
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
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

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
  }, [isOpen]);

  // 유효성 검증을 계산된 값으로 정의
  const isValid =
    itemData.itemCommonCode &&
    itemData.customerName &&
    itemData.inputPrice &&
    itemData.outputPrice;

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
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>품목 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box css={{ "--field-label-width": "85px" }}>
            <Stack gap="15px">
              <Field
                label={<SpacedLabel text="품목" req />}
                orientation="horizontal"
                required
              >
                <SelectRoot
                  onValueChange={(selectedName) => {
                    const selectedItem = itemCommonCodeList.find(
                      (item) => item.itemCommonName === selectedName.value[0],
                    );

                    if (selectedItem) {
                      setItemData((prev) => ({
                        ...prev,
                        itemCommonName: selectedItem?.itemCommonName,
                        itemCommonCode: selectedItem?.itemCommonCode || "",
                        customerName: selectedItem.customerName,
                        customerCode: selectedItem.customerCode,
                      }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValueText>
                      {itemData.itemCommonName || "품목 선택"}
                    </SelectValueText>
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
                        key={item.itemCommonCode}
                        item={item.itemCommonName}
                      >
                        {item.itemCommonName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field
                label={<SpacedLabel text="담당 업체" />}
                orientation="horizontal"
              >
                <Input
                  readOnly
                  value={itemData.customerName}
                  variant={"subtle"}
                />
              </Field>
              <Field
                label={<SpacedLabel text="규격" />}
                orientation="horizontal"
              >
                <Input
                  value={itemData.size}
                  onChange={handleInputChange("size")}
                />
              </Field>
              <Field
                label={<SpacedLabel text="단위" />}
                orientation="horizontal"
              >
                <Input
                  value={itemData.unit}
                  onChange={handleInputChange("unit")}
                />
              </Field>
              <Field
                label={<SpacedLabel text="입고가" req />}
                orientation="horizontal"
                required
              >
                <Input
                  type="text" // number → text 변경
                  value={
                    itemData.inputPrice
                      ? Number(itemData.inputPrice).toLocaleString("ko-KR")
                      : ""
                  }
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, ""); // 숫자 이외의 문자 제거
                    setItemData((prev) => ({
                      ...prev,
                      inputPrice: numericValue
                        ? parseInt(numericValue, 10)
                        : "",
                    }));
                  }}
                />
              </Field>

              <Field
                label={<SpacedLabel text="출고가" req />}
                orientation="horizontal"
                required
              >
                <Input
                  type="text"
                  value={
                    itemData.outputPrice
                      ? Number(itemData.outputPrice).toLocaleString("ko-KR")
                      : ""
                  }
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, "");
                    setItemData((prev) => ({
                      ...prev,
                      outputPrice: numericValue
                        ? parseInt(numericValue, 10)
                        : "",
                    }));
                  }}
                />
              </Field>
              <Field
                label={<SpacedLabel text="비고" />}
                orientation="horizontal"
              >
                <Textarea
                  placeholder="최대 50자"
                  style={{ maxHeight: "100px", overflowY: "auto" }}
                  value={itemData.itemNote}
                  onChange={handleInputChange("itemNote")}
                />
              </Field>
            </Stack>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Tooltip
            content="입력을 완료해주세요."
            disabled={isValid}
            openDelay={100}
            closeDelay={100}
          >
            <Button onClick={handleAddClick} disabled={!isValid}>
              등록
            </Button>
          </Tooltip>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
