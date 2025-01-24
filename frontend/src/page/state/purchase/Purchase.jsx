import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, HStack, Stack } from "@chakra-ui/react";
import { PurchaseList } from "../../../components/state/purchase/PurchaseList.jsx";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { PurchaseDialog } from "../../../components/state/purchase/PurchaseDialog.jsx";
import axios from "axios";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";
import { useSearchParams } from "react-router-dom";

export function Purchase() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [count, setCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);
  const [purchaseRequestKey, setPurchaseRequestKey] = useState(null);
  const [purchaseRequestData, setPurchaseRequestData] = useState(null); // 발주 데이터를 상위 컴포넌트에서 관리

  // 구매 관리 리스트 가져오기
  useEffect(() => {
    axios
      .get("/api/purchase/list")
      .then((res) => {
        setPurchaseList(res.data);
      })
      .catch((error) => {
        console.error("구매 목록 요청 중 오류 발생:", error);
      });
  }, []);

  // 구매 신청 다이얼로그 열기
  const handlePurchaseRequestClick = () => {
    setIsAddDialogOpen(true);
    setIsDialogOpen(true);
  };

  // 구매 승인 다이얼로그 열기
  const handleViewClick = (key) => {
    const selectedData = purchaseList.find(
      (item) => item.purchaseRequestKey === key,
    );
    setPurchaseRequestKey(key);
    setPurchaseRequestData(selectedData); // 해당 발주 데이터를 설정
    setIsAddDialogOpen(false); // 구매 승인 다이얼로그 열기
    setIsDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box display="flex" h="100vh">
      <StateSideBar />
      <Stack flex="1" p={5}>
        <Heading size={"xl"} p={2} mb={3}>
          구매 / 설치 관리 {">"} 구매 관리
        </Heading>
        <PurchaseList
          purchaseList={purchaseList}
          onViewClick={handleViewClick}
          search={search}
          setSearch={setSearch}
        />
        {/* 페이지네이션 */}
        <Center>
          <PaginationRoot count={count} pageSize={10} variant="solid" mt={3}>
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
        {/* 구매 신청 버튼 */}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handlePurchaseRequestClick}>구매 신청</Button>
        </Box>
        {/* 구매 다이얼로그 */}
        <PurchaseDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          isAddDialogOpen={isAddDialogOpen}
          purchaseRequestKey={purchaseRequestKey}
          purchaseRequestData={purchaseRequestData} // 발주 데이터 전달
        />
      </Stack>
    </Box>
  );
}
