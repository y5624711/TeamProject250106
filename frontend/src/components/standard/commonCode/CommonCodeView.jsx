import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  createListCollection,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
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
import { Checkbox } from "../../ui/checkbox.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SelectCode } from "./SelectCode.jsx";

export function CommonCodeView({
  commonCodeKey,
  isOpen,
  onClose,
  setChange,
  setCommonCodeKey,
}) {
  const [editedCommonCode, setEditedCommonCode] = useState({
    commonCode: "",
    commonCodeName: "",
    commonCodeNote: "",
    commonCodeType: "",
    commonCodeActive: false,
  });

  const selectOptions = createListCollection({
    items: [
      { label: "시스템 코드", value: "SYSTEM" },
      { label: "품목 코드", value: "ITEM" },
    ],
  });

  // 공통 코드 상세 정보 가져오기
  useEffect(() => {
    if (commonCodeKey) {
      axios
        .get(`/api/commonCode/view/${commonCodeKey}`)
        .then((res) => {
          setEditedCommonCode(res.data[0]);
        })
        .catch((error) => {
          console.error("공통 코드 정보 요청 중 오류 발생: ", error);
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
    const updatedCommonCode = {
      ...editedCommonCode,
    };

    axios
      .put(`/api/commonCode/edit/${commonCodeKey}`, updatedCommonCode)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setCommonCodeKey(commonCodeKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  if (!editedCommonCode) {
    return;
  }

  return (
    <Box>
      <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공통 코드 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box>
              <Text fontSize={"xs"} mt={-5} mb={3}>
                시스템코드는 대문자 3~5자리, 품목 코드는 대문자 3자리로 입력해야
                합니다.
              </Text>
              <Stack gap="15px">
                <SelectCode
                  selectOptions={selectOptions}
                  onChange={handleCodeTypeChange}
                  value={editedCommonCode.commonCodeType}
                />
                <Field label={"코드"} orientation="horizontal">
                  <Input
                    name="commonCode"
                    placeholder="코드"
                    value={editedCommonCode.commonCode}
                    onChange={handleChange}
                    maxLength={3}
                  />
                </Field>
                <Field label={"코드명"} orientation="horizontal">
                  <Input
                    name="commonCodeName"
                    placeholder="코드명"
                    value={editedCommonCode.commonCodeName}
                    onChange={handleChange}
                  />
                </Field>
                <Field label={"비고"} orientation="horizontal">
                  <Textarea
                    name="commonCodeNote"
                    placeholder=""
                    value={editedCommonCode.commonCodeNote}
                    onChange={handleChange}
                    maxHeight={"100px"}
                  />
                </Field>
                <Field label={"사용 여부"} orientation="horizontal" mb={15}>
                  <Checkbox
                    style={{ marginRight: "550px" }}
                    defaultChecked={editedCommonCode.commonCodeActive}
                    onChange={(e) =>
                      setEditedCommonCode((prev) => ({
                        ...prev,
                        commonCodeActive: e.target.checked,
                      }))
                    }
                  />
                </Field>
              </Stack>
            </Box>
          </DialogBody>
          <DialogFooter>
            <HStack>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Tooltip
                content="입력을 완료해주세요."
                openDelay={500}
                closeDelay={100}
                disabled={isValid}
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
