import { Box, Center, HStack, Input, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button.jsx";

export function BusinessEmployeeList() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({
    type: "number",
    keyword: "",
  });

  //페이지 번호얻기
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/business/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
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
  }, [searchParams]);

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

  function handlePageChange(e) {
    console.log(e.page);
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("page", e.page);
    setSearchParams(nextSearchParam);
  }

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("st", search.type);
      nextSearchParam.set("sk", search.keyword);
      nextSearchParam.set("page", 1);

      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("st");
      nextSearchParam.delete("sk");

      setSearchParams(nextSearchParam);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>사원번호</Table.ColumnHeader>
            <Table.ColumnHeader>이름</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employee.map((list, index) => (
            <Table.Row key={list.employeeKey || index}>
              <Table.Cell>{list.employeeKey}</Table.Cell>
              <Table.Cell>{list.employeeNo}</Table.Cell>
              <Table.Cell>{list.employeeName}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <HStack>
        <Box>
          <select
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
          >
            <option value={"number"}>사원번호</option>
            <option value={"name"}>이름</option>
          </select>
        </Box>
        <Input
          value={search.keyword}
          onChange={(e) =>
            setSearch({ ...search, keyword: e.target.value.trim() })
          }
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </HStack>
      <Center>
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          page={page}
          variant="solid"
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Box>
  );
}

export default BusinessEmployeeList;
