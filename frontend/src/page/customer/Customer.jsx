import React, { useEffect, useState } from "react";
import CustomerList from "../../components/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import CustomerAdd from "../../components/customer/CustomerAdd.jsx";
import CustomerView from "../../components/customer/CustomerView.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { useSearchParams } from "react-router-dom"; // import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerList from "../../components/customer/CustomerList.jsx";
// import CustomerAdd from "../../components/customer/CustomerAdd.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [selectedPage, setSelectedPage] = useState("view");
  const [customerKey, setCustomerKey] = useState(2);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [checkedActive, setCheckedActive] = useState(
    false || searchParams.get("active") === "true",
  );
  const [search, setSearch] = useState({
    type: searchParams.get("type") ?? "all",
    keyword: searchParams.get("key") ?? "",
  });

  //삭제 정보도 같이 보기
  function toggleCheckedActive() {
    const nextValue = !checkedActive;
    setCheckedActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  }

  useEffect(() => {
    axios
      .get(`api/customer/list`, {
        params: {
          type: searchParams.get("type") || "all",
          keyword: searchParams.get("keyword") || "",
          page: searchParams.get("page") || "1",
          active: checkedActive.toString(),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCount(data.count);
        setCustomerList(data.customerList);
      });
  }, [searchParams, checkedActive]);
  // console.log(customerList);

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

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  //검색어 변경 처리
  function handleSearchClick() {
    const nextSearchParam = new URLSearchParams(searchParams);

    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      nextSearchParam.set("page", "1");
      nextSearchParam.set("active", false);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }

    setSearchParams(nextSearchParam);
  }

  //pagination
  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam);

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터를 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  return (
    <Box>
      <HStack align={"flex-start"}>
        <Stack>
          <SideBar />
        </Stack>
        <Stack>
          <Heading>협력사 조회</Heading>

          <CustomerList
            customerList={customerList}
            customerKey={customerKey}
            setCustomerKey={setCustomerKey}
            currentPage={currentPage}
            count={count}
            handlePageChange={handlePageChange}
            setSearchParams={setSearchParams}
            checkedActive={checkedActive}
            toggleCheckedActive={toggleCheckedActive}
            setCheckedActive={setCheckedActive}
            search={search}
            setSearch={setSearch}
            handleSearchClick={handleSearchClick}
          />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}

          {/* 조건부 렌더링 */}
          {selectedPage === "add" ? (
            <CustomerAdd onCancel={() => handleSelectPage("view")} />
          ) : (
            <CustomerView customerKey={customerKey} />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}

export default Customer;
