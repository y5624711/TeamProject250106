import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../ui/toaster.jsx";

export function FranchiseAdd({ onCancel }) {
  const [businessEmployeeNo, setBusinessEmployeeNo] = useState("");
  const [businessEmployeeName, setBusinessEmployeeName] = useState("");
  const [franchiseCode, setFranchiseCode] = useState("");
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseRep, setFranchiseRep] = useState("");
  const [franchiseNo, setFranchiseNo] = useState("");
  const [franchiseTel, setFranchiseTel] = useState("");
  const [franchiseAddress, setFranchiseAddress] = useState("");
  const [franchiseAddressDetail, setFranchiseAddressDetail] = useState("");
  const [franchisePost, setFranchisePost] = useState("");
  const [franchiseState, setFranchiseState] = useState("");
  const [franchiseCity, setFranchiseCity] = useState("");
  const [franchiseNote, setFranchiseNote] = useState("");

  const handleSaveClick = () => {
    axios
      .post("/api/franchise/add", {
        businessEmployeeNo,
        businessEmployeeName,
        franchiseCode,
        franchiseName,
        franchiseRep,
        franchiseNo,
        franchiseTel,
        franchiseAddress,
        franchiseAddressDetail,
        franchisePost,
        franchiseState,
        franchiseCity,
        franchiseNote,
      })
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        // 가맹점 추가 후 부모 컴포넌트에 가맹점 리스트 업데이트
        if (res.data && res.data.franchiseKey) {
          setFranchiseList(res.data); // 새로운 가맹점을 부모에 전달
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
            value={businessEmployeeNo}
            onChange={(e) => setBusinessEmployeeNo(e.target.value)}
            placeholder="본사 직원 사번"
          />
        </Box>
        <Box mb={4}>
          <Text>본사 직원 이름</Text>
          <Input
            value={businessEmployeeName}
            onChange={(e) => setBusinessEmployeeName(e.target.value)}
            placeholder="본사 직원 이름"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점 코드</Text>
          <Input
            value={franchiseCode}
            onChange={(e) => setFranchiseCode(e.target.value)}
            placeholder="가맹점 코드"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점명</Text>
          <Input
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
            placeholder="가맹점명"
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점주</Text>
          <Input
            value={franchiseRep}
            onChange={(e) => setFranchiseRep(e.target.value)}
            placeholder="가맹점주"
          />
        </Box>
        <Box mb={4}>
          <Text>전화번호</Text>
          <Input
            value={franchiseTel}
            onChange={(e) => setFranchiseTel(e.target.value)}
            placeholder="전화번호"
          />
        </Box>
        <Box mb={4}>
          <Text>사업자 번호</Text>
          <Input
            value={franchiseNo}
            onChange={(e) => setFranchiseNo(e.target.value)}
            placeholder="사업자 번호"
          />
        </Box>
        <Box mb={4}>
          <Text>주소</Text>
          <Input
            value={franchiseAddress}
            onChange={(e) => setFranchiseAddress(e.target.value)}
            placeholder="주소"
          />
        </Box>
        <Box mb={4}>
          <Text>상세 주소</Text>
          <Input
            value={franchiseAddressDetail}
            onChange={(e) => setFranchiseAddressDetail(e.target.value)}
            placeholder="상세 주소"
          />
        </Box>
        <Box mb={4}>
          <Text>우편 번호</Text>
          <Input
            value={franchisePost}
            onChange={(e) => setFranchisePost(e.target.value)}
            placeholder="우편 번호"
          />
        </Box>
        <Box mb={4}>
          <Text>광역시도</Text>
          <Input
            value={franchiseState}
            onChange={(e) => setFranchiseState(e.target.value)}
            placeholder="광역시도"
          />
        </Box>
        <Box mb={4}>
          <Text>시군</Text>
          <Input
            value={franchiseCity}
            onChange={(e) => setFranchiseCity(e.target.value)}
            placeholder="시군"
          />
        </Box>
        <Box mb={4}>
          <Text>비고</Text>
          <Input
            value={franchiseNote}
            onChange={(e) => setFranchiseNote(e.target.value)}
            placeholder="비고"
          />
        </Box>
        <Button onClick={handleSaveClick}>등록</Button>
        <Button onClick={onCancel} ml={4}>
          취소
        </Button>
      </Box>
    </Box>
  );
}
