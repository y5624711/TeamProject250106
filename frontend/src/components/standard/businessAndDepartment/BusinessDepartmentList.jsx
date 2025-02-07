import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../../ui/checkbox.jsx";
import { BusinessSearchAndFilter } from "./BusinessSearchAndFilter.jsx";
import { BusinessListTable } from "./BusinessListTable.jsx";
import { BusinessPageNation } from "./BusinessPageNation.jsx";
import { DepartmentViewAndUpdateDialog } from "./DepartmentViewAndUpdateDialog.jsx";
import { DepartmentAdd } from "./DepartmentAdd.jsx";
import { Button } from "../../ui/button.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";

export function BusinessDepartmentList() {
  const { isAdmin } = useContext(AuthenticationContext);
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState({
    column: "department_code",
    order: "desc",
  });
  const [search, setSearch] = useState({ type: "all", keyword: "" });
  const [addCheck, setAddCheck] = useState(false);

  // 다이얼로그
  const [department, setDepartment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  //페이지 번호얻기
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/department/list", {
        params: {
          ...Object.fromEntries(searchParams),
          sortColum: sort.column,
          sortOrder: sort.order,
        },
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setDepartmentList(data.list);
        setCount(data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [searchParams, sort, addCheck]);

  // 검색창
  useEffect(() => {
    const nextSearch = { ...search };

    if (searchParams.get("st")) {
      nextSearch.type = searchParams.get("st");
    } else {
      nextSearch.type = "all";
    }
    if (searchParams.get("sk")) {
      nextSearch.keyword = searchParams.get("sk");
    } else {
      nextSearch.keyword = "";
    }

    setSearch(nextSearch);
  }, [searchParams]);

  const active = searchParams.get("active") === "true";

  const toggleCheckActive = () => {
    const nextValue = !active;
    // setActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  function handlePageChange(e) {
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("page", e.page);
    setSearchParams(nextSearchParam);
  }

  function handleSort(column) {
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
  }

  function handleOpenDialog(data) {
    setDepartment(data);
    setIsOpen(true);
  }

  const handleAddCheck = () => {
    setAddCheck(!addCheck);
  };

  const handleResetClick = () => {
    setSearchParams({ page: "1" }); // searchParams 초기화
    setSearch({ type: "all", keyword: "" }); // search 상태도 초기화
    setSort({ column: "department_code", order: "desc" });
  };

  if (loading) {
    return null;
  }

  return (
    <Box ml={2} mr={2}>
      {/*검색창&필터*/}
      <BusinessSearchAndFilter
        search={search}
        setSearch={setSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleReset={handleResetClick}
      />

      <Checkbox
        checked={active}
        onCheckedChange={toggleCheckActive}
        whiteSpace={"nowrap"}
        mt={3}
        mb={3}
      >
        미사용 포함 조회
      </Checkbox>

      {/*리스트*/}
      <BusinessListTable
        department={departmentList}
        sort={sort}
        handleSort={handleSort}
        openDialog={handleOpenDialog}
      />
      <Flex pt={5} justifyContent="flex-end">
        {/*페이지네이션*/}
        <Box width="88%" textAlign="right">
          <BusinessPageNation
            count={count}
            page={page}
            handlePageChange={handlePageChange}
          />
        </Box>

        {isAdmin && (
          <Button
            float={"right"}
            onClick={() => setIsAddOpen(true)}
            size={"lg"}
          >
            부서 등록
          </Button>
        )}
      </Flex>

      <DepartmentAdd
        saved={handleAddCheck}
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onCancel={() => setIsAddOpen(false)}
      />

      <DepartmentViewAndUpdateDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => setIsOpen(false)}
        department={department}
        setDepartmentData={setDepartment}
        setAddCheck={setAddCheck}
        addCheck={addCheck}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        isAdmin={isAdmin}
      />
    </Box>
  );
}
