import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import { Button } from "../ui/button.jsx";
import { toaster } from "../ui/toaster.jsx";

function CustomInput({ onChange, readOnly = false, ...props }) {
  return (
    <Input
      // borderColor="black" // 기본 외곽선 색상
      boxShadow="0 0 0 1px black" // 기본 외곽선 스타일
      size="sm"
      readOnly={readOnly}
      onChange={!readOnly ? onChange : undefined} // onChange 핸들러 전달
      {...props} // 추가 속성 전달
    />
  );
}

export function BusinessInfo({
  business,
  setBusiness,
  isEditing,
  toggleEditing,
  handleSaveClick,
}) {
  const isValid = () => {
    return (
      business.businessName?.trim() && // 회사명이 비어 있지 않은지 확인
      business.businessRep?.trim() && // 대표명이 비어 있지 않은지 확인
      business.businessNo?.trim() && // 사업자번호가 비어 있지 않은지 확인
      business.businessTel?.trim() && // 대표 전화번호가 비어 있지 않은지 확인
      business.businessAddress?.trim() // 주소가 비어 있지 않은지 확인
    );
  };

  // 저장 버튼 클릭 시 처리
  const handleSave = () => {
    if (isValid()) {
      handleSaveClick(); // 모든 필드가 유효하면 저장 처리
    } else {
      toaster.create({
        type: "warning",
        description: "내용을 입력해 주세요",
      });
    }
  };

  return (
    <Box p={10}>
      <Box>
        <Flex>
          <Heading>사업장 정보</Heading>
          <Spacer />
          {isEditing && <Heading color={"red"}>수정중</Heading>}
        </Flex>
        <Stack>
          <HStack gap={5}>
            <Field label={"회사명"}>
              <CustomInput
                value={business.businessName}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessName: e.target.value,
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>
            <Field label={"대표"}>
              <CustomInput
                value={business.businessRep || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessNo: e.target.value, // businessName 업데이트
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>
            <Field label={"사업자번호"}>
              <CustomInput
                value={business.businessNo || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessNo: e.target.value, // businessName 업데이트
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>
          </HStack>
          <HStack gap={5}>
            <Field label={"대표 전화번호"}>
              <CustomInput
                value={business.businessTel || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessTel: e.target.value, // businessName 업데이트
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>
            <Field label={"팩스번호"}>
              <CustomInput
                value={business.businessFax || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessFax: e.target.value, // businessName 업데이트
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>
          </HStack>
          <Field label={"주소"}>
            <CustomInput
              value={business.businessAddress || ""}
              onChange={(e) =>
                setBusiness((prev) => ({
                  ...prev,
                  businessAddress: e.target.value, // businessName 업데이트
                }))
              }
              readOnly={!isEditing}
            />
          </Field>
        </Stack>
        <Box pt={3}>
          {!isEditing && <Button onClick={toggleEditing}>수정</Button>}
          {isEditing && <Button onClick={handleSave}>저장</Button>}
        </Box>
      </Box>
    </Box>
  );
}
