import React, { useEffect, useState } from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import {
  Box,
  createListCollection,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import StocktakingSearch from "../../../components/stock/stocktaking/StocktakingSearch.jsx";
import StocktakingList from "../../../components/stock/stocktaking/StocktakingList.jsx";

function Stocktaking(props) {
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [stocktakingList, setStocktakingList] = useState([]);
  const [countStocktaking, setCountStocktaking] = useState("");

  // 재고실사 정보 가져오기
  useEffect(() => {
    axios
      .get(`/api/stocktaking/list?${searchParams.toString()}`)
      .then((res) => {
        setStocktakingList(res.data.list);
        setCountStocktaking(res.data.count);
      });
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/stocktaking/list?${searchQuery.toString()}`);
  }

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/stocktaking/list?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StockSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            물류 관리 {">"} 재고 실사
          </Heading>
          {/* 검색 jsx */}
          <StocktakingSearch
            stocktakingOptionList={stocktakingOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <Box h={7}></Box>
          {/*리스트 jsx*/}
          <StocktakingList
            countStocktaking={countStocktaking}
            stocktakingList={stocktakingList}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const stocktakingOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "시리얼 번호", value: "serialNumber" },
    { label: "품목명", value: "itemName" },
    { label: "창고명", value: "warehouseName" },
    { label: "협력업체 직원", value: "customerEmployeeName" },
    { label: "협력업체 직원 사번", value: "customerEmployeeNumber" },
    { label: "날짜", value: "date" },
  ],
});

export default Stocktaking;
