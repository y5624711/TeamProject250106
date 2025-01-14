import {
  Box,
  createListCollection,
  Heading,
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
import { useNavigate } from "react-router-dom";

export function AccountAdd() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [selectedCommonCode, setSelectedCommonCode] = useState();
  const navigate = useNavigate();

  // 이거 백으로 가져와야 하나  흠 ,
  const frameworks = createListCollection({
    items: [
      { label: "가맹점", value: "B" },
      { label: "협력업체", value: "P" },
      { label: "직원", value: "M" },
    ],
  });

  function handleMemberAdd() {
    axios.post("/api/account/add", {
      accountId: id,
      password: password,
      // 배열로 들어오는데 그거 제거  해주는 코드
      commonCode: selectedCommonCode.join(""),
    });
    setId("");
    setSelectedCommonCode("");
    setPassword("");
  }

  return (
    <Box>
      <Heading> 회원 등록</Heading>
      <Stack>
        <SelectRoot
          collection={frameworks}
          value={selectedCommonCode}
          onValueChange={(e) => setSelectedCommonCode(e.value)}
        >
          <SelectLabel> 상위 구분 코드</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder={"선택 해 주세요"} />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((code) => (
              <SelectItem item={code} key={code.value}>
                {code.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
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
      <Button
        onClick={() => {
          handleMemberAdd();
          //
          navigate();
        }}
      >
        회원 등록
      </Button>
    </Box>
  );
}
