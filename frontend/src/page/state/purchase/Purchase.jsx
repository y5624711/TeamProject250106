import React, { useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { PurchaseList } from "../../../components/state/purchase/PurchaseList.jsx";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { PurchaseDialog } from "../../../components/state/purchase/PurchaseDialog.jsx";
import axios from "axios";

export function Purchase() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);

  // 구매 관리 리스트 가져오기
  useEffect(() => {
    axios
      .get("/api/purchase/list")
      .then((res) => {
        console.log("구매 목록 데이터:", res.data);
        setPurchaseList(res.data);
      })
      .catch((error) => {
        console.error("구매 목록 요청 중 오류 발생:", error);
      });
  }, []);

  // 구매 요청 다이얼로그 열기
  const handlePurchaseRequestClick = () => {
    setIsDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box display="flex" h="100vh">
      <StateSideBar />
      <Box flex="1" p={4}>
        <Heading size="md" p={2} mb={3}>
          구매 / 설치 관리 {">"} 구매 관리
        </Heading>
        {/* 구매 관리 리스트 */}
        <PurchaseList purchaseList={purchaseList} />
        {/* 구매 요청 버튼 */}
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button mt={3} onClick={handlePurchaseRequestClick}>
            구매 요청
          </Button>
        </Box>
        {/* 구매 요청 다이얼로그 */}
        <PurchaseDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
      </Box>
    </Box>
  );
}
