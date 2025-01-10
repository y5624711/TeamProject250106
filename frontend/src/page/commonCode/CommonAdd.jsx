import { Box, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import axios from "axios";
import { useState } from "react";
import { SideBar } from "../../components/tool/SideBar.jsx";

export function CommonAdd() {
  const [commonCode, setCommonCode] = useState("");

  const handleSaveClick = () => {
    axios.post("/api/commonCode/add", {});
  };

  return (
    <Box>
      <SideBar title={"공통코드"}>
        <Field label={"공통코드"}>
          <Input />
        </Field>
        <Field label={"코드명"}>
          <Input />
        </Field>
        <Field label={"비고"}>
          <Textarea />
        </Field>
        <Button onClick={handleSaveClick}></Button>
      </SideBar>
    </Box>
  );
}
