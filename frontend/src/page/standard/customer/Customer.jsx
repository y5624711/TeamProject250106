import React, { useEffect, useState } from "react";
import CustomerList from "../../../components/standard/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import CustomerAdd from "../../../components/standard/customer/CustomerAdd.jsx";
import CustomerView from "../../../components/standard/customer/CustomerView.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { useSearchParams } from "react-router-dom";
import { toaster } from "../../../components/ui/toaster.jsx";
import CustomerEdit from "../../../components/standard/customer/CustomerEdit.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [customerKey, setCustomerKey] = useState(null);
  const [count, setCount] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
  const [standard, setStandard] = useState({ sort: "", order: "ASC" });

  // 초기 데이터 불러오기
  const fetchInitialCustomerList = () => {
    axios
      .get(`/api/customer/list`, {
        params: {
          sort: "",
          order: "ASC",
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

  // 리스트 행 클릭 시 동작
  const handleRowClick = (key) => {
    setCustomerKey(key);
    setViewDialogOpen(true);
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
        setAddDialogOpen(false);
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  const handleEditRequest = () => {
    if (customerKey) {
      setViewDialogOpen(false);
      setEditDialogOpen(true);
    }
  };

  //수정 저장 버튼
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
        setEditDialogOpen(false);
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
        setViewDialogOpen(false);
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
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
          sort: searchParams.get("sort") || "customer_key",
          order: searchParams.get("order") || "asc",
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
    nextSearchParams.set("page", e);
    setSearchParams(nextSearchParams);
  }

  useEffect(() => {
    const pageParam = Number(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [searchParams]);

  function handleStandard(sort) {
    const currentSort = searchParams.get("sort");
    const currentOrder = searchParams.get("order");

    const newOrder =
      currentSort === sort && currentOrder === "asc" ? "desc" : "asc";

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", sort);
    nextSearchParams.set("order", newOrder);

    setSearchParams(nextSearchParams);
  }

  useEffect(() => {
    const sort = searchParams.get("sort") || "customer_key";
    const order = searchParams.get("order") || "asc";
    setStandard({ sort, order });
  }, [searchParams]);

  // console.log("p", standard);

  return (
    <Box display={"flex"} h={"100vh"}>
      <StandardSideBar />
      <Stack w={"100%"} mx={"auto"}>
        <Text fontSize="xl" mx={10} my={3}>
          기준정보 관리 {">"} 협력업체 관리
        </Text>

        <CustomerList
          customerList={customerList}
          standard={standard}
          onHeader={handleStandard}
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
        <Flex justify="flex-end">
          <Button
            onClick={() => setAddDialogOpen(true)}
            size={"lg"}
            position="absolute"
            bottom="100px"
            right="100px"
          >
            협력업체 등록
          </Button>
        </Flex>
      </Stack>
      {/*Dialog*/}
      <div>
        <CustomerAdd
          isOpen={addDialogOpen}
          onCancel={() => setAddDialogOpen(false)}
          onSave={handleSaveClick}
        />
        <CustomerView
          isOpen={viewDialogOpen}
          customerKey={customerKey}
          onDelete={handleDeleteClick}
          onEdit={handleEditRequest}
          onCancel={() => setViewDialogOpen(false)}
        />
        <CustomerEdit
          isOpen={editDialogOpen}
          customerKey={customerKey}
          onEdit={handleEditClick}
          onCancel={() => setEditDialogOpen(false)}
        />
      </div>
    </Box>
  );
}

export default Customer;
