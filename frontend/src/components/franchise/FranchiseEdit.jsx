import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function FranchiseEdit({ franchiseKey }) {
  const [franchise, setFranchise] = useState({
    businessEmployeeNo: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [name]: value,
    }));
  };

  useEffect(() => {
    const franchiseData = () => {
      axios
        .get(`/api/franchise/view/${franchiseKey}`)
        .then((response) => {
          setFranchise(response.data);
        })
        .catch((error) => {
          console.error("가맹점 데이터를 가져오는 데 실패했습니다:", error);
        });
    };

    if (franchiseKey) {
      franchiseData();
    }
  }, [franchiseKey]);

  const handleSaveClick = () => {
    axios
      .put("/api/franchise/edit", franchise) // 수정된 정보를 PUT 요청으로 전송
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        // 성공적으로 수정된 경우
        if (res.data && res.data.success) {
          console.log("가맹점이 성공적으로 수정되었습니다.");
        }
      })
      .catch((e) => {
        console.log(e);
        const message =
          e.response?.data?.message || "서버 오류가 발생했습니다.";
        toaster.create({
          type: "error",
          description: message,
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
            readOnly
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
          <Text>가맹점명</Text>
          <Input
            name="franchiseName"
            value={franchise.franchiseName}
            onChange={handleChange}
            placeholder="가맹점명을 입력하세요"
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
          <Text>전화번호</Text>
          <Input
            name="franchiseTel"
            value={franchise.franchiseTel}
            onChange={handleChange}
            placeholder="전화번호를 입력하세요"
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
        <Button onClick={handleSaveClick}>수정</Button>
      </Box>
    </Box>
  );
}
