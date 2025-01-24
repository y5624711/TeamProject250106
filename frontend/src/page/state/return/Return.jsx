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

  const page = searchParams.get("page") || 1;
  const type = searchParams.get("type") || "all";
  const keyword = searchParams.get("keyword") || "";
  const state = searchParams.get("state") || "all";
  const sort = searchParams.get("sort") || "date";
  const order = searchParams.get("order") || "desc";

  //목록 불러오기
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/return/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log("반환", data);
        setReturnList(data.returnList);
        setCount(data.count);
      });
    return () => {
      controller.abort();
    };
  }, [searchParams]);

  console.log("searchParams", searchParams.toString());

  //페이지 이동
  function handlePageChange(e) {
    console.log(e);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  //검색
  function handleSearchClick() {
    const nextSearchParams = new URLSearchParams(searchParams);
    if (keyword.trim().length > 0) {
      //검색 입력
      nextSearchParams.set("type", type);
      nextSearchParams.set("type", keyword);
      nextSearchParams.set("page", 1);
      setSearchParams(nextSearchParams);
    } else {
      //기본
      nextSearchParams.delete("type");
      nextSearchParams.delete("keyword");
    }
  }

  //요청창 작성 후 버튼 클릭 : returnRequest
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
            state={state}
            handlePageChange={handlePageChange}
            searchParams={searchParams}
            onSearchClick={handleSearchClick}
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
