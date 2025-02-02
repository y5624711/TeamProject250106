import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../../ui/checkbox.jsx";
import { BusinessSearchAndFilter } from "./BusinessSearchAndFilter.jsx";
import { BusinessListTable } from "./BusinessListTable.jsx";
import { BusinessPageNation } from "./BusinessPageNation.jsx";
import { DepartmentViewAndUpdateDialog } from "./DepartmentViewAndUpdateDialog.jsx";
import { DepartmentAdd } from "./DepartmentAdd.jsx";
import { Button } from "../../ui/button.jsx";

export function BusinessDepartmentList() {
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
    setSearchParams("");
    setSort({ column: "", order: "desc" });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      {/*검색창&필터*/}
      <BusinessSearchAndFilter
        search={search}
        setSearch={setSearch}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleReset={handleResetClick}
      />

      <Checkbox
        variant={"subtle"}
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
      <Box pt={5}>
        <Button float={"right"} onClick={() => setIsAddOpen(true)}>
          부서 추가
        </Button>

        {/*페이지네이션*/}
        <BusinessPageNation
          count={count}
          page={page}
          handlePageChange={handlePageChange}
        />
      </Box>

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
      />
    </Box>
  );
}
