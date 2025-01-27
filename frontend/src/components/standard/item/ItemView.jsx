import React, { useEffect, useState } from "react";
import { Box, HStack, Input, Stack, Text } from "@chakra-ui/react";
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

export function ItemView({ itemKey, isOpen, onClose, setChange, setItemKey }) {
  const [item, setItem] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
          setEditedItem(res.data[0]);
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

  // 품목 삭제 시 사용여부 false
  // const handleDeleteConfirm = () => {
  //   axios
  //     .put(`/api/item/delete/${itemKey}`)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       toaster.create({
  //         description: data.message.text,
  //         type: data.message.type,
  //       });
  //       setChange((prev) => !prev);
  //     })
  //     .catch((e) => {
  //       const message = e.response.data.message;
  //       toaster.create({ description: message.text, type: message.type });
  //     });
  // };

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
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>물품 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {item.map((item) => (
              <Stack gap={"15px"}>
                <>
                  <Text fontSize={"xs"} mt={-5}>
                    품목과 담당업체는 수정이 불가능합니다.
                  </Text>
                  <Field label={"품목 "} orientation="horizontal">
                    <Input readOnly value={item.itemCommonName} />
                  </Field>
                  <Field label={"담당 업체"} orientation="horizontal">
                    <Input readOnly value={item.customerName || ""} />
                  </Field>
                  <Field label={"규격"} orientation="horizontal">
                    <Input
                      name="size"
                      placeholder="규격"
                      value={editedItem.size}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label={"단위"} orientation="horizontal">
                    <Input
                      name="unit"
                      placeholder="단위"
                      value={editedItem.unit}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label={"입고가"} orientation="horizontal">
                    <Input
                      type="number"
                      name="inputPrice"
                      value={editedItem.inputPrice}
                      onChange={handleChange}
                      min="1"
                    />
                  </Field>
                  <Field label={"출고가"} orientation="horizontal">
                    <Input
                      type="number"
                      name="outputPrice"
                      value={editedItem.outputPrice}
                      onChange={handleChange}
                      min="1"
                    />
                  </Field>
                  <Field label={"비고"} orientation="horizontal">
                    <Input
                      name="itemNote"
                      placeholder="비고"
                      value={editedItem.itemNote}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label={"사용 여부"} orientation="horizontal">
                    <Box ml={"86px"} style={{ position: "absolute" }}>
                      <Checkbox
                        name="itemActive"
                        checked={editedItem.itemActive}
                        onChange={(e) =>
                          setEditedItem((prevItem) => ({
                            ...prevItem,
                            itemActive: e.target.checked,
                          }))
                        }
                      />
                    </Box>
                  </Field>
                </>
              </Stack>
            ))}
          </DialogBody>
          <DialogFooter>
            <HStack>
              <DialogActionTrigger asChild>
                <Button variant="outline">취소</Button>
              </DialogActionTrigger>
              {!isValid ? (
                <Tooltip content="입력을 완료해주세요.">
                  <Button onClick={handleSaveClick} disabled={!isValid}>
                    저장
                  </Button>
                </Tooltip>
              ) : (
                <Button onClick={handleSaveClick} disabled={!isValid}>
                  저장
                </Button>
              )}
            </HStack>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
      {/*<DialogConfirmation*/}
      {/*  isOpen={isDialogOpen}*/}
      {/*  onClose={() => setIsDialogOpen(false)}*/}
      {/*  onConfirm={handleDeleteConfirm}*/}
      {/*  title="삭제 확인"*/}
      {/*  body="해당 품목을 삭제하시겠습니까?"*/}
      {/*/>*/}
    </Box>
  );
}
