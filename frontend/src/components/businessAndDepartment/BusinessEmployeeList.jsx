import {
  Box,
  Center,
  createListCollection,
  Flex,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Table,
} from "@chakra-ui/react";
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
import { Checkbox } from "../ui/checkbox.jsx";

export function BusinessEmployeeList() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState({ column: "", order: "desc" });
  const [search, setSearch] = useState({ type: "number", keyword: "" });

  /*검색타입*/
  const optionList = createListCollection({
    items: [
      { label: "사원번호", value: "number" },
      { label: "이름", value: "name" },
    ],
  });

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
      <Checkbox checked={active} onCheckedChange={toggleCheckActive}>
        근무여부
      </Checkbox>
      <Flex>
        {/*셀렉트 &&검색창*/}
        <SelectRoot
          collection={optionList}
          value={[search.type]}
          onValueChange={(sel) => {
            setSearch({ ...search, type: sel.value[0] });
          }}
          size="sm"
          width="150px"
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {optionList.items.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {/*검색창*/}
        <Input
          value={search.keyword}
          onChange={(e) =>
            setSearch({ ...search, keyword: e.target.value.trim() })
          }
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </Flex>

      {/*리스트*/}
      <Table.Root>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader onClick={() => handleSort("employee_key")}>
              ID
              {sort.column === "employee_key" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("employee_no")}>
              사원번호
              {sort.column === "employee_no" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("employee_name")}>
              이름
              {sort.column === "employee_name" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
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

      {/*페이지네이션*/}
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
