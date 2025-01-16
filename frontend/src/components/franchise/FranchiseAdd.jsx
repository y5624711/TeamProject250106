import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../ui/toaster.jsx";

export function FranchiseAdd({
  setViewMode,
  setSelectedFranchiseKey,
  setFranchises,
}) {
  const [franchise, setFranchise] = useState({
    businessEmployeeNo: "",
    businessEmployeeName: "",
    franchiseCode: "",
    franchiseName: "",
    franchiseRep: "",
    franchiseNo: "",
    franchiseTel: "",
    franchiseAddress: "",
    franchiseAddressDetail: "",
    franchisePost: "",
    franchiseState: "",
    franchiseCity: "",
    franchiseActive: true,
    franchiseNote: "",
  });
  const [franchiseKey, setFranchiseKey] = useState(null); // 가맹점의 key를 관리

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

        // 가맹점 추가 후 부모 컴포넌트에 가맹점 리스트 업데이트
        if (res.data && res.data.franchiseKey) {
          // 새로 추가된 가맹점 추가
          setFranchises((prevFranchises) => [...prevFranchises, res.data]);
          setSelectedFranchiseKey(res.data.franchiseKey); // 선택된 가맹점 키 설정
          setViewMode("view"); // 뷰모드로 전환
        }
      })
      .catch((e) => {
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
            placeholder="본사 직원 사번"
          />
        </Box>
        <Box mb={4}>
          <Text>본사 직원 이름</Text>
          <Input
            name="businessEmployeeName"
            value={franchise.businessEmployeeName}
            onChange={handleChange}
            placeholder="본사 직원 이름"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점 코드</Text>
          <Input
            name="franchiseCode"
            value={franchise.franchiseCode}
            onChange={handleChange}
            placeholder="가맹점 코드"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점명</Text>
          <Input
            name="franchiseName"
            value={franchise.franchiseName}
            onChange={handleChange}
            placeholder="가맹점명"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점주</Text>
          <Input
            name="franchiseRep"
            value={franchise.franchiseRep}
            onChange={handleChange}
            placeholder="가맹점주"
          />
        </Box>
        <Box mb={4}>
          <Text>전화번호</Text>
          <Input
            name="franchiseTel"
            value={franchise.franchiseTel}
            onChange={handleChange}
            placeholder="전화번호"
          />
        </Box>
        <Box mb={4}>
          <Text>사업자 번호</Text>
          <Input
            name="franchiseNo"
            value={franchise.franchiseNo}
            onChange={handleChange}
            placeholder="사업자 번호"
          />
        </Box>
        <Box mb={4}>
          <Text>주소</Text>
          <Input
            name="franchiseAddress"
            value={franchise.franchiseAddress}
            onChange={handleChange}
            placeholder="주소"
          />
        </Box>
        <Box mb={4}>
          <Text>상세 주소</Text>
          <Input
            name="franchiseAddressDetail"
            value={franchise.franchiseAddressDetail}
            onChange={handleChange}
            placeholder="상세 주소"
          />
        </Box>
        <Box mb={4}>
          <Text>우편 번호</Text>
          <Input
            name="franchisePost"
            value={franchise.franchisePost}
            onChange={handleChange}
            placeholder="우편 번호"
          />
        </Box>
        <Box mb={4}>
          <Text>광역시도</Text>
          <Input
            name="franchiseState"
            value={franchise.franchiseState}
            onChange={handleChange}
            placeholder="광역시도"
          />
        </Box>
        <Box mb={4}>
          <Text>시군</Text>
          <Input
            name="franchiseCity"
            value={franchise.franchiseCity}
            onChange={handleChange}
            placeholder="시군"
          />
        </Box>
        <Box mb={4}>
          <Text>비고</Text>
          <Input
            name="franchiseNote"
            value={franchise.franchiseNote}
            onChange={handleChange}
            placeholder="비고"
          />
        </Box>
        <Button onClick={handleSaveClick}>등록</Button>
      </Box>
    </Box>
  );
}
