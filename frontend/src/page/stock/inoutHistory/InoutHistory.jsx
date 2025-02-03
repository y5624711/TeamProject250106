import React, { useEffect, useState } from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import {
  Box,
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

function InoutHistory(props) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [state, setState] = useState("all");
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
    sort: "",
    order: "",
    state: state,
  });
  const navigate = useNavigate();
  const [inoutHistoryList, setInoutHistoryList] = useState([]);
  const [countInoutHistory, setCountInoutHistory] = useState("");
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
  }, [searchParams, state]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
      sort: search.sort,
      order: search.order,
      page: 1,
      state: search.state,
    };
    setSearchParams(new URLSearchParams(searchInfo)); // searchParams 업데이트
  }

  function handlePageChangeClick(e) {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
      sort: search.sort,
      order: search.order,
      page: e.page,
      state: search.state,
    };
    setSearchParams(new URLSearchParams(searchInfo)); // searchParams 업데이트
  }

  useEffect(() => {
    const currentState = searchParams.get("state") || "all";
    setState(currentState); // UI와 동기화
  }, [searchParams]);

  const onRadioChange = (nextSearchParam) => {
    setSearchParams(nextSearchParam);
    setSearch({
      type: search.type,
      keyword: search.keyword,
      state: nextSearchParam.toString(),
      order: search.order,
      sort: search.sort,
    });
  };

  const handleRadio = (value) => {
    setState(value);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("state", value);
    nextSearchParams.set("page", "1");

    onRadioChange(value); // 부모 컴포넌트로 선택된 값 전달

    setSearchParams(nextSearchParams);
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StockSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            물류 관리 {">"} 물품 입출내역
          </Heading>
          {/* 검색 jsx */}
          <InoutHistorySearch
            inoutHistoryOptionList={inoutHistoryOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <RadioGroup
            value={search.state}
            onValueChange={(value) => {
              handleRadio(value.value);
            }}
            my={6}
            ml={2}
            mt={4}
            onRadioChange={(nextSearchParam) => {
              setSearchParams(nextSearchParam);
              setSearch(...search, {
                type: search.type,
                keyword: search.keyword,
                state: value,
                sort: search.sort,
                order: search.order,
              });
            }}
          >
            <HStack gap={6}>
              {radioOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
          {/*리스트 jsx*/}
          <InoutHistoryList
            inoutHistoryList={inoutHistoryList}
            currentPage={currentPage}
            setSearchParams={setSearchParams}
            handlePageChangeClick={handlePageChangeClick}
            countInoutHistory={countInoutHistory}
            search={search}
            setSearch={setSearch}
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const radioOptions = [
  { value: "all", label: "전체 내역" },
  { value: "storage", label: "입고 내역" },
  { value: "retrieval", label: "출고 내역" },
];

const inoutHistoryOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "품목", value: "item" },
    { label: "시리얼 번호", value: "serialNo" },
    { label: "담당 업체", value: "customer" },
    { label: "창고", value: "warehouse" },
    { label: "가맹점", value: "franchise" },
    { label: "본사 직원", value: "businessEmployee" },
    { label: "협력 업체 직원", value: "customerEmployee" },
    { label: "사번", value: "employeeNumber" },
  ],
});

export default InoutHistory;
