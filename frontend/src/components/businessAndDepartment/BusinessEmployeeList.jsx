import { Box, Center, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../ui/checkbox.jsx";
import { BusinessSearchAndFilter } from "./BusinessSearchAndFilter.jsx";
import { BusinessListTable } from "./BusinessListTable.jsx";
import { BusinessPageNation } from "./BusinessPageNation.jsx";

export function BusinessEmployeeList() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState({ column: "", order: "desc" });
  const [search, setSearch] = useState({ type: "number", keyword: "" });

  //페이지 번호얻기
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/business/list", {
        params: {
          ...Object.fromEntries(searchParams),
          sortColum: sort.column,
          sortOrder: sort.order,
        },
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setEmployee(data.list);
        setCount(data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [searchParams, sort]);

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

  const toggleCheckActive = () => {
    const nextValue = !active;
    // setActive(nextValue);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("active", nextValue.toString());
    setSearchParams(nextSearchParams);
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
            근무여부
          </Checkbox>

          {/*검색창&필터*/}
          <BusinessSearchAndFilter
            search={search}
            setSearch={setSearch}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </Stack>
      </Center>

      {/*리스트*/}
      <BusinessListTable
        employee={employee}
        sort={sort}
        handleSort={handleSort}
      />

      {/*페이지네이션*/}
      <BusinessPageNation
        count={count}
        page={page}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
}

export default BusinessEmployeeList;
