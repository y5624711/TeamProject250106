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
import { SysCommonCodeViewDialog } from "../../components/commonCode/SysCommonCodeViewDialog.jsx";
import { SysCommonCodeAdd } from "../../components/commonCode/SysCommonCodeAdd.jsx";

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

  // 모달
  const [sysCommonCode, setSysCommonCode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 저장체크
  const [addCheck, setAddCheck] = useState(false);

  // 리스트 불러오기
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
  }, [searchParams, sort, addCheck]);

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

  // 사용여부 체크
  const active = searchParams.get("active") === "true";
  // 사용여부 체크
  const toggleCheckActive = () => {
    const nextValue = !active;
    // setActive(nextValue);
    //
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  };

  // 리스트 클릭시  다이얼로그 오픈
  function handleOpenDialog(data) {
    console.log(data);
    setSysCommonCode(data);
    setIsOpen(true);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex>
      <SideBar />
      <Stack w={"80%"} mx={"auto"} pt={5}>
        <Box w={"40%"} mx={"auto"}>
          {/*체크박스*/}
          <Checkbox
            size={"lg"}
            variant={"subtle"}
            checked={active}
            onCheckedChange={toggleCheckActive}
          >
            삭제된 공통코드 포함
          </Checkbox>

          {/*검색*/}
          <HStack gap={5}>
            <SysCommonCodeSearchAndFilter
              search={search}
              setSearch={setSearch}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />

            {/*공통코드 추가 모달*/}
            <SysCommonCodeAdd setAddCheck={setAddCheck} addCheck={addCheck} />
          </HStack>
        </Box>

        {/*리스트*/}
        <SystemCommonCodeList
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          commonCodeList={commonList}
          count={count}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          openDialog={handleOpenDialog}
        />

        {/*페이지네이션*/}
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

      <SysCommonCodeViewDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        toggleEditing={() => setIsEditing(!isEditing)}
        sysCommonCode={sysCommonCode}
        setSysCommonCode={setSysCommonCode}
        addCheck={addCheck}
        setAddCheck={setAddCheck}
      />
    </Flex>
  );
}

export default SystemCommonCode;
