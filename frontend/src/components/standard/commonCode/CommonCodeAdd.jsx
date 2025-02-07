import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import {
  Box,
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
import { toaster } from "../../ui/toaster.jsx";
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
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function CommonCodeAdd({ isOpen, onClose, onAdd, setChange }) {
  const selectOptions = [
    { label: "품목 코드", value: "ITEM" },
    { label: "기준 코드", value: "STANDARD" },
    { label: "상태 코드", value: "STATE" },
  ];

  const initialCodeData = {
    commonCode: "",
    commonCodeName: "",
    commonCodeNote: "",
    commonCodeType: "",
  };
  const [codeData, setCodeData] = useState(initialCodeData);
  const [checkCodeSelect, setCheckCodeSelect] = useState(false);
  const [codeType, setCodeType] = useState("");

  // 창이 닫히면 입력 내용 초기화
  const handleClose = () => {
    setCodeData(initialCodeData);
    setCheckCodeSelect(false);
    setCodeType("");
    onClose();
  };

  // input 입력 받기
  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setCodeData((prev) => ({ ...prev, [field]: value }));
  };

  // 코드 타입 선택 처리
  const handleCodeTypeChange = (selectedValue) => {
    setCodeType(selectedValue.value[0]);
    setCodeData((prev) => ({
      ...prev,
      commonCodeType: selectedValue.value[0],
    }));
    setCheckCodeSelect(true);
  };

  const isValid =
    (codeType === "ITEM"
      ? /^[A-Z]{3}$/.test(codeData.commonCode)
      : /^[A-Z]{3,5}$/.test(codeData.commonCode)) &&
    codeData.commonCodeName.trim() !== "" &&
    checkCodeSelect;

  // 공통 코드 등록하기
  const handleAddClick = () => {
    axios
      .post("/api/commonCode/add", codeData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(codeData);
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>코드 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box css={{ "--field-label-width": "85px" }}>
            <Text fontSize={"xs"} mt={-5} mb={3}>
              {codeType === "ITEM" || codeType === "STANDARD"
                ? "품목/기준 코드는 대문자 3자리로 입력해야 합니다."
                : codeType === "STATE"
                  ? "싱태 코드는 대문자 3~5자리로 입력해야 합니다."
                  : "  "}
            </Text>
            <Stack gap={"15px"}>
              <Field
                label={<SpacedLabel text="코드 구분" req />}
                orientation="horizontal"
                required
              >
                <SelectRoot onValueChange={handleCodeTypeChange}>
                  <SelectTrigger>
                    <SelectValueText>
                      {codeType || "코드 구분 선택"}
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
              <Field
                label={<SpacedLabel text="코드" req />}
                orientation="horizontal"
                required
              >
                <Input
                  value={codeData.commonCode || ""}
                  onChange={handleInputChange("commonCode")}
                  maxLength={
                    codeType === "ITEM" || codeType === "STANDARD"
                      ? 3
                      : codeType === "SYSTEM"
                        ? 5
                        : undefined
                  }
                />
              </Field>
              <Field
                label={<SpacedLabel text="코드명" req />}
                orientation="horizontal"
                required
              >
                <Input
                  value={codeData.commonCodeName || ""}
                  onChange={handleInputChange("commonCodeName")}
                />
              </Field>
              <Field
                label={<SpacedLabel text="비고" />}
                orientation="horizontal"
              >
                <Textarea
                  resize={"none"}
                  maxLength={50}
                  placeholder="최대 50자"
                  value={codeData.commonCodeNote || ""}
                  onChange={handleInputChange("commonCodeNote")}
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
            openDelay={100}
            closeDelay={100}
            disabled={isValid}
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
