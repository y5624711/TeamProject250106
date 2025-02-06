import React, { useEffect, useState } from "react";
import CustomerList from "../../../components/standard/customer/CustomerList.jsx";
import axios from "axios";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import CustomerAdd from "../../../components/standard/customer/CustomerAdd.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { useSearchParams } from "react-router-dom";
import { toaster } from "../../../components/ui/toaster.jsx";
import CustomerView from "../../../components/standard/customer/CustomerView.jsx";

function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [customerKey, setCustomerKey] = useState(null);
  const [count, setCount] = useState(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [checkedActive, setCheckedActive] = useState(
    searchParams.get("active") === "true",
  );
  const [search, setSearch] = useState({
    type: searchParams.get("type") ?? "all",
    keyword: searchParams.get("keyword") ?? "",
  });
  const [standard, setStandard] = useState({
    sort: searchParams.get("sort") || "customer_key",
    order: searchParams.get("order") || "DESC",
  });

  // 최신 고객 리스트 가져오기
  const fetchUpdatedCustomerList = () => {
    // console.log("standard", standard);
    axios
      .get(`/api/customer/list`, {
        params: {
          sort: standard.sort,
          order: standard.order,
          page: searchParams.get("page") || "1",
          type: search.type,
          keyword: search.keyword,
          active: checkedActive.toString(),
        },
      })
      .then((res) => {
        setCustomerList(res.data.customerList);
        setCount(res.data.count);
      })
      .catch((error) =>
        console.error("업데이트 고객 목록 불러오기 오류:", error),
      );
  };

  // console.log("out", standard);

  // searchParams & checkedActive 변경 시 한 번만 실행
  useEffect(() => {
    fetchUpdatedCustomerList();
    setSearch({
      type: searchParams.get("type") || "all",
      keyword: searchParams.get("keyword") || "",
    });
    setStandard({
      sort: searchParams.get("sort") || "customer_key",
      order: searchParams.get("order") || "DESC",
    });
    setCheckedActive(searchParams.get("active") === "true");
  }, [searchParams, checkedActive]);

  // 협력사 등록
  const handleSaveClick = (customerData) => {
    axios
      .post("api/customer/add", customerData)
      .then((res) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: res.data.message.type,
          description: res.data.message.text,
        });
        setAddDialogOpen(false);
      })
      .catch((e) => {
        toaster.create({
          type: e.response.data.message.type,
          description: e.response.data.message.text,
        });
      });
  };

  // 협력사 수정
  const handleEditClick = (customerData) => {
    axios
      .put("api/customer/edit", customerData)
      .then((res) => {
        fetchUpdatedCustomerList();
        toaster.create({
          type: res.data.message.type,
          description: res.data.message.text,
        });
      })
      .catch((e) => {
        toaster.create({
          type: e.response.data.message.type,
          description: e.response.data.message.text,
        });
      });
  };

  // 리스트 행 클릭 시
  const handleRowClick = (key) => {
    setCustomerKey(key);
    setEditDialogOpen(true);
  };

  // 체크박스 상태 변경 (setSearchParams 최소 호출)
  const toggleCheckedActive = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const newValue = !(prev.get("active") === "true");
      if (prev.get("active") === newValue.toString()) return prev; // 변경 없으면 업데이트 안 함
      next.set("active", newValue.toString());
      next.set("page", "1");
      return next;
    });
  };

  // 검색 실행
  const handleSearchClick = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (search.keyword.trim().length > 0) {
        next.set("type", search.type);
        next.set("keyword", search.keyword);
        next.set("page", "1");
      } else {
        next.delete("type");
        next.delete("keyword");
      }
      return next;
    });
  };

  // 정렬 처리
  const handleStandard = (sort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const currentSort = prev.get("sort");
      const currentOrder = prev.get("order") || "ASC";

      const newOrder =
        currentSort === sort && currentOrder === "ASC" ? "DESC" : "ASC";
      if (currentSort === sort && currentOrder === newOrder) return prev; // 변경 없으면 업데이트 안 함

      next.set("sort", sort);
      next.set("order", newOrder);

      setStandard({ sort, order: newOrder });
      // console.log("next", sort, ",", newOrder);

      return next;
    });
  };

  // 페이지 번호 변경
  const handlePageChange = (e) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", e);
      return next;
    });
  };

  // 검색 초기화
  const handleResetClick = () => {
    setSearchParams({ page: "1" }); // searchParams 초기화
    setSearch({ type: "all", keyword: "" }); // search 상태도 초기화
  };

  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StandardSideBar />
        <Stack flex={1} p={5} pb={0}>
          <Heading size="xl" mb={3} p={2}>
            기준정보 관리 {">"} 협력 업체 관리
          </Heading>

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
            onReset={handleResetClick}
            onNewClick={() => setAddDialogOpen(true)}
          />
        </Stack>

        {/* Dialog */}
        <div>
          <CustomerAdd
            customerList={customerList}
            isOpen={addDialogOpen}
            onCancel={() => setAddDialogOpen(false)}
            onSave={handleSaveClick}
          />
          <CustomerView
            isOpen={editDialogOpen}
            customerKey={customerKey}
            onEdit={handleEditClick}
            onCancel={() => setEditDialogOpen(false)}
          />
        </div>
      </HStack>
    </Box>
  );
}

export default Customer;
