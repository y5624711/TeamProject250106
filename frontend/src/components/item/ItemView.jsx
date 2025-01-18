import React, { useEffect, useState } from "react";
import { Box, HStack, Input } from "@chakra-ui/react";
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

export function ItemView({
  itemKey,
  setItemList,
  setSearchParams,
  setChange,
  isOpen,
  onClose,
}) {
  const [item, setItem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemActive: false,
    itemNote: "",
  });
  const [isValid, setIsValid] = useState(false);

  // 수정 상태에서 품목 정보 변경 시 수정 상태 해제
  useEffect(() => {
    setIsEditing(false);
  }, [itemKey]);

  // 품목 상세 정보를 가져오기
  useEffect(() => {
    if (itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setEditedItem(res.data[0]); // 첫 번째 품목 정보로 상태 설정
        })
        .catch((error) => {
          console.error("품목 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey]);

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    setIsEditing(true);
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
        setIsEditing(false);
        // 수정된 항목을 부모 컴포넌트에 전달하여 상태를 갱신
        setItemList((prevItems) =>
          prevItems.map((item) =>
            item.itemKey === itemKey ? { ...item, ...editedItem } : item,
          ),
        );
        // 수정 시에 정렬된 리스트를 불러오기 위해 변경 상태 전달
        setChange((prev) => !prev);

        setSearchParams((prev) => new URLSearchParams(prev));
        // 품목 수정 후, item를 직접 업데이트하여 view에 바로 반영되도록 함
        setItem((prevList) =>
          prevList.map((item) =>
            item.itemKey === itemKey ? { ...item, ...editedItem } : item,
          ),
        );
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
        // 삭제 후 부모 컴포넌트로 삭제된 항목을 반영
        setItemList((prevItems) =>
          prevItems.filter((item) => item.itemKey !== itemKey),
        );
        setIsDialogOpen(false);
        onClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 버튼 활성화를 위한 유효성 검사
  useEffect(() => {
    setIsValid(
      editedItem.itemCommonCode &&
        editedItem.customerName &&
        editedItem.inputPrice &&
        editedItem.outputPrice,
    );
  }, [
    editedItem.itemCommonCode,
    editedItem.customerName,
    editedItem.inputPrice,
    editedItem.outputPrice,
  ]);

  return (
    <Box>
      <DialogRoot open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>물품 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              {item.map((item) => (
                <Box key={item.itemKey}>
                  <Box>
                    {isEditing ? (
                      <>
                        <Field
                          label={"품목"}
                          required
                          helperText="품목 수정은 불가능합니다."
                        >
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
                <Button onClick={handleEditClick} colorPalette={"blue"}>
                  수정
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  colorPalette={"red"}
                >
                  삭제
                </Button>
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
