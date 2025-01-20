import React, { useEffect, useState } from "react";
import { Box, HStack, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import { toaster } from "../ui/toaster.jsx";
import { Field } from "../ui/field.jsx";
import { DialogConfirmation } from "../tool/DialogConfirmation.jsx";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";

export function ItemView({ itemKey, isOpen, onClose, setChange, setItemKey }) {
  const [item, setItem] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemActive: false,
    itemNote: "",
  });

  // 품목 상세 정보를 가져오기
  useEffect(() => {
    if (itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setEditedItem(res.data[0]);
        })
        .catch((error) => {
          console.error("품목 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey]);

  // 창이 닫히면 수정 상태 취소
  const handleClose = () => {
    setIsEditing(false);
  };

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const isValid =
    editedItem.itemCommonCode &&
    editedItem.customerName &&
    editedItem.inputPrice &&
    editedItem.outputPrice;

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
        setIsEditing(false);
        setItemKey(itemKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 품목 삭제 시 사용여부 false
  const handleDeleteConfirm = () => {
    axios
      .put(`/api/item/delete/${itemKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <Box>
      <DialogRoot
        open={isOpen}
        onOpenChange={() => {
          onClose();
          handleClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>물품 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              {item.map((item) => (
                <Box>
                  {isEditing ? (
                    <>
                      <Text fontSize={"xs"} mt={-5}>
                        품목과 담당업체는 수정이 불가능합니다.
                      </Text>
                      <Field label={"품목 "} required>
                        <Input readOnly value={item.itemCommonName} />
                      </Field>
                      <Field label={"담당업체"} required>
                        <Input readOnly value={item.customerName} />
                      </Field>
                      <Field label={"규격"}>
                        <Input
                          name="size"
                          placeholder="규격"
                          value={editedItem.size}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label={"단위"}>
                        <Input
                          name="unit"
                          placeholder="단위"
                          value={editedItem.unit}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label={"입고가"} required>
                        <NumberInputRoot>
                          <NumberInputField
                            name="inputPrice"
                            placeholder="입고가"
                            value={editedItem.inputPrice}
                            onChange={handleChange}
                          />
                        </NumberInputRoot>
                      </Field>
                      <Field label={"출고가"} required>
                        <NumberInputRoot>
                          <NumberInputField
                            name="outputPrice"
                            placeholder="출고가"
                            value={editedItem.outputPrice}
                            onChange={handleChange}
                          />
                        </NumberInputRoot>
                      </Field>
                      <Field label={"비고"}>
                        <Input
                          name="itemNote"
                          placeholder="비고"
                          value={editedItem.itemNote}
                          onChange={handleChange}
                        />
                      </Field>
                    </>
                  ) : (
                    <>
                      <Field label={"품목"}>
                        <Input readOnly value={item.itemCommonName} />
                      </Field>
                      <Field label={"담당업체"}>
                        <Input readOnly value={item.customerName} />
                      </Field>
                      <Field label={"규격"}>
                        <Input readOnly value={item.size} />
                      </Field>
                      <Field label={"단위"}>
                        <Input readOnly value={item.unit} />
                      </Field>
                      <Field label={"입고가"}>
                        <Input readOnly value={item.inputPrice} />
                      </Field>
                      <Field label={"출고가"}>
                        <Input readOnly value={item.outputPrice} />
                      </Field>
                      <Field label={"사용여부"}>
                        <Input
                          readOnly
                          value={item.itemActive ? "사용" : "미사용"}
                        />
                      </Field>
                      <Field label={"비고"}>
                        <Input readOnly value={item.itemNote} />
                      </Field>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </DialogBody>
          <DialogFooter>
            {isEditing ? (
              <HStack>
                <Button
                  onClick={handleSaveClick}
                  disabled={!isValid}
                  colorPalette={"blue"}
                >
                  저장
                </Button>
                <Button onClick={() => setIsEditing(false)}> 수정 취소</Button>
              </HStack>
            ) : (
              <HStack>
                <Button
                  onClick={() => setIsEditing(true)}
                  colorPalette={"blue"}
                >
                  수정
                </Button>
                {item[0]?.itemActive && (
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    colorPalette={"red"}
                  >
                    삭제
                  </Button>
                )}
              </HStack>
            )}
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      <HStack></HStack>

      <DialogConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="삭제 확인"
        body="해당 품목을 삭제하시겠습니까?"
      />
    </Box>
  );
}
