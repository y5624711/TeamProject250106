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
      .get("/api/purchase/list", {
        params: {
          page: searchParams.get("page") || "1",
          type: searchParams.get("type") || "all",
          keyword: searchParams.get("keyword") || "",
          state: search.state,
          sort: "purchaseRequestDate",
          order: "desc",
        },
      })
      .then((res) => {
        setPurchaseList(res.data.purchaseList);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("구매 목록 요청 중 오류 발생:", error);
      });
  }, [searchParams]);

  // 검색 상태를 URLSearchParams에 맞게 업데이트
  useEffect(() => {
    const nextSearch = { ...search };
    if (searchParams.get("type")) {
      nextSearch.type = searchParams.get("type");
    } else {
      nextSearch.type = "all";
    }
    if (searchParams.get("keyword")) {
      nextSearch.keyword = searchParams.get("keyword");
    } else {
      nextSearch.keyword = "";
    }
    setSearch(nextSearch);
  }, [searchParams]);

  // 검색 파라미터 업데이트
  const handleSearchClick = () => {
    const nextSearchParam = new URLSearchParams(searchParams);
    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      nextSearchParam.set("page", 1);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }
    setSearchParams(nextSearchParam);
  };

  // 페이지네이션
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

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

  // 구매 신청 후 리스트에 업데이트
  const handleSave = () => {
    axios
      .get("/api/purchase/list")
      .then((res) => {
        setPurchaseList(res.data);
        setCount(res.data.length);
      })
      .catch((error) => {
        console.error("구매 목록 업데이트 중 오류 발생:", error);
      });
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
          count={count}
          search={search}
          setSearch={setSearch}
          handleSearchClick={handleSearchClick}
          onViewClick={handleViewClick}
        />
        {/* 페이지네이션 */}
        <Center>
          <PaginationRoot
            onPageChange={handlePageChange}
            count={count}
            pageSize={10}
            variant="solid"
            mt={5}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
        {/* 구매 신청 버튼 */}
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handlePurchaseRequestClick} mt={-11}>
            구매 신청
          </Button>
        </Box>
        {/* 구매 다이얼로그 */}
        <PurchaseDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSave={handleSave}
          isAddDialogOpen={isAddDialogOpen}
          purchaseRequestKey={purchaseRequestKey}
          purchaseRequestData={purchaseRequestData} // 발주 데이터 전달
        />
      </Stack>
    </Box>
  );
}
