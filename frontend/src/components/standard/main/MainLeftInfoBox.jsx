import { Box, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "../../ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { MainCusViewEndEdit } from "./MainCusViewEndEdit.jsx";
import { MainWarehouseViewEndEdit } from "./MainWarehouseViewEndEdit.jsx";

export function MainLeftInfoBox({ isAdmin, user, companyStatus, company }) {
  const navigate = useNavigate();
  const [cusViewOpen, setCusViewOpen] = useState(false);
  const [warehouseOpen, setWarehouseOpen] = useState(false);

  return (
    <Box
      position="relative"
      minW="400px"
      h="600px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      mt={3}
    >
      {/* 배경 이미지 */}
      <Image
        src="/mainInfo.jpg"
        alt="background"
        objectFit="cover"
        w="100%"
        h="100%"
        position="absolute"
        opacity="0.5"
        zIndex="-1"
        filter="brightness(80%) contrast(120%) sepia(20%)" // ✅ 색상 조절
      />

      {/* 텍스트 박스 */}
      <Box position="relative" color="black" fontWeight="bold">
        <Box
          backgroundColor="whiteAlpha.800" // 반투명 흰색 배경
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
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => setCusViewOpen(true)}
              >
                품목 정보
              </Button>
              <Button
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => setWarehouseOpen(true)}
              >
                창고 정보
              </Button>
              <Button
                variant={"ghost"}
                colorPalette={"blue"}
                fontWeight="bold"
                onClick={() => navigate("/location")}
              >
                로케이션 관리
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
            setCusViewOpen={setCusViewOpen}
            onCancel={() => setCusViewOpen(false)}
          />
          <MainWarehouseViewEndEdit
            company={company}
            warehouseViewOpen={warehouseOpen}
            setWarehouseViewOpen={setWarehouseOpen}
          />
        </>
      )}
    </Box>
  );
}
