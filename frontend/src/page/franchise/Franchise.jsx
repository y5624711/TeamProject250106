import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseView } from "../../components/franchise/FranchiseView.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export function Franchise() {
  // 뷰 모드 관련 상태
  const [viewMode, setViewMode] = useState("view");
  // 검색 및 필터링 관련 상태
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [checkedActive, setCheckedActive] = useState(false);
  const [standard, setStandard] = useState({
    sort: "franchise_key",
    order: "ASC",
  });
  // 데이터 및 페이지 관련 상태
  const [franchiseList, setFranchiseList] = useState([]);
  const [count, setCount] = useState(0);
  // 선택된 항목 관련 상태
  const [franchiseKey, setFranchiseKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 가맹점 리스트 가져오기
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/franchise/list", {
        params: {
          // active: searchParams.get("active") || "false",
          active: checkedActive,
          page: searchParams.get("page") || "1",
          type: searchParams.get("type") || "all",
          keyword: searchParams.get("keyword") || "",
          sort: searchParams.get("sort") || standard.sort,
          order: searchParams.get("order") || standard.order,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        setFranchiseList(data.franchiseList);
        setFranchiseKey(data.franchiseList[0]?.franchiseKey);
        setIsLoading(false);
      });
  }, [searchParams, standard, checkedActive]);

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
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }
    setSearchParams(nextSearchParam);
  };

  // 페이지네이션
  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam);

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  // 정렬 기준 변경 시 URL 파라미터 업데이트
  const handleSortChange = (sortField) => {
    const nextOrder = standard.order === "ASC" ? "DESC" : "ASC";
    setStandard({ sort: sortField, order: nextOrder });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", sortField);
    nextSearchParams.set("order", nextOrder);
    setSearchParams(nextSearchParams);
  };

  // 클릭된 가맹점의 상세 정보 표시
  function handleFranchiseClick(franchiseKey) {
    setFranchiseKey(franchiseKey);
    setViewMode("view");
  }

  return (
    <Box display={"flex"} h={"100vh"}>
      <SideBar />
      <Box flex={"1"} display={"flex"} p={4}>
        <Box flex={"1"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 관리
          </Heading>
          <FranchiseList
            franchiseList={franchiseList}
            count={count}
            search={search}
            setSearch={setSearch}
            checkedActive={checkedActive}
            setCheckedActive={setCheckedActive}
            handlePageChange={handlePageChange}
            handleSearchClick={handleSearchClick}
            handleSortChange={handleSortChange}
            standard={standard}
            setStandard={setStandard}
            onFranchiseClick={handleFranchiseClick}
          />
          <Center>
            <PaginationRoot
              onPageChange={handlePageChange}
              count={count}
              pageSize={10}
              page={page}
              variant="solid"
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Center>
        </Box>
        <Box flex={"1"} pl={4}>
          <Button colorScheme="teal" onClick={() => setViewMode("add")} mb={4}>
            추가
          </Button>
          {/* 로딩 상태에 따른 조건부 렌더링 */}
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {/* viewMode에 따라 조건부 렌더링 */}
              {viewMode === "add" ? (
                <FranchiseAdd onCancel={() => setViewMode("view")} />
              ) : (
                <FranchiseView
                  franchiseKey={franchiseKey}
                  setViewMode={setViewMode}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
