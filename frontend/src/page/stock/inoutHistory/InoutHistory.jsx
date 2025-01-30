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
import InoutHistorySearch from "../../../components/stock/inoutHistory/InoutHistorySearch.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import InoutHistoryList from "../../../components/stock/inoutHistory/InoutHistoryList.jsx";
import { Radio, RadioGroup } from "../../../components/ui/radio.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";

function InoutHistory(props) {
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const navigate = useNavigate();
  const [inoutHistoryList, setInoutHistoryList] = useState([]);
  const [countInoutHistory, setCountInoutHistory] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [value, setValue] = useState("inout");

  // 물품입출내역 정보 가져오기
  useEffect(() => {
    axios
      .get(`/api/inoutHistory/list?${searchParams.toString()}`)
      .then((res) => {
        setInoutHistoryList(res.data.list);
        setCountInoutHistory(res.data.count);
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
    navigate(`/inoutHistory/list?${searchQuery.toString()}`);
  }

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/inoutHistory/list?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StockSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            물류 관리 {">"} 물품입출내역
          </Heading>
          {/* 검색 jsx */}
          <InoutHistorySearch
            inoutHistoryOptionList={inoutHistoryOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <RadioGroup
            value={value}
            my={1}
            onValueChange={(e) => setValue(e.value)}
          >
            {/*TODO: Radio 기능 넣기*/}
            <HStack gap={6}>
              <Radio value="inout">전체 내역</Radio>
              <Radio value="storage">입고 내역</Radio>
              <Radio value="retrieval">출고 내역</Radio>
            </HStack>
          </RadioGroup>
          {/*리스트 jsx*/}
          <InoutHistoryList
            inoutHistoryList={inoutHistoryList}
            currentPage={currentPage}
            setSearchParams={setSearchParams}
          />
        </Stack>
      </HStack>
      <Center>
        <PaginationRoot
          onPageChange={handlePageChangeClick}
          count={countInoutHistory}
          pageSize={10}
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

const inoutHistoryOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "시리얼 번호", value: "serialNo" },
    { label: "품목", value: "item" },
    { label: "담당 업체", value: "customer" },
    { label: "창고", value: "warehouse" },
    { label: "가맹점", value: "franchise" },
    { label: "본사 직원", value: "businessEmployee" },
    { label: "협력업체 직원", value: "customerEmployee" },
    { label: "사번", value: "employeeNumber" },
    { label: "날짜", value: "date" },
  ],
});

export default InoutHistory;
