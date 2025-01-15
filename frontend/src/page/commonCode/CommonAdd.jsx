import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../../components/ui/toaster.jsx";

export function CommonAdd() {
  const [commonCode, setCommonCode] = useState("");
  const [codeName, setCodeName] = useState("");
  const [codeNote, setCodeNote] = useState("");

  const handleSaveClick = () => {
    axios
      .post("/api/commonCode/system/add", {
        common_code: commonCode,
        common_code_name: codeName,
        common_code_note: codeNote,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({ type: message.type, description: message.text });
      });
  };

  return (
    <Box>
      <Field label={"공통코드"}>
        <Input
          value={commonCode}
          onChange={(e) => setCommonCode(e.target.value)}
          placeholder={"공통코드를 입력해 주세요"}
        />
      </Field>
      <Field label={"코드명"}>
        <Input
          value={codeName}
          onChange={(e) => setCodeName(e.target.value)}
          placeholder={"공통코드의 이름을 입력해 주세요"}
        />
      </Field>
      <Field label={"비고"}>
        <Textarea
          value={codeNote}
          onChange={(e) => setCodeNote(e.target.value)}
          resize={"none"}
        />
      </Field>
      <Button onClick={handleSaveClick}></Button>
    </Box>
  );
}
