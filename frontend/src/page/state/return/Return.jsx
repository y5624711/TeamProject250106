import React, { useEffect, useState } from "react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import ReturnList from "../../../components/state/return/ReturnList.jsx";
import axios from "axios";
import { Button } from "../../../components/ui/button.jsx";
import ReturnRequest from "../../../components/state/return/ReturnRequest.jsx";

function Return(props) {
  const [returnList, setReturnList] = useState([]);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/return/list")
      .then((res) => res.data)
      .then((data) => setReturnList(data));
  }, []);

  const handleRequestClick = () => {
    axios.post("/api/return/request", returnData);
  };

  // console.log("list", returnList);

  return (
    <Box display="flex" height="100vh">
      <StateSideBar />
      <Stack w={"100%"} mx={"auto"}>
        <Text fontSize="xl" mx={10} my={3}>
          구매/설치 관리 {">"} 반품/회수 관리
        </Text>
        <ReturnList returnList={returnList} />
        <Flex justify="flex-end">
          <Button onClick={() => setRequestDialogOpen(true)}>반품 요청</Button>
        </Flex>
      </Stack>
      <ReturnRequest
        isOpen={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
      />
    </Box>
  );
}

export default Return;
