import React, { useState } from "react";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import { Button } from "../ui/button.jsx";
import { Switch } from "../ui/switch.jsx";

export function ItemList({
  itemList,
  count,
  searchParams,
  setSearchParams,
  setItemKey,
}) {
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [sort, setSort] = useState({ key: null, order: "asc" });

  // 페이지 번호
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  // 페이지 이동
  const handlePageChange = (e) => {
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("page", e.page);
    setSearchParams(nextSearchParam);
  };

  // 사용 여부
  const activeParam = searchParams.get("active")
    ? searchParams.get("active")
    : "1";
  const active = Number(activeParam);

  // 스위치 상태 변경 핸들러
  const handleSwitchChange = () => {
    const nextSearchParam = new URLSearchParams(searchParams);
    nextSearchParam.set("active", active === 1 ? "0" : "1");
    nextSearchParam.set("page", "1");
    setSearchParams(nextSearchParam);
  };

  // 검색
  const handleSearchClick = () => {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
      setSearchParams(nextSearchParam);
    }
  };

  // 정렬 헤더
  const headers = [
    { key: "itemKey", label: "#" },
    { key: "itemCommonName", label: "품목명" },
    { key: "customerName", label: "담당업체" },
    { key: "inputPrice", label: "입고가" },
    { key: "outputPrice", label: "출고가" },
  ];

  // 정렬
  const handleSort = (key) => {
    const currentOrder = searchParams.get("order") || "asc";
    const nextOrder =
      searchParams.get("sort") === key && currentOrder === "asc"
        ? "desc"
        : "asc";

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", key);
    nextSearchParams.set("order", nextOrder);
    nextSearchParams.set("page", "1"); // 정렬 시 첫 페이지로 이동
    setSearchParams(nextSearchParams);
  };

  return (
    <Box>
      <HStack>
        <HStack>
          <SelectRoot
            collection={itemSearchList}
            width="150px"
            position="relative"
          >
            <SelectTrigger>
              <SelectValueText placeholder="검색 항목" />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "150px",
                top: "40px",
                position: "absolute",
              }}
            >
              {itemSearchList.items.map((items) => (
                <SelectItem item={items} key={items.value}>
                  {items.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <Input
            placeholder="키워드를 입력해주세요"
            width="320px"
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          ></Input>
          <Button onClick={handleSearchClick}>검색</Button>
        </HStack>
      </HStack>
      <Switch checked={!active} onChange={handleSwitchChange}>
        전체 상품 조회
      </Switch>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              {headers.map((header) => (
                <Table.ColumnHeader
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  style={{ cursor: "pointer" }}
                >
                  {header.label}
                  {searchParams.get("sort") === header.key
                    ? searchParams.get("order") === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemList?.map((item, index) => (
              <Table.Row
                key={item.itemKey}
                onClick={() => setItemKey(item.itemKey)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell textAlign="center"> {index + 1}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell textAlign="end">{item.inputPrice}</Table.Cell>
                <Table.Cell textAlign="end">{item.outputPrice}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
    </Box>
  );
}

const itemSearchList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "품목명", value: "itemName" },
    { label: "담당 업체", value: "customerName" },
    { label: "입고가", value: "inputPrice" },
    { label: "출고가", value: "outputPrice" },
  ],
});
