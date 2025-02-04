import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { Button } from "../../ui/button.jsx";
import { toaster } from "../../ui/toaster.jsx";

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
      business.businessTel?.trim() && // 대표 전화번호    가 비어 있지 않은지 확인
      business.businessAddress?.trim() && // 주소가 비어 있지 않은지 확인
      business.businessIndustryType?.trim() &&
      business.businessCorpNumber?.trim()
    );
  };

  function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ""); // 숫자만 남기기

    // 02 지역번호 (서울)
    if (value.startsWith("02")) {
      return value.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 12);
    }
    // 휴대폰 및 일반 지역번호 (3자리 지역번호 포함)
    return value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 13);
  }

  // 사업자등록번호 정규식 (자동으로 하이픈 입력)
  function formatBusinessNumber(value) {
    return value
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3") // 하이픈 자동 삽입
      .slice(0, 12); // 최대 길이 제한
  }

  // 법인등록번호 정규식 (자동으로 하이픈 입력)
  function formatCorporateNumber(value) {
    return value
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/(\d{6})(\d{7})/, "$1-$2") // 하이픈 자동 삽입
      .slice(0, 14); // 최대 길이 제한
  }

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
    <Box p={5} bg="rgba(200, 200, 200, 0.3)">
      <Box>
        <Flex>
          <Heading>{business.businessName}</Heading>
          <Spacer />
          <Box pt={3}>
            <Button mt={-4} mb={5} size="sm" onClick={handleSave}>
              저장
            </Button>
          </Box>
        </Flex>
        <Stack>
          <HStack gap={5}>
            <Field label={"대표자"} orientation="horizontal" mb={3}>
              <Input
                variant="filed"
                value={business.businessRep}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessRep: e.target.value,
                  }))
                }
              />
            </Field>
            <Field label={"업태"} orientation="horizontal" mb={3}>
              <Input
                variant="filled"
                value={business.businessIndustryType || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessIndustryType: e.target.value, // businessName 업데이트
                  }))
                }
              />
            </Field>
          </HStack>
          <HStack gap={5}>
            <Field label="사업자 번호" orientation="horizontal" mb={3}>
              <Input
                variant="filled"
                value={business.businessNo || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessNo: formatBusinessNumber(e.target.value), // businessName 업데이트
                  }))
                }
              />
            </Field>
            <Field label="법인 번호" orientation="horizontal" mb={3}>
              <Input
                variant="filled"
                value={business.businessCorpNumber || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessCorpNumber: formatCorporateNumber(e.target.value), // businessName 업데이트
                  }))
                }
              />
            </Field>
          </HStack>
          <HStack gap={5}>
            <Field label={"전화번호"} orientation="horizontal" mb={3}>
              <Input
                variant="filled"
                value={business.businessTel || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessTel: formatPhoneNumber(e.target.value), // businessName 업데이트
                  }))
                }
              />
            </Field>
            <Field label={"팩스"} orientation="horizontal" mb={3}>
              <Input
                variant="filled"
                value={business.businessFax || ""}
                onChange={(e) =>
                  setBusiness((prev) => ({
                    ...prev,
                    businessFax: formatPhoneNumber(e.target.value), // businessName 업데이트
                  }))
                }
              />
            </Field>
          </HStack>
          <Field label={"주소"} orientation="horizontal">
            <Input
              variant="filled"
              value={business.businessAddress || ""}
              onChange={(e) =>
                setBusiness((prev) => ({
                  ...prev,
                  businessAddress: e.target.value, // businessName 업데이트
                }))
              }
            />
          </Field>
        </Stack>
      </Box>
    </Box>
  );
}
