import {
  Box,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "../ui/button.jsx";
import axios from "axios";

export function MemberAdd() {
  const [member, setMember] = useState({});
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [selectedCommonCode, setSelectedCommonCode] = useState();

  const frameworks = createListCollection({
    items: [
      { label: "가맹점", value: "B" },
      { label: "협력업체", value: "P" },
      { label: "직원", value: "M" },
    ],
  });

  function handleMemberAdd() {
    axios.post("/api/member/add", {
      memberId: id,
      password: password,
      commonCode: selectedCommonCode.join(""),
    });
  }

  return (
    <Box border={"1px solid black"}>
      입력해야 하는 정보는 , 회원 번호 , 비밀번호 ,공통 코드
      <Stack>
        <Input
          placeholder={"회원 번호 ,아이디 입력"}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Input
          placeholder={"비밀번호"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Stack>
      {id}
      {password}
      <SelectRoot
        collection={frameworks}
        value={selectedCommonCode}
        onValueChange={(e) => setSelectedCommonCode(e.value)}
      >
        <SelectLabel> 상위 구분 코드</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder={"가맹점 번호를 선택해주세요"} />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((code) => (
            <SelectItem item={code} key={code.value}>
              {code.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Button onClick={() => handleMemberAdd()}>회원 등록</Button>
      <Button onClick={() => {}}> 회원 수정 </Button>
      <Button> 회원 삭제</Button>
    </Box>
  );
}
