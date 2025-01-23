import React, { useEffect, useState } from "react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Box, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import ReturnList from "../../../components/state/return/ReturnList.jsx";
import axios from "axios";
import { Button } from "../../../components/ui/button.jsx";
import ReturnRequest from "../../../components/state/return/ReturnRequest.jsx";
import ReturnApprove from "../../../components/state/return/ReturnApprove.jsx";
import { useSearchParams } from "react-router-dom";

function Return(props) {
  const [returnList, setReturnList] = useState([]);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [returnRequestKey, setReturnRequestKey] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [count, setCount] = useState(1);
  const [sort, setSort] = useState(searchParams.get("sort") || "all");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const [filters, setFilters] = useState({
    page: searchParams.get("page") || 1,
    type: searchParams.get("type") || "all",
    keyword: searchParams.get("keyword") || "",
    state: searchParams.get("state") || "all",
  });

  // const page = searchParams.get("page") || 1;
  // const type = searchParams.get("type") || "all";
  // const keyword = searchParams.get("keyword") || "";
  // const state = searchParams.get("state") || "all";

  //목록 불러오기
  useEffect(() => {
    axios
      .get("/api/return/list", { params: filters })
      .then((res) => res.data)
      .then((data) => {
        // console.log("반환", data);
        setReturnList(data.returnList);
        setCount(data.count);
      });
  }, [filters]);

  // 필터 값 변경 핸들러
  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setSearchParams(updatedFilters); // URL 갱신
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    handleFilterChange("page", newPage);
  };

  //요청창 작성 후 버튼 클릭
  const handleRequestClick = (newRequest) => {
    setReturnList((prevReturnList) => [newRequest, ...prevReturnList]);
    setRequestDialogOpen(false);
  };

  //테이블 행 클릭
  const handleRowClick = (requestKey) => {
    // console.log(requestKey);
    setReturnRequestKey(requestKey);
    setApproveDialogOpen(true);
  };

  // 검색 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setFilters({
      page: 1,
      type: "all",
      keyword: "",
      state: "all",
    });

    const nextSearchParam = new URLSearchParams();
    nextSearchParam.set("page", "1");
    nextSearchParam.set("type", "all");
    nextSearchParam.set("keyword", "");
    nextSearchParam.set("state", "all");

    setSearchParams(nextSearchParam);
  };

  // console.log("list", returnList);

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StateSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            구매 / 설치 관리 {">"} 반품 / 회수 관리
          </Heading>
          <ReturnList
            returnList={returnList}
            onRowClick={handleRowClick}
            setSearchParams={setSearchParams}
            count={count}
            filters={filters}
            setFilters={setFilters}
            handleFilterChange={handleFilterChange}
            handlePageChange={handlePageChange}
            handleResetClick={handleResetClick}
          />
          <Flex justify="flex-end">
            <Button onClick={() => setRequestDialogOpen(true)}>
              반품 신청
            </Button>
          </Flex>
        </Stack>
        <ReturnRequest
          isOpen={requestDialogOpen}
          onClose={() => setRequestDialogOpen(false)}
          onRequest={handleRequestClick}
        />
        <ReturnApprove
          returnRequestKey={returnRequestKey}
          setReturnRequestKey={setReturnRequestKey}
          isOpen={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          onApprove={handleRequestClick}
        />
      </HStack>
    </Box>
  );
}

export default Return;
