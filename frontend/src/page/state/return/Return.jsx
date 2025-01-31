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

  const state = searchParams.get("state") || "all";
  const sort = searchParams.get("sort") || "date";
  const order = searchParams.get("order") || "desc";

  //목록 불러오기
  const fetchReturnList = () => {
    axios
      .get("/api/return/list", { params: searchParams })
      .then((res) => res.data)
      .then((data) => {
        setReturnList(data.returnList);
        setCount(data.count);
      })
      .catch((e) => console.error("목록 불러오기 에러", e));
  };

  // 컴포넌트가 렌더링될 때 목록 불러오기
  useEffect(() => {
    fetchReturnList();
  }, [searchParams]);

  // 요청 성공 후 목록 새로고침
  const handleRequestClick = () => {
    fetchReturnList();
  };

  //페이지 이동
  function handlePageChange(e) {
    // console.log(e);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  // state 변경 핸들러
  const handleStateChange = (newState) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("state", newState.value); // 새로운 state 값 반영
    nextSearchParams.set("page", 1); // 상태 변경 시 페이지를 초기화
    setSearchParams(nextSearchParams);
  };

  //테이블 행 클릭
  const handleRowClick = (requestKey) => {
    // console.log(requestKey);
    setReturnRequestKey(requestKey);
    setApproveDialogOpen(true);
  };

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
            count={count}
            onRowClick={handleRowClick}
            state={state}
            handlePageChange={handlePageChange}
            onStateChange={handleStateChange}
            sort={sort}
            order={order}
          />
          <Flex justify="flex-end">
            <Button onClick={() => setRequestDialogOpen(true)}>
              반품 요청
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
          isOpen={approveDialogOpen}
          onClose={() => setApproveDialogOpen(false)}
          onApprove={handleRequestClick}
        />
      </HStack>
    </Box>
  );
}

export default Return;
