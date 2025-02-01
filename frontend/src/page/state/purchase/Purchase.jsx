import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import { PurchaseList } from "../../../components/state/purchase/PurchaseList.jsx";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { PurchaseDialog } from "../../../components/state/purchase/PurchaseDialog.jsx";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function Purchase() {
  // URL 쿼리 파라미터 관련 상태
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(searchParams.get("state") || "all");
  // 데이터 및 페이지 관련 상태
  const [purchaseList, setPurchaseList] = useState([]);
  const [count, setCount] = useState(0);
  const [standard, setStandard] = useState({
    sort: "date",
    order: "DESC",
  });
  // 선택된 항목 관련 상태
  const [purchaseRequestKey, setPurchaseRequestKey] = useState(null);
  const [purchaseRequestData, setPurchaseRequestData] = useState(null); // 발주 데이터를 상위 컴포넌트에서 관리
  // 다이얼로그 관련 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // 구매 관리 리스트 가져오기
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/purchase/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => {
        setPurchaseList(res.data.purchaseList);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("구매 목록 요청 중 오류 발생:", error);
      });
    return () => {
      controller.abort();
    };
  }, [searchParams]);

  // 구매 요청 후 리스트 업데이트
  const handleSave = () => {
    axios
      .get("/api/purchase/list")
      .then((res) => {
        setPurchaseList(res.data.purchaseList);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("구매 목록 업데이트 중 오류 발생:", error);
      });
  };

  // 구매 승인 또는 반려 후 리스트 업데이트
  const handleUpdateList = () => {
    axios
      .get("/api/purchase/list", { params: searchParams })
      .then((res) => {
        setPurchaseList(res.data.purchaseList);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("구매 목록 업데이트 중 오류 발생:", error);
      });
  };

  // 정렬 기준 변경 시 URL 파라미터 업데이트
  const handleSortChange = (sortField) => {
    const nextOrder = standard.order === "asc" ? "desc" : "asc";
    setStandard({ sort: sortField, order: nextOrder });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", sortField);
    nextSearchParams.set("order", nextOrder);
    nextSearchParams.set("page", "1"); // 1 페이지로 초기화

    // searchParams 상태를 업데이트하여 경로에 반영
    setSearchParams(nextSearchParams);
  };

  // 구매 요청 다이얼로그 열기
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
    setIsAddDialogOpen(false);
    setIsDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StateSideBar />
        <Stack flex={1} p={5} pb={0}>
          <Heading size={"xl"} mb={3} p={2}>
            구매 / 설치 관리 {">"} 구매 관리
          </Heading>
          <PurchaseList
            purchaseList={purchaseList}
            onViewClick={handleViewClick}
            count={count}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            state={state}
            handleSortChange={handleSortChange}
            standard={standard}
            setStandard={setStandard}
          />
          {/* 구매 요청 버튼 */}
          <Flex justify="flex-end">
            <Button
              size={"lg"}
              mt={"-65px"}
              onClick={handlePurchaseRequestClick}
            >
              구매 요청
            </Button>
          </Flex>
          {/* 구매 다이얼로그 */}
          <PurchaseDialog
            isOpen={isDialogOpen}
            isAddDialogOpen={isAddDialogOpen}
            purchaseRequestKey={purchaseRequestKey}
            purchaseRequestData={purchaseRequestData} // 발주 데이터 전달
            onSave={handleSave}
            onClose={handleDialogClose}
            onUpdateList={handleUpdateList}
          />
        </Stack>
      </HStack>
    </Box>
  );
}
