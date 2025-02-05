import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { MainCusViewEndEdit } from "./MainCusViewEndEdit.jsx";
import { MainWarehouseViewEndEdit } from "./MainWarehouseViewEndEdit.jsx";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export function MainLeftInfoBox({ isAdmin, user, companyStatus, company }) {
  const navigate = useNavigate();
  const [cusViewOpen, setCusViewOpen] = useState(false);
  const [warehouseViewOpen, setWarehouseViewOpen] = useState(false);

  return (
    <Box
      minW="420px"
      h="700px"
      backgroundImage="url('/mainInfo.jpg')" // 배경 이미지 적용
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      display="flex" // Flexbox 활성화
      alignItems="center" // 세로 정렬 (중앙)
      justifyContent="center" // 가로 정렬 (중앙)
    >
      {/* 텍스트 박스 */}
      <Box
        color="black"
        fontWeight="bold"
        backgroundColor="whiteAlpha.700" // 반투명 흰색 배경
        p={5} // 패딩 추가
        textAlign="center"
      >
        <Box
          backgroundColor="whiteAlpha.500" // 반투명 흰색 배경
          p={5} // 패딩 추가
          borderRadius="md" // 모서리 둥글게
          textAlign="center"
        >
          <Stack spacing={4} align="center">
            {isAdmin ? (
              <>
                <Heading fontSize="40px">
                  {companyStatus.businessName || ""}
                </Heading>
                <Text fontSize="16px">
                  {companyStatus.businessAddress || ""}
                </Text>
              </>
            ) : (
              <>
                <Heading fontSize="40px">
                  {companyStatus.customerName || ""}
                </Heading>
                <Text fontSize="16px">
                  {companyStatus.customerAddress || ""}{" "}
                  {companyStatus.customerAddressDetails || ""}
                </Text>
              </>
            )}
          </Stack>

          <Stack justify="center" align="center" mt={6}>
            <Text fontSize="25px">{user.employeeName} 님 환영합니다</Text>
            <Text fontSize="16px">No. {user.employeeNo}</Text>
            <Text fontSize="16px">Tel. {user.employeeTel}</Text>
          </Stack>
          {!isAdmin && (
            <HStack gap={5} mt={5}>
              <Button
                size={"sm"}
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => setCusViewOpen(true)}
              >
                업체 정보
              </Button>
              <Button
                size={"sm"}
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => setWarehouseViewOpen(true)}
              >
                창고 정보
              </Button>
              <Button
                size={"sm"}
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => navigate("/location")}
              >
                로케이션
                <FaArrowRightFromBracket />
              </Button>
            </HStack>
          )}
        </Box>
      </Box>

      {!isAdmin && (
        <>
          <MainCusViewEndEdit
            company={company}
            cusViewOpen={cusViewOpen}
            onCancel={() => setCusViewOpen(false)}
          />
          <MainWarehouseViewEndEdit
            company={company}
            warehouseViewOpen={warehouseViewOpen}
            onCancel={() => setWarehouseViewOpen(false)}
          />
        </>
      )}
    </Box>
  );
}
