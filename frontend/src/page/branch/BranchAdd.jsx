import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../../components/ui/toaster.jsx";

export function BranchAdd() {
  const [branch, setBranch] = useState({
    managerId: "",
    commonCode: "",
    name: "",
    representative: "",
    tel: "",
    fax: "",
    post: "",
    city1: "",
    city2: "",
    address: "",
    details: "",
    size: "",
  });

  // 입력 값 변경 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranch((prevBranch) => ({
      ...prevBranch,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .post("api/branch/add", branch)
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .catch((e) => {
        // 오류 시, 실제로 응답 데이터를 로그로 출력해봅니다.
        console.log(e);
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  return (
    <Box>
      <Box maxW="500px" mx="auto" p={4}>
        <Box mb={4}>
          <Text>공통 코드</Text>
          <Input
            name="commonCode"
            value={branch.commonCode}
            onChange={handleChange}
            placeholder="코드 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>관리자 번호</Text>
          <Input
            name="managerId"
            value={branch.managerId}
            onChange={handleChange}
            placeholder="관리자 번호 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점명</Text>
          <Input
            name="name"
            value={branch.name}
            onChange={handleChange}
            placeholder="가맹점명을 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>우편번호</Text>
          <Input
            name="post"
            value={branch.post}
            onChange={handleChange}
            placeholder="우편번호를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>주소</Text>
          <Input
            name="address"
            value={branch.address}
            onChange={handleChange}
            placeholder="주소를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>상세주소</Text>
          <Input
            name="details"
            value={branch.details}
            onChange={handleChange}
            placeholder="상세주소를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>광역시도</Text>
          <Input
            name="city1"
            value={branch.city1}
            onChange={handleChange}
            placeholder="광역시도를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>시군</Text>
          <Input
            name="city2"
            value={branch.city2}
            onChange={handleChange}
            placeholder="시군을 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>대표자</Text>
          <Input
            name="representative"
            value={branch.representative}
            onChange={handleChange}
            placeholder="대표자를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>대표번호</Text>
          <Input
            name="tel"
            value={branch.tel}
            onChange={handleChange}
            placeholder="대표번호를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>팩스</Text>
          <Input
            name="fax"
            value={branch.fax}
            onChange={handleChange}
            placeholder="팩스를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점 평수</Text>
          <Input
            name="size"
            value={branch.size}
            onChange={handleChange}
            placeholder="가맹점 평수를 입력하세요"
          />
        </Box>
        <Button onClick={handleSaveClick}>등록</Button>
      </Box>
    </Box>
  );
}
