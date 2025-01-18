import React, { useEffect, useState } from "react";
import { Flex, Stack } from "@chakra-ui/react";
import axios from "axios";
import { SystemCommonCodeList } from "./SystemCommonCodeList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { useSearchParams } from "react-router-dom";

function SystemCommonCode() {
  const [loading, setLoading] = useState(true);
  const [commonList, setCommonList] = useState([]);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState({ column: "", order: "desc" });
  const [search, setSearch] = useState({ type: "number", keyword: "" });
  const [searchParams, setSearchParams] = useSearchParams();

  //페이지 번호얻기
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  useEffect(() => {
    axios
      .get("/api/commonCode/system/list", {
        params: {
          ...Object.fromEntries(searchParams),
          sortColum: sort.column,
          sortOrder: sort.order,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data.list);
        setCommonList(data.list);
        setCount(data.count);
      });
  }, []);

  return (
    <Flex>
      <SideBar />
      <Stack w={"80%"} mx={"auto"}>
        <SystemCommonCodeList
          commonCodeList={commonList}
          count={count}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Stack>
    </Flex>
  );
}

export default SystemCommonCode;
