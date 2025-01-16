import React, { useEffect, useState } from "react";
import CustomerList from "../../components/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import CustomerAdd from "../../components/customer/CustomerAdd.jsx";
import CustomerView from "../../components/customer/CustomerView.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { useSearchParams } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [selectedPage, setSelectedPage] = useState("view");
  const [customerKey, setCustomerKey] = useState(null);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
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
  // const [currentSort, setCurrentSort] = useState("index");
  // const [currentOrder, setCurrentOrder] = useState("ASC");

  // 고객 목록 불러오기 함수
  // 초기 데이터 불러오기
  const fetchInitialCustomerList = () => {
    axios
      .get(`/api/customer/list`, {
        params: {
          page: "1",
          type: "all",
          keyword: "",
          active: "true",
        },
      })
      .then((res) => {
        const { count, customerList } = res.data;
        setCustomerList(customerList);
        setCount(count);
        console.log("initial");
        // 초기 customerKey 설정
        if (customerList.length > 0) {
          setCustomerKey(customerList[0].customerKey);
        }
      })
      .catch((error) => {
        console.error("초기 고객 목록 불러오기 오류:", error);
      });
  };
  // console.log("p", customerList);
  // console.log("key", customerKey);

  // 컴포넌트가 마운트될 때 목록 불러오기 및 URL에서 customerKey 설정
  useEffect(() => {
    const keyFromURL = searchParams.get("customerKey");
    if (keyFromURL) {
      setCustomerKey(keyFromURL);
    }
    fetchUpdatedCustomerList();
  }, [searchParams]);

  // customerKey 변경 시 URL 쿼리 파라미터 업데이트
  // const handleCustomerKeyChange = (key) => {
  //   setCustomerKey(key);
  //   const nextSearchParams = new URLSearchParams(searchParams);
  //   nextSearchParams.set("customerKey", key);
  //   setSearchParams(nextSearchParams);
  // };

  // 리스트 행 클릭 시 동작
  const handleRowClick = (key) => {
    setCustomerKey(key);
    setSelectedPage("view");
  };

  //협력사 등록
  const handleSaveClick = (customerData) => {
    axios
      .post("api/customer/add", customerData)
      .then((res) => res.data)
      .then((data) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  //수정 버튼
  const handleEditClick = (customerData) => {
    // console.log(customer);
    axios
      .put("api/customer/edit", customerData)
      .then((res) => res.data)
      .then((data) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  const handleDeleteClick = () => {
    axios
      .put(`api/customer/delete/${customerKey}`)
      .then((res) => res.data)
      .then((data) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        console.log("now", data);
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  // 삭제 내역 포함 체크박스 상태 토글 및 URL 업데이트
  const toggleCheckedActive = () => {
    const nextValue = !checkedActive;
    setCheckedActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  };

  // 검색 타입 변경 처리 및 URL 업데이트
  const handleSearchTypeChange = (type) => {
    setSearch((prev) => ({ ...prev, type }));

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("type", type);
    setSearchParams(nextSearchParams);
  };

  // 검색 실행 처리 및 URL 업데이트
  const handleSearchClick = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (search.keyword.trim().length > 0) {
      nextSearchParams.set("type", search.type);
      nextSearchParams.set("keyword", search.keyword);
    } else {
      nextSearchParams.delete("type");
      nextSearchParams.delete("keyword");
    }

    setSearchParams(nextSearchParams);
  };

  // 업데이트 데이터 불러오기
  const fetchUpdatedCustomerList = () => {
    axios
      .get(`/api/customer/list`, {
        params: {
          page: searchParams.get("page") || "1",
          type: searchParams.get("type") || "all",
          keyword: searchParams.get("keyword") || "",
          active: checkedActive.toString(),
        },
      })
      .then((res) => {
        const { count, customerList } = res.data;
        setCustomerList(customerList);
        setCount(count);
        // update시 customerKey 설정
        if (customerList.length > 0) {
          setCustomerKey(customerList[0].customerKey);
        }
      })
      .catch((error) => {
        console.error("업데이트 고객 목록 불러오기 오류:", error);
      });
  };

  // 상태가 변경될 때만 업데이트된 데이터 불러오기
  useEffect(() => {
    if (
      searchParams.get("page") ||
      searchParams.get("type") ||
      searchParams.get("keyword")
    ) {
      fetchUpdatedCustomerList();
      console.log("second");
    }
  }, [searchParams, checkedActive]);

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

  //pagination
  const pageParam = searchParams.get("page") ?? "1";
  const page = Number(pageParam);

  // 페이지 번호 변경 시 URL 의 쿼리 파라미터를 업데이트
  function handlePageChange(e) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

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
            onRowClick={handleRowClick}
            handlePageChange={handlePageChange}
            setSearchParams={setSearchParams}
            checkedActive={checkedActive}
            toggleCheckedActive={toggleCheckedActive}
            search={search}
            setSearch={setSearch}
            handleSearchClick={handleSearchClick}
            handleSearchTypeChange={handleSearchTypeChange}
          />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}

          {/* 조건부 렌더링 */}
          {selectedPage === "add" ? (
            <CustomerAdd
              onSave={handleSaveClick}
              onCancel={() => handleSelectPage("view")}
            />
          ) : (
            <CustomerView
              customerKey={customerKey}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
            />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}

export default Customer;
