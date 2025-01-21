import React, { useEffect, useState } from "react";
import { StockSideBar } from "../../components/tool/sidebar/StockSideBar.jsx";
import { Box, createListCollection, HStack, Stack } from "@chakra-ui/react";
import StorageRetrievalSearch from "../../components/stock/storageRetrieval/StorageRetrievalSearch.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import StorageRetrievalList from "../../components/stock/storageRetrieval/StorageRetrievalList.jsx";

function StorageRetrieval(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [storageRetrievalList, setStorageRetrievalList] = useState([]);
  const [countStorageRetrieval, setCountStorageRetrieval] = useState("");
  const [searchParams] = useSearchParams();
  const [useColumn, setUseColumn] = useState("");
  const [currentPage, setCurrentPage] = useState("");

  // 물품입출내역 정보 가져오기
  useEffect(() => {
    axios
      .get(`/api/storageRetrieval/list?${searchParams.toString()}`)
      .then((res) => {
        setStorageRetrievalList(res.data.list);
        setCountStorageRetrieval(res.data.count);
      });
    window.scrollTo(0, 0);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/storageRetrieval/list?${searchQuery.toString()}`);
  }

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/storageRetrieval/list?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  return (
    <Box>
      <HStack align="flex-start">
        <StockSideBar />
        <Stack>
          <Box>물류 관리 > 물품입출내역</Box>
          {/* 검색 jsx */}
          <StorageRetrievalSearch
            storageRetrievalOptionList={storageRetrievalOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          {/* TODO: 전체 / 입고 / 출고 체크박스 넣기*/}
          {/*리스트 jsx*/}
          <StorageRetrievalList
            countStorageRetrieval={countStorageRetrieval}
            storageRetrievalList={storageRetrievalList}
            useColumn={useColumn}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const storageRetrievalOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "시리얼 번호", value: "serialNumber" },
    { label: "입출 구분", value: "customer" },
    { label: "품목명", value: "itemName" },
    { label: "창고명", value: "warehouseName" },
    { label: "가맹점명", value: "franchiseName" },
    { label: "본사 직원", value: "businessEmployeeName" },
    { label: "본사 직원 사번", value: "businessEmployeeNumber" },
    { label: "협력업체 직원", value: "customerEmployeeName" },
    { label: "협력업체 직원 사번", value: "customerEmployeeNumber" },
    { label: "날짜", value: "date" },
  ],
});

export default StorageRetrieval;
