import React, { useEffect, useState } from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import {
  Box,
  Center,
  createListCollection,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import StocktakingSearch from "../../../components/stock/stocktaking/StocktakingSearch.jsx";
import StocktakingList from "../../../components/stock/stocktaking/StocktakingList.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";
import { Button } from "../../../components/ui/button.jsx";
import StocktakingAdd from "../../../components/stock/stocktaking/StocktakingAdd.jsx";

function Stocktaking(props) {
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [stocktakingList, setStocktakingList] = useState([]);
  const [countStocktaking, setCountStocktaking] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // 재고실사 정보 가져오기
  useEffect(() => {
    axios
      .get(`/api/stocktaking/list?${searchParams.toString()}`)
      .then((res) => {
        setStocktakingList(res.data.list);
        setCountStocktaking(res.data.count);
      });
    window.scrollTo(0, 0);
  }, [searchParams, isAddDialogOpen]);

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
          <Box h={11}></Box>
          {/*리스트 jsx*/}
          <StocktakingList
            stocktakingList={stocktakingList}
            currentPage={currentPage}
            setSearchParams={setSearchParams}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button width="85px" onClick={() => setIsAddDialogOpen(true)}>
              실사 등록
            </Button>
          </Box>
          {/*등록 jsx*/}
          <StocktakingAdd
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            title="실사 등록"
            setStocktakingList={setStocktakingList}
            searchParams={searchParams}
          />
        </Stack>
      </HStack>

      <Center>
        <PaginationRoot
          onPageChange={handlePageChangeClick}
          count={countStocktaking}
          pageSize={10}
          // page={page}
          siblingCount={2}
          defaultPage={currentPage}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Box>
  );
}

const stocktakingOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "담당 업체", value: "customer" },
    { label: "품목", value: "item" },
    { label: "창고", value: "warehouse" },
    { label: "담당자", value: "customerEmployee" },
    { label: "실사 유형", value: "type" },
    { label: "날짜", value: "date" },
  ],
});

export default Stocktaking;
