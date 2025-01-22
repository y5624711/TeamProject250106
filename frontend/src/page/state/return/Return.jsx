import React, { useEffect, useState } from "react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
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
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("all");
  const [state, setState] = useState("all");
  const [sort, setSort] = useState(searchParams.get("sort") || "all");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  // 검색 파라미터 기본값 설정
  const initialParams = {
    page: searchParams.get("page") || 1,
    type: searchParams.get("type") || "all",
    keyword: searchParams.get("keyword") || "",
    state: searchParams.get("state") || "all",
  };

  const [filters, setFilters] = useState(initialParams);

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
    // URL 업데이트
    const nextSearchParams = new URLSearchParams(updatedFilters);
    setSearchParams(nextSearchParams);
    console.log("return filters", updatedFilters);
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

  // console.log("list", returnList);

  return (
    <Box display="flex" height="100vh">
      <StateSideBar />
      <Stack w={"80%"} mx={"auto"}>
        <Text fontSize="xl" my={5}>
          구매/설치 관리 {">"} 반품/회수 관리
        </Text>
        <ReturnList
          returnList={returnList}
          onRowClick={handleRowClick}
          setSearchParams={setSearchParams}
          count={count}
          filters={filters}
          setFilters={setFilters}
          handleFilterChange={handleFilterChange}
        />
        <Flex justify="flex-end">
          <Button onClick={() => setRequestDialogOpen(true)}>반품 요청</Button>
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
    </Box>
  );
}

export default Return;
