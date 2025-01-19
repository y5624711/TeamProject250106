import React, { useEffect, useState } from "react";
import { Box, Button, Center, Heading, HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseDialog } from "../../components/franchise/FranchiseDialog.jsx";
import * as PropTypes from "prop-types";

// Dial 컴포넌트 정의
function Dial(props) {
  return null;
}

// Dial 컴포넌트에 전달될 prop 유형 정의
Dial.propTypes = { children: PropTypes.node }; // children prop은 React 요소를 포함할 수 있는 node 타입이어야 함

export function Franchise() {
  // 뷰 모드 관련 상태
  const [viewMode, setViewMode] = useState("view");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [checkedActive, setCheckedActive] = useState(false);
  const [standard, setStandard] = useState({
    sort: "franchise_key",
    order: "DESC",
  });
  // 데이터 및 페이지 관련 상태
  const [franchiseList, setFranchiseList] = useState([]);
  const [count, setCount] = useState(0);
  // 선택된 항목 관련 상태
  const [franchiseKey, setFranchiseKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 새로운 가맹점 정보 추가
  const handleSave = (newFranchise) => {
    if (newFranchise?.franchiseKey) {
      console.log("새로 추가된 가맹점:", newFranchise);

      // 이전 리스트와 새로운 가맹점 정보를 업데이트
      setFranchiseList((prevList) => [newFranchise, ...prevList]);
    } else {
      console.error("잘못된 가맹점 정보가 전달되었습니다:", newFranchise);
    }
  };

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
      nextSearchParam.set("page", 1);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }
    setSearchParams(nextSearchParam);
  };

  // 삭제 내역 체크박스 상태 바꾸고, 그에 따라 URL의 'active' 파라미터 업데이트
  const toggleCheckedActive = () => {
    const nextValue = !checkedActive;
    setCheckedActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    if (nextValue) {
      nextSearchParams.set("active", "true");
    } else {
      nextSearchParams.set("active", "false");
    }
    setSearchParams(nextSearchParams);
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

  // 가맹점 클릭 시 상세 보기
  const handleFranchiseClick = (key) => {
    setFranchiseKey(key);
    setIsDialogOpen(true);
  };

  // 추가 버튼 클릭 시 add 다이얼로그
  const handleAddFranchiseClick = () => {
    setIsAddDialogOpen(true);
  };

  // 다이얼로그 닫기
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setIsAddDialogOpen(false);
  };

  return (
    <Box display={"flex"} h={"100vh"}>
      <SideBar />
      <Box flex={"1"} p={4}>
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
          toggleCheckedActive={toggleCheckedActive}
          handlePageChange={handlePageChange}
          handleSearchClick={handleSearchClick}
          handleSortChange={handleSortChange}
          standard={standard}
          setStandard={setStandard}
          onFranchiseClick={handleFranchiseClick}
        />
        {/* 페이지네이션 */}
        <Center>
          <PaginationRoot
            onPageChange={handlePageChange}
            count={count}
            pageSize={10}
            page={Number(searchParams.get("page") || 1)}
            variant="solid"
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
        {/* 추가 버튼 */}
        <Button onClick={handleAddFranchiseClick} mb={4}>
          추가
        </Button>
        {/* 다이얼로그 */}
        <FranchiseDialog
          isOpen={isDialogOpen || isAddDialogOpen}
          onClose={handleDialogClose}
          franchiseKey={franchiseKey}
          isAddDialogOpen={isAddDialogOpen}
          onSave={handleSave}
        />
      </Box>
    </Box>
  );
}
