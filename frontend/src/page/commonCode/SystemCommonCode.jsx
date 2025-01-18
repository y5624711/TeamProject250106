import React, { useEffect, useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import { SystemCommonCodeList } from "./SystemCommonCodeList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

function SystemCommonCode() {
  const [commonList, setCommonList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/commonCode/system/list")
      .then((res) => res.data)
      .then((data) => {
        setCommonList(data);
      });
  }, []);

  return (
    <Flex>
      <SideBar />
      <Stack w={"80%"} mx={"auto"}>
        <SystemCommonCodeList commonCodeList={commonList} />
      </Stack>
    </Flex>
  );
}

export default SystemCommonCode;
