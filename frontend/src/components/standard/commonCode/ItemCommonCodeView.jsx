import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { DialogConfirmation } from "../../tool/DialogConfirmation.jsx";
import { toaster } from "../../ui/toaster.jsx";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";

export function ItemCommonCodeView({
  itemCommonCodeKey,
  isOpen,
  onClose,
  setChange,
  setItemCommonCodeKey,
}) {
  const [itemCommonCode, setItemCommonCode] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItemCommonCode, setEditedItemCommonCode] = useState({
    itemCommonCode: "",
    itemCommonName: "",
    itemCommonCodeNote: "",
  });

  // 품목 공통 코드 상세 정보 가져오기
  useEffect(() => {
    if (itemCommonCodeKey) {
      axios
        .get(`/api/commonCode/item/view/${itemCommonCodeKey}`)
        .then((res) => {
          setItemCommonCode(res.data);
          setEditedItemCommonCode(res.data[0]);
        })
        .catch((error) => {
          console.error("품목 공통 코드 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemCommonCodeKey]);

  // 창이 닫히면 수정 상태 취소
  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItemCommonCode((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const isValid =
    /^[A-Z]{3}$/.test(editedItemCommonCode.itemCommonCode) &&
    editedItemCommonCode.itemCommonName.trim() !== "";

  // 수정된 품목 공통 코드 데이터 서버로 전송
  const handleSaveClick = () => {
    if (!isValid) {
      toaster.create({
        description: "품목 코드는 대문자 3자리로 입력해야 합니다.",
        type: "error",
      });
      return;
    }
    axios
      .put(
        `/api/commonCode/item/edit/${itemCommonCodeKey}`,
        editedItemCommonCode,
      )
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setItemCommonCode([{ ...editedItemCommonCode }]);
        setIsEditing(false);
        setItemCommonCodeKey(itemCommonCodeKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 품목 공통 코드 삭제 시 사용여부 false
  const handleDeleteConfirm = () => {
    axios
      .put(`/api/commonCode/item/delete/${itemCommonCodeKey}`)
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
      <DialogRoot open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>품목 코드 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              {itemCommonCode.map((item) => (
                <Box>
                  {isEditing ? (
                    <>
                      <Text fontSize={"xs"} mt={-5}>
                        품목 코드는 대문자 3자리로 입력해야 합니다.
                      </Text>
                      <Field label={"물품 코드"} required>
                        <Input
                          name="itemCommonCode"
                          placeholder="물품 코드"
                          value={editedItemCommonCode.itemCommonCode}
                          onChange={handleChange}
                          maxLength={3}
                        />
                      </Field>
                      <Field label={"물품명"} required>
                        <Input
                          name="itemCommonName"
                          placeholder="물품명"
                          value={editedItemCommonCode.itemCommonName}
                          onChange={handleChange}
                        />
                      </Field>
                      <Field label={"비고"}>
                        <Input
                          name="itemCommonCodeNote"
                          placeholder="비고"
                          value={editedItemCommonCode.itemCommonCodeNote}
                          onChange={handleChange}
                        />
                      </Field>
                    </>
                  ) : (
                    <>
                      <Field label={"품목 코드"}>
                        <Input readOnly value={item.itemCommonCode} />
                      </Field>
                      <Field label={"품목명"}>
                        <Input readOnly value={item.itemCommonName} />
                      </Field>
                      <Field label={"사용여부"}>
                        <Input
                          readOnly
                          value={item.itemCommonCodeActive ? "사용" : "미사용"}
                        />
                      </Field>
                      <Field label={"비고"}>
                        <Input readOnly value={item.itemCommonCodeNote} />
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
                {itemCommonCode[0]?.itemCommonCodeActive && (
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
