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

  // 고객 목록 불러오기 함수
  const fetchCustomerList = () => {
    axios
      .get(`/api/customer/list`)
      .then((res) => {
        const { count, customerList } = res.data;
        setCustomerList(customerList);
        setCount(count);

        // URL에 customerKey가 없으면 첫 번째 고객으로 설정
        if (!searchParams.get("customerKey") && customerList.length > 0) {
          const defaultKey = customerList[0].customerKey;
          setCustomerKey(defaultKey);
          const nextSearchParams = new URLSearchParams(searchParams);
          nextSearchParams.set("customerKey", defaultKey);
          setSearchParams(nextSearchParams);
        }
      })
      .catch((error) => {
        console.error("고객 목록을 불러오는 중 오류가 발생했습니다.", error);
      });
  };
  console.log("p", customerList);
  console.log("key", customerKey);

  // 컴포넌트가 마운트될 때 목록 불러오기 및 URL에서 customerKey 설정
  useEffect(() => {
    const keyFromURL = searchParams.get("customerKey");
    if (keyFromURL) {
      setCustomerKey(keyFromURL);
    }
    fetchCustomerList();
  }, [searchParams]);

  // customerKey 변경 시 URL 쿼리 파라미터 업데이트
  const handleCustomerKeyChange = (key) => {
    setCustomerKey(key);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("customerKey", key);
    setSearchParams(nextSearchParams);
  };

  //협력사 등록
  const handleSaveClick = (customerData) => {
    axios
      .post("api/customer/add", customerData)
      .then((res) => res.data)
      .then((data) => {
        fetchCustomerList();
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
        fetchCustomerList();
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
        fetchCustomerList();
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
            setCustomerKey={handleCustomerKeyChange}
            currentPage={currentPage}
            count={count}
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
