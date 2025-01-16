import React, { useState } from "react";
import { Button } from "../ui/button.jsx";
import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";

export function ItemCommonCodeAdd(props) {
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [itemCommonName, setItemCommonName] = useState("");
  const [itemCommonNote, setItemCommonNote] = useState("");

  return (
    <Box>
      <Button onClick={onCancel}>취소</Button>
      <Stack>
        <Field label={"품목 코드"}>
          <Input
            placeholder="품목 코드"
            value={itemCommonCode}
            onChange={(e) => setItemCommonCode(e.target.value)}
          />
        </Field>
        <Field label={"품목명"}>
          <Input
            placeholder="품목명"
            value={itemCommonName}
            onChange={(e) => setItemCommonName(e.target.value)}
          />
        </Field>
        <Field label={"비고"}>
          <Input
            placeholder="비고"
            value={itemCommonNote}
            onChange={(e) => setItemCommonNote(e.target.value)}
          />
        </Field>

        <Button>등록</Button>
      </Stack>
    </Box>
  );
}
