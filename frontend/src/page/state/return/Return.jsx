import React, { useEffect, useState } from "react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Box, Stack, Text } from "@chakra-ui/react";
import ReturnList from "../../../components/state/return/ReturnList.jsx";
import axios from "axios";

function Return(props) {
  const [returnList, setReturnList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/return/list")
      .then((res) => res.data)
      .then((data) => setReturnList(data));
  }, []);

  console.log("list", returnList);

  return (
    <Box display="flex" height="100vh">
      <StateSideBar />
      <Stack w={"100%"} mx={"auto"}>
        <Text fontSize="xl" mx={10} my={3}>
          구매/설치 관리 {">"} 반품/회수 관리
        </Text>
        <ReturnList returnList={returnList} />
      </Stack>
    </Box>
  );
}

export default Return;
