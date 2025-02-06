import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
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
import { Checkbox } from "../../ui/checkbox.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function CommonCodeView({
  commonCodeKey,
  isOpen,
  onClose,
  setChange,
  setCommonCodeKey,
}) {
  const [commonCode, setCommonCode] = useState(null);

  const selectOptions = [
    { label: "품목 코드", value: "ITEM" },
    { label: "기준 코드", value: "STANDARD" },
    { label: "상태 코드", value: "STATE" },
  ];

  // 공통 코드 상세 정보 가져오기
  useEffect(() => {
    if (commonCodeKey && isOpen) {
      axios
        .get(`/api/commonCode/view/${commonCodeKey}`)
        .then((res) => {
          setCommonCode(res.data);
        })
        .catch((error) => {
          console.error("공통 코드 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [commonCodeKey, isOpen]);

  console.log(commonCode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommonCode((prevCode) => ({
      ...prevCode,
      [name]: value,
    }));
  };

  const handleCodeTypeChange = (selectedValue) => {
    setCommonCode((prev) => ({
      ...prev,
      commonCodeType: selectedValue.value[0],
    }));
  };

  // 수정된 품목 공통 코드 데이터 서버로 전송
  const handleSaveClick = () => {
    axios
      .put(`/api/commonCode/edit/${commonCodeKey}`, commonCode)
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

  const isValid =
    commonCode &&
    (commonCode.commonCodeType === "ITEM" ||
      (commonCode.commonCodeType === "STANDARD" &&
        /^[A-Z]{3}$/.test(commonCode.commonCode)) ||
      (commonCode.commonCodeType === "STATE" &&
        /^[A-Z]{3,5}$/.test(commonCode.commonCode) &&
        commonCode.commonCodeName.trim() !== ""));

  if (!commonCode) {
    return;
  }

  return (
    <Box>
      <DialogRoot
        open={isOpen}
        onOpenChange={() => {
          onClose();
        }}
        size="lg"
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공통 코드 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text fontSize={"xs"} mt={-5} mb={3}>
              {commonCode.commonCodeType === "ITEM" ||
              commonCode.commonCodeType === "STANDARD"
                ? "품목/기준 코드는 대문자 3자리로 입력해야 합니다."
                : commonCode.commonCodeType === "STATE"
                  ? "상태 코드는 대문자 3~5자리로 입력해야 합니다."
                  : ""}
            </Text>
            <Stack gap="15px">
              <Field label={"코드 구분"} orientation="horizontal">
                <SelectRoot onValueChange={handleCodeTypeChange}>
                  <SelectTrigger>
                    <SelectValueText>
                      {commonCode.commonCodeType || "코드 구분 선택"}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      width: "85%",
                      top: "40px",
                      position: "absolute",
                    }}
                  >
                    {selectOptions.map((option) => (
                      <SelectItem key={option.value} item={option.value}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field label={"코드"} orientation="horizontal">
                <Input
                  name="commonCode"
                  placeholder="코드"
                  value={commonCode.commonCode}
                  onChange={handleChange}
                  maxLength={5}
                />
              </Field>
              <Field label={"코드명"} orientation="horizontal">
                <Input
                  name="commonCodeName"
                  placeholder="코드명"
                  value={commonCode.commonCodeName}
                  onChange={handleChange}
                />
              </Field>
              <Field label={"비고"} orientation="horizontal">
                <Textarea
                  name="commonCodeNote"
                  placeholder={"최대 50자"}
                  value={commonCode.commonCodeNote}
                  onChange={handleChange}
                  maxHeight={"100px"}
                />
              </Field>
              <Field label={"사용 여부"} orientation="horizontal">
                <Checkbox
                  style={{ marginRight: "550px" }}
                  checked={commonCode.commonCodeActive}
                  onCheckedChange={(e) =>
                    setCommonCode((prev) => ({
                      ...prev,
                      commonCodeActive: e.checked,
                    }))
                  }
                  disabled={
                    commonCode.usedCommonCodeByCustomer > 0 ||
                    commonCode.commonCodeType === "STATE" ||
                    commonCode.commonCodeType === "STANDARD"
                  }
                />
              </Field>
              {(commonCode.usedCommonCodeByCustomer > 0 ||
                commonCode.commonCodeType === "STATE" ||
                commonCode.commonCodeType === "STANDARD") && (
                <Text fontSize={"xs"} mb={18} mt={-2} ml={"85px"}>
                  {commonCode.commonCodeType === "STATE"
                    ? "STATE 코드는 사용 여부를 변경할 수 없습니다."
                    : commonCode.commonCodeType === "STANDARD"
                      ? "STANDARD 코드는 사용 여부를 변경할 수 없습니다."
                      : "협력업체가 사용 중인 품목 코드는 사용 여부를 변경할 수 없습니다."}
                </Text>
              )}
            </Stack>
          </DialogBody>
          <DialogFooter>
            <HStack>
              <DialogActionTrigger asChild>
                <Button variant="outline">취소</Button>
              </DialogActionTrigger>
              <Tooltip
                content="입력을 완료해주세요."
                openDelay={100}
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
