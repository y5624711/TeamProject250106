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

export function EmployeeAdd() {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [selectedCommonCode, setSelectedCommonCode] = useState();
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [note, setNote] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const navigate = useNavigate();
  const [departMent, setDepartMent] = useState("");

  // 이거 백으로 가져와야 하나  흠 ,
  const frameworks = createListCollection({
    items: [
      { label: "가맹점", value: "B" },
      { label: "협력업체", value: "P" },
      { label: "직원", value: "M" },
    ],
  });

  // 이거 그러면  보일때는 그렇게 하는데 추가할때는 개인이 개인
  function handleMemberAdd() {
    axios
      .post("/api/employee/add", {
        // 배열로 들어오는데 그거 제거  해주는 코드
        employeeCommonCode: selectedCommonCode.join(""),
        employeeWorkPlaceCode: workPlace,
        employeeNo: id,
        employeeName: name,
        employeeTel: tel,
        employeeNote: note,
      })
      .then(() => {
        setId("");
        setSelectedCommonCode("");
        setPassword("");
        setTel("");
        setWorkPlace("");
        setDepartMent("");
        setNote("");
      });
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
          placeholder={"소속 코드 / 소속 명"}
          value={workPlace}
          onChange={(e) => {
            setWorkPlace(e.target.value);
          }}
        />
        <Input
          placeholder={"부서 코드 / 부서 명"}
          value={departMent}
          onChange={(e) => {
            setDepartMent(e.target.value);
          }}
        />

        <Input
          placeholder={"직원명"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder={"사번"}
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Input
          placeholder={"전화번호"}
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
        />
        <Input
          placeholder={"비고"}
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
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
