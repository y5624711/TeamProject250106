import React, { useEffect, useState } from "react";
import { Box, HStack, Input, Stack, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
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
import { Button } from "../../ui/button.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function ItemView({ itemKey, isOpen, onClose, setChange, setItemKey }) {
  const [item, setItem] = useState([]);
  const [editedItem, setEditedItem] = useState({
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemActive: "",
    itemNote: "",
  });

  // 품목 상세 정보를 가져오기
  useEffect(() => {
    if (isOpen && itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setEditedItem(res.data);
        })
        .catch((error) => {
          console.error("품목 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey, isOpen]);

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // 수정된 품목 데이터 서버로 전송
  const handleSaveClick = () => {
    axios
      .put(`/api/item/edit/${itemKey}`, editedItem)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        // 수정 완료 시 변경된 정보 보여주기
        setItem([{ ...editedItem }]);
        setItemKey(itemKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  const isValid =
    editedItem.inputPrice != null &&
    editedItem.outputPrice != null &&
    editedItem.inputPrice !== "" &&
    editedItem.outputPrice !== "";

  return (
    <Box>
      <DialogRoot
        open={isOpen}
        onOpenChange={() => {
          onClose();
        }}
        size={"lg"}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>품목 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box css={{ "--field-label-width": "85px" }}>
              <Stack gap={"15px"}>
                <Field
                  label={<SpacedLabel text="품목" />}
                  orientation="horizontal"
                >
                  <Input
                    readOnly
                    value={item.itemCommonName}
                    variant={"subtle"}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="담당 업체" />}
                  orientation="horizontal"
                >
                  <Input
                    readOnly
                    value={item.customerName}
                    variant={"subtle"}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="규격" />}
                  orientation="horizontal"
                >
                  <Input
                    name="size"
                    value={editedItem.size}
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="단위" />}
                  orientation="horizontal"
                >
                  <Input
                    name="unit"
                    value={editedItem.unit}
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="입고가" />}
                  orientation="horizontal"
                >
                  <Input
                    type="text" // number → text 변경
                    name="inputPrice"
                    value={
                      editedItem.inputPrice
                        ? Number(editedItem.inputPrice).toLocaleString("ko-KR")
                        : ""
                    }
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^\d]/g, ""); // 숫자 이외의 문자 제거
                      setEditedItem((prev) => ({
                        ...prev,
                        inputPrice: numericValue
                          ? parseInt(numericValue, 10)
                          : "",
                      }));
                    }}
                  />
                </Field>

                <Field
                  label={<SpacedLabel text="출고가" />}
                  orientation="horizontal"
                >
                  <Input
                    type="text"
                    name="outputPrice"
                    value={
                      editedItem.outputPrice
                        ? Number(editedItem.outputPrice).toLocaleString("ko-KR")
                        : ""
                    }
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^\d]/g, "");
                      setEditedItem((prev) => ({
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
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                    name="itemNote"
                    placeholder="최대 50자"
                    value={editedItem.itemNote}
                    onChange={handleChange}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="사용 여부" />}
                  orientation="horizontal"
                >
                  <Box ml={"90px"} style={{ position: "absolute" }}>
                    <Checkbox
                      name="itemActive"
                      checked={editedItem.itemActive}
                      readOnly
                    />
                  </Box>
                </Field>
              </Stack>
            </Box>
          </DialogBody>
          <DialogFooter>
            <HStack>
              <DialogActionTrigger asChild>
                <Button variant="outline">취소</Button>
              </DialogActionTrigger>
              <Tooltip
                content="입력을 완료해주세요."
                disabled={isValid}
                openDelay={100}
                closeDelay={100}
              >
                <Button onClick={handleSaveClick} disabled={!isValid}>
                  확인
                </Button>
              </Tooltip>
            </HStack>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
