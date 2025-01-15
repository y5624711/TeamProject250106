import { useEffect, useState } from "react";
import axios from "axios";
import { Box, HStack, Input, Spinner, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import { EmployeeList } from "./EmployeeList.jsx";
import { Button } from "../ui/button.jsx";

export function BusinessAndEmployeeList() {
  const [business, setBusiness] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [business_name, setBusiness_name] = useState("");
  const [business_rep, setBusiness_rep] = useState("");
  const [business_no, setBusiness_no] = useState("");
  const [business_tel, setBusiness_tel] = useState("");
  const [business_fax, setBusiness_fax] = useState("");
  const [business_address, setBusiness_address] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/business/list")
      .then((res) => res.data)
      .then((data) => {
        setBusiness(data["회사"]);
        setEmployee(data["사원"]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Stack w={"70%"}>
        <Box p={5} bgColor={"gray.200"}>
          <Field label={"회사명"}>
            <Input
              borderColor="black" // 외곽선 색상
              _hover={{ borderColor: "black" }} // 호버 상태에서 검은 외곽선 유지
              _focus={{
                borderColor: "black", // 포커스 상태에서도 검은 외곽선 유지
                boxShadow: "0 0 0 1px black", // 검은 외곽선 스타일
              }}
              value={business.business_name}
              onChange={(e) => setBusiness_name(e.target.value)}
            />
          </Field>
          {/*<HStack>*/}
          {/*  <Field label={"대표"}>*/}
          {/*    <Input value={business.business_rep} />*/}
          {/*  </Field>*/}
          {/*  <Field label={"사업자번호"}>*/}
          {/*    <Input value={business.business_no} />*/}
          {/*  </Field>*/}
          {/*</HStack>*/}
          {/*<HStack>*/}
          {/*  <Field label={"대표 전화번호"}>*/}
          {/*    <Input value={business.business_tel} />*/}
          {/*  </Field>*/}
          {/*  <Field label={"팩스번호"}>*/}
          {/*    <Input value={business.business_fax} />*/}
          {/*  </Field>*/}
          {/*</HStack>*/}
          {/*<Field label={"주소"}>*/}
          {/*  <Input value={business.business_address} />*/}
          {/*</Field>*/}
          <HStack>
            <Button onClick={() => {}}>수정</Button>
            <Button>저장</Button>
          </HStack>
        </Box>

        <EmployeeList data={employee}></EmployeeList>
      </Stack>
    </Box>
  );
}
