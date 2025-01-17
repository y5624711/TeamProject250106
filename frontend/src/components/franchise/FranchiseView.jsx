import React, { useEffect, useState } from "react";
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";

export function FranchiseView({ franchiseKey, setViewMode }) {
  const [franchise, setFranchise] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsReadOnly(false); // 수정 모드 활성화
  };

  const handleCancelClick = () => {
    setIsReadOnly(true); // 수정 모드 취소
  };
  const handleSaveClick = () => {
    axios
      .put(`/api/franchise/edit/${franchiseKey}`, franchise)
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setIsReadOnly(true); // 저장 후 읽기 모드로 전환
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 가맹점을 삭제하시겠습니까?")) {
      axios
        .put(`/api/franchise/delete/${franchiseKey}`)
        .then((res) => {
          const message = res.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
          setViewMode("list");
        })
        .catch((e) => {
          const message = e.response.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
        });
    }
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

  if (!franchise) {
    return <Spinner />;
  }

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
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>본사 직원 이름</Text>
          <Input
            name="businessEmployeeName"
            value={franchise.businessEmployeeName}
            onChange={handleChange}
            placeholder="본사 직원 이름"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점 코드</Text>
          <Input
            name="franchiseCode"
            value={franchise.franchiseCode}
            onChange={handleChange}
            placeholder="가맹점 코드"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점명</Text>
          <Input
            name="franchiseName"
            value={franchise.franchiseName}
            onChange={handleChange}
            placeholder="가맹점명"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>가맹점주</Text>
          <Input
            name="franchiseRep"
            value={franchise.franchiseRep}
            onChange={handleChange}
            placeholder="가맹점주"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>전화번호</Text>
          <Input
            name="franchiseTel"
            value={franchise.franchiseTel}
            onChange={handleChange}
            placeholder="전화번호"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>사업자 번호</Text>
          <Input
            name="franchiseNo"
            value={franchise.franchiseNo}
            onChange={handleChange}
            placeholder="사업자 번호"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>주소</Text>
          <Input
            name="franchiseAddress"
            value={franchise.franchiseAddress}
            onChange={handleChange}
            placeholder="주소"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>상세 주소</Text>
          <Input
            name="franchiseAddressDetail"
            value={franchise.franchiseAddressDetail}
            onChange={handleChange}
            placeholder="상세 주소"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>우편 번호</Text>
          <Input
            name="franchisePost"
            value={franchise.franchisePost}
            onChange={handleChange}
            placeholder="우편 번호"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>광역시도</Text>
          <Input
            name="franchiseState"
            value={franchise.franchiseState}
            onChange={handleChange}
            placeholder="광역시도"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>시군</Text>
          <Input
            name="franchiseCity"
            value={franchise.franchiseCity}
            onChange={handleChange}
            placeholder="시군"
            readOnly={isReadOnly}
          />
        </Box>
        <Box mb={4}>
          <Text>비고</Text>
          <Input
            name="franchiseNote"
            value={franchise.franchiseNote}
            onChange={handleChange}
            placeholder="비고"
            readOnly={isReadOnly}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={4}>
          {isReadOnly ? (
            <>
              <Button onClick={handleEditClick} colorScheme="blue">
                수정
              </Button>
              <Button onClick={handleDeleteClick} colorScheme="red">
                삭제
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleSaveClick} colorScheme="green">
                저장
              </Button>
              <Button onClick={handleCancelClick} colorScheme="gray">
                취소
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
