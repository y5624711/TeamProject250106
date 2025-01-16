import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseView } from "../../components/franchise/FranchiseView.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";

export function Franchise() {
  const [viewMode, setViewMode] = useState("view");
  const [franchiseList, setFranchiseList] = useState([]);
  const [franchiseKey, setFranchiseKey] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [checkedActive, setCheckedActive] = useState(
    searchParams.get("active") === "true",
  );
  const [search, setSearch] = useState({
    type: searchParams.get("type") ?? "all",
    keyword: searchParams.get("key") ?? "",
  });
  const [standard, setStandard] = useState({
    sort: "franchise_key",
    order: "ASC",
  });
  const [isLoading, setIsLoading] = useState(true);

  // 가맹점 목록을 가져오기
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/franchise/list", {
        params: {
          active: searchParams.get("active") || "false",
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
  }, [searchParams, standard]); // standard 상태가 변경될 때마다 실행

  // URLSearchParams의 값에 따라 search 상태를 업데이트
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

  // 삭제 내역 포함 체크박스 상태 토글 및 URL 업데이트
  const toggleCheckedActive = () => {
    const nextValue = !checkedActive;
    setCheckedActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  };

  // 검색 타입 변경 및 파라미터 업데이트
  const handleSearchTypeChange = (type) => {
    setSearch((prev) => ({ ...prev, type }));
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("type", type);
    setSearchParams(nextSearchParams);
  };

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

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터를 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  // 클릭된 가맹점에 대한 상세 정보 표시
  function handleFranchiseClick(franchiseKey) {
    setFranchiseKey(franchiseKey);
    setViewMode("view");
  }

  // 정렬 변경 시 URL 파라미터 업데이트
  const handleSortChange = (sortField) => {
    const nextOrder = standard.order === "ASC" ? "DESC" : "ASC";
    setStandard({ sort: sortField, order: nextOrder });

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", sortField);
    nextSearchParams.set("order", nextOrder);
    setSearchParams(nextSearchParams);
  };

  return (
    <Box display={"flex"} h={"100vh"}>
      <SideBar />
      <Box flex={"1"} display={"flex"} p={4}>
        <Box flex={"1"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 조회
          </Heading>
          <FranchiseList
            franchiseList={franchiseList}
            count={count}
            currentPage={currentPage}
            search={search}
            setSearch={setSearch}
            checkedActive={checkedActive}
            setCheckedActive={setCheckedActive}
            toggleCheckedActive={toggleCheckedActive}
            handlePageChange={handlePageChange}
            handleSearchClick={handleSearchClick}
            handleSearchTypeChange={handleSearchTypeChange}
            onFranchiseClick={handleFranchiseClick}
            handleSortChange={handleSortChange} // 정렬 변경 핸들러
          />

          <Center>
            <PaginationRoot
              onPageChange={handlePageChange}
              count={count}
              pageSize={10}
              page={page}
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
