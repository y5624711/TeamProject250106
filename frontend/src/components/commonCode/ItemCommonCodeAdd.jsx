import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import { toaster } from "../ui/toaster.jsx";
import axios from "axios";

export function ItemCommonCodeAdd({
  onCancel,
  onAdd,
  setItemCommonCodeKey,
  setChange,
}) {
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [itemCommonName, setItemCommonName] = useState("");
  const [itemCommonCodeNote, setItemCommonCodeNote] = useState("");
  const [isValid, setIsValid] = useState(false);

  // 품목 공통 코드는 영문 대문자 3자리, 코드명은 입력되어야 버튼 활성화
  useEffect(() => {
    setIsValid(
      /^[A-Z]{3}$/.test(itemCommonCode) && itemCommonName.trim() !== "",
    );
  }, [itemCommonCode, itemCommonName]);

  // 품목 공통 코드 등록하기
  const handleAddClick = () => {
    if (!/^[A-Z]{3}$/.test(itemCommonCode)) {
      toaster.create({
        description: "품목 코드는 대문자 3자리로 입력해야 합니다.",
        type: "error",
      });
      return;
    }

    const itemData = {
      itemCommonCode,
      itemCommonName,
      itemCommonCodeNote,
    };

    axios
      .post("/api/commonCode/item/add", itemData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(itemData);
        setItemCommonCodeKey(data.data.itemKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <Box>
      <Button onClick={onCancel}>취소</Button>
      <Stack>
        <Field
          label={"품목 코드"}
          required
          helperText="품목 코드는 영문 대문자 3자리로 입력하세요."
        >
          <Input
            placeholder="품목 코드"
            value={itemCommonCode}
            onChange={(e) => setItemCommonCode(e.target.value)}
            maxLength={3}
          />
        </Field>

        <Field label={"품목명"} required>
          <Input
            placeholder="품목명"
            value={itemCommonName}
            onChange={(e) => setItemCommonName(e.target.value)}
          />
        </Field>
        <Field label={"비고"}>
          <Input
            placeholder="비고"
            value={itemCommonCodeNote}
            onChange={(e) => setItemCommonCodeNote(e.target.value)}
          />
        </Field>

        <Button onClick={handleAddClick} disabled={!isValid}>
          등록
        </Button>
      </Stack>
    </Box>
  );
}
