import React, { useEffect, useState } from "react";
import { Box, Center, Flex, HStack, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import { SystemCommonCodeList } from "../../components/commonCode/SystemCommonCodeList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { useSearchParams } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { SysCommonCodeSearchAndFilter } from "../../components/commonCode/SysCommonCodeSearchAndFilter.jsx";
import { Button } from "../../components/ui/button.jsx";

function SystemCommonCode() {
  const [loading, setLoading] = useState(true);
  const [commonList, setCommonList] = useState([]);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState({
    column: "common_code_key",
    order: "desc",
  });
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
          sort: sort.column,
          order: sort.order,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setCommonList(data.list);
        setCount(data.count);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams, sort]);

  // 검색창
  useEffect(() => {
    const nextSearch = { ...search };

    if (searchParams.get("type")) {
      nextSearch.type = searchParams.get("type");
    } else {
      nextSearch.type = "number";
    }
    if (searchParams.get("keyword")) {
      nextSearch.keyword = searchParams.get("keyword");
    } else {
      nextSearch.keyword = "";
    }

    setSearch(nextSearch);
  }, [searchParams, sort]);

  function handlePageChange(e) {
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("page", e.page);
    setSearchParams(nextSearchParam);
  }

  const active = searchParams.get("active") === "true";

  const toggleCheckActive = () => {
    const nextValue = !active;
    // setActive(nextValue);
    //
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <Flex>
      <SideBar />
      <Stack w={"80%"} mx={"auto"} pt={5}>
        <Box w={"40%"} mx={"auto"}>
          <Checkbox
            size={"lg"}
            variant={"subtle"}
            checked={active}
            onCheckedChange={toggleCheckActive}
          >
            삭제된 공통코드 포함
          </Checkbox>
          <HStack>
            <SysCommonCodeSearchAndFilter
              search={search}
              setSearch={setSearch}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <Button>추가</Button>
          </HStack>
        </Box>
        <SystemCommonCodeList
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          commonCodeList={commonList}
          count={count}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Center>
          <PaginationRoot
            count={count}
            pageSize={10}
            page={page}
            variant="solid"
            onPageChange={handlePageChange}
          >
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </PaginationRoot>
        </Center>
      </Stack>
    </Flex>
  );
}

export default SystemCommonCode;
