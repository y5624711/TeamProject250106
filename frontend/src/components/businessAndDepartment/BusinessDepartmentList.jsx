import { Box, Center, HStack, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../ui/checkbox.jsx";
import { BusinessSearchAndFilter } from "./BusinessSearchAndFilter.jsx";
import { BusinessListTable } from "./BusinessListTable.jsx";
import { BusinessPageNation } from "./BusinessPageNation.jsx";
import { DepartmentViewAndUpdateDialog } from "./DepartmentViewAndUpdateDialog.jsx";
import { DepartmentAdd } from "./DepartmentAdd.jsx";

export function BusinessDepartmentList() {
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState({ column: "", order: "desc" });
  const [search, setSearch] = useState({ type: "number", keyword: "" });
  const [addCheck, setAddCheck] = useState(false);

  // 다이얼로그
  const [department, setDepartment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
        console.log(data.list);
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
      nextSearch.type = "number";
    }
    if (searchParams.get("sk")) {
      nextSearch.keyword = searchParams.get("sk");
    } else {
      nextSearch.keyword = "";
    }

    setSearch(nextSearch);
  }, [searchParams, sort]);

  const active = searchParams.get("active") === "true";

  const toggleCheckActive = () => {
    const nextValue = !active;
    // setActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
  };

  function handlePageChange(e) {
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("page", e.page);
    setSearchParams(nextSearchParam);
  }

  function handleSort(column) {
    console.log(column);
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
  }

  function handleOpenDialog(data) {
    console.log(data);
    setDepartment(data);
    setIsOpen(true);
  }

  const handleAddCheck = () => {
    setAddCheck(!addCheck);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Center>
        <Stack>
          <Checkbox
            variant={"subtle"}
            checked={active}
            onCheckedChange={toggleCheckActive}
          >
            삭제된 부서 포함하기
          </Checkbox>

          <HStack>
            {/*검색창&필터*/}
            <BusinessSearchAndFilter
              search={search}
              setSearch={setSearch}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
            <DepartmentAdd saved={handleAddCheck} />
          </HStack>
        </Stack>
      </Center>

      {/*리스트*/}
      <BusinessListTable
        department={departmentList}
        sort={sort}
        handleSort={handleSort}
        openDialog={handleOpenDialog}
      />

      {/*페이지네이션*/}
      <BusinessPageNation
        count={count}
        page={page}
        handlePageChange={handlePageChange}
      />

      <DepartmentViewAndUpdateDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        department={department}
        setDepartmentData={setDepartment}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        toggleEditing={() => setIsEditing(!isEditing)}
        setAddCheck={setAddCheck}
        addCheck={addCheck}
      />
    </Box>
  );
}
