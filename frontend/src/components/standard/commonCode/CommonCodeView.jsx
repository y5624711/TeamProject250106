import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  HStack,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
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
import { SelectViewCode } from "./SelectViewCode.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";

export function CommonCodeView({
  commonCodeKey,
  isOpen,
  onClose,
  setChange,
  setCommonCodeKey,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCommonCode, setEditCommonCode] = useState(null);

  const [editedCommonCode, setEditedCommonCode] = useState({
    commonCode: "",
    commonCodeName: "",
    commonCodeNote: "",
    commonCodeType: "",
    commonCodeActive: false,
  });

  const selectOptions = createListCollection({
    items: [
      { label: "시스템코드", value: "SYSTEM" },
      { label: "물품코드", value: "ITEM" },
    ],
  });

  // 품목 공통 코드 상세 정보 가져오기
  useEffect(() => {
    if (commonCodeKey) {
      axios
        .get(`/api/commonCode/view/${commonCodeKey}`)
        .then((res) => {
          setEditCommonCode(res.data);
          setEditedCommonCode(res.data[0]);
        })
        .catch((error) => {
          console.error("품목 공통 코드 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [commonCodeKey]);

  // 창이 닫히면 수정 상태 취소
  const handleClose = () => {
    onClose();
    setEditedCommonCode(null);
    setCommonCodeKey(null);
  };

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCommonCode((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // SelectCode에서 선택된 값을 반영하는 함수
  const handleCodeTypeChange = (value) => {
    // 배열이 아닌 단일 값으로 처리
    const stringValue = Array.isArray(value) ? value.join(",") : value; // 필요 시 배열을 문자열로 변환
    setEditedCommonCode((prev) => ({ ...prev, commonCodeType: stringValue }));
  };

  const isValid =
    (editedCommonCode != null &&
      editedCommonCode.commonCodeType === "ITEM" &&
      /^[A-Z]{3}$/.test(editedCommonCode.commonCode)) ||
    (editedCommonCode != null &&
      editedCommonCode.commonCodeType === "SYSTEM" &&
      /^[A-Z]{3,5}$/.test(editedCommonCode.commonCode) &&
      editedCommonCode.commonCodeName.trim() !== "");

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
      .put(`/api/commonCode/edit/${commonCodeKey}`, editedCommonCode)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setCommonCodeKey(commonCodeKey);
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 품목 공통 코드 삭제 시 사용여부 false
  const handleDeleteConfirm = () => {
    axios
      .put(`/api/commonCode/delete/${commonCodeKey}`)
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

  console.log(editCommonCode);

  if (!editedCommonCode) {
    return;
  }

  return (
    <Box>
      <DialogRoot open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>품목 코드 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              <Box>
                <Text fontSize={"xs"} mt={-5}>
                  품목 코드는 대문자 3자리로 입력해야 합니다.
                </Text>

                <Flex>
                  {/*코드 종류 선택*/}
                  <SelectViewCode
                    selectOptions={selectOptions}
                    onChange={handleCodeTypeChange}
                    value={editedCommonCode.commonCodeType || ""}
                  />
                  <Spacer />
                  <Checkbox
                    size={"lg"}
                    checked={editedCommonCode.commonCodeActive}
                    onChange={(e) =>
                      setEditedCommonCode((prev) => ({
                        ...prev,
                        commonCodeActive: e.target.checked,
                      }))
                    }
                  >
                    사용여부
                  </Checkbox>
                </Flex>

                <Field label={"물품 코드"} required>
                  <Input
                    name="commonCode"
                    placeholder="물품 코드"
                    value={editedCommonCode.commonCode || ""}
                    onChange={handleChange}
                    maxLength={3}
                  />
                </Field>
                <Field label={"물품명"} required>
                  <Input
                    name="commonCodeName"
                    placeholder="물품명"
                    value={editedCommonCode.commonCodeName || ""}
                    onChange={handleChange}
                  />
                </Field>
                <Field label={"비고"}>
                  <Input
                    name="commonCodeNote"
                    placeholder="비고"
                    value={editedCommonCode.commonCodeNote || ""}
                    onChange={handleChange}
                  />
                </Field>
              </Box>
            </Box>
          </DialogBody>
          <DialogFooter>
            <HStack>
              <Button
                onClick={handleSaveClick}
                disabled={!isValid}
                colorPalette={"blue"}
              >
                저장
              </Button>
              <Button onClick={handleClose}>취소</Button>
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
