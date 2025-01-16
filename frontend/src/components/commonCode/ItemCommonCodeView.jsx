import React from "react";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";

export function ItemCommonCodeView(props) {
  return (
    <Box>
      <Field label={"품목코드"}>
        <Input readOnly value={"품목코드"} />
      </Field>
      <Field label={"품목명"}>
        <Input readOnly value={"품목명"} />
      </Field>
      <Field label={"비고"}>
        <Input readOnly value={"비고"} />
      </Field>
    </Box>
  );
}
