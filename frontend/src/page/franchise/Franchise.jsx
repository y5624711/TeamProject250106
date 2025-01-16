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
  const [franchiseList, setFranchiseList] = useState([]);
  const [viewMode, setViewMode] = useState("view");
  const [franchiseKey, setFranchiseKey] = useState(null);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [checkedActive, setCheckedActive] = useState(
    false || searchParams.get("active"),
  );
  const [search, setSearch] = useState({
    type: searchParams.get("type") ?? "all",
    keyword: searchParams.get("key") ?? "",
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
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        setFranchiseList(data.franchiseList);
        console.log("Franchise List:", data.franchiseList);
        setIsLoading(false); // 데이터 로딩 완료
      });
  }, [searchParams]); // searchParams가 변경될 때마다 다시 실행

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

  // 검색어 변경
  function handleSearchClick() {
    const nextSearchParam = new URLSearchParams(searchParams);
    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("page", "1");
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }
    setSearchParams(nextSearchParam);
  }

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

  return (
    <Box display={"flex"} h={"100vh"}>
      <SideBar />
      <Box flex={"1"} display={"flex"} p={4}>
        <Box flex={"1"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 조회
          </Heading>
          <FranchiseList
            count={count}
            search={search}
            setSearch={setSearch}
            checkedActive={checkedActive}
            setCheckedActive={setCheckedActive}
            currentPage={currentPage}
            franchiseList={franchiseList}
            handlePageChange={handlePageChange}
            handleSearchClick={handleSearchClick}
            onFranchiseClick={handleFranchiseClick}
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
                <FranchiseView franchiseKey={franchiseKey} />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
