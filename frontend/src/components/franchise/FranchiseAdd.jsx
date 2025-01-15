import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../ui/toaster.jsx";

export function FranchiseAdd() {
  const [franchise, setFranchise] = useState({
    businessEmployeeNo: "",
    franchiseName: "",
    franchiseCode: "",
    franchiseRep: "",
    franchiseNo: "",
    franchiseTel: "",
    franchiseAddress: "",
    franchiseAddressDetail: "",
    franchisePost: "",
    franchiseState: "",
    franchiseCity: "",
    franchiseNote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .post("/api/franchise/add", franchise)
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .catch((e) => {
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
          <Text>본사 직원 사번</Text>
          <Input
            name="businessEmployeeNo"
            value={franchise.businessEmployeeNo}
            onChange={handleChange}
            placeholder="본사 직원 사번을 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점명</Text>
          <Input
            name="franchiseName"
            value={franchise.franchiseName}
            onChange={handleChange}
            placeholder="가맹점명을 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점 코드</Text>
          <Input
            name="franchiseCode"
            value={franchise.franchiseCode}
            onChange={handleChange}
            placeholder="가맹점 코드를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점주</Text>
          <Input
            name="franchiseRep"
            value={franchise.franchiseRep}
            onChange={handleChange}
            placeholder="가맹점주를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>사업자 번호</Text>
          <Input
            name="franchiseNo"
            value={franchise.franchiseNo}
            onChange={handleChange}
            placeholder="사업자 번호를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>전화번호</Text>
          <Input
            name="franchiseTel"
            value={franchise.franchiseTel}
            onChange={handleChange}
            placeholder="전화번호를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>주소</Text>
          <Input
            name="franchiseAddress"
            value={franchise.franchiseAddress}
            onChange={handleChange}
            placeholder="주소를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>상세 주소</Text>
          <Input
            name="franchiseAddressDetail"
            value={franchise.franchiseAddressDetail}
            onChange={handleChange}
            placeholder="상세 주소를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>우편 번호</Text>
          <Input
            name="franchisePost"
            value={franchise.franchisePost}
            onChange={handleChange}
            placeholder="우편 번호를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>광역시도</Text>
          <Input
            name="franchiseState"
            value={franchise.franchiseState}
            onChange={handleChange}
            placeholder="광역시도를 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>시군</Text>
          <Input
            name="franchiseCity"
            value={franchise.franchiseCity}
            onChange={handleChange}
            placeholder="시군을 입력하세요"
          />
        </Box>
        <Box mb={4}>
          <Text>비고</Text>
          <Input
            name="franchiseNote"
            value={franchise.franchiseNote}
            onChange={handleChange}
            placeholder="비고를 입력하세요"
          />
        </Box>
        <Button onClick={handleSaveClick}>등록</Button>
      </Box>
    </Box>
  );
}
