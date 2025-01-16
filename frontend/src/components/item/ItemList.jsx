import React from "react";
import { Box, Center, Table } from "@chakra-ui/react";
import { Pagination } from "../tool/Pagination.jsx";
import { ActiveSwitch } from "../tool/ActiveSwitch.jsx";
import { SearchBar } from "../tool/SearchBar.jsx";

export function ItemList({
  itemList,
  count,
  searchParams,
  setSearchParams,
  setItemKey,
}) {
  // 사용 여부에 따른 active 변경
  const handleActiveChange = (active) => {
    // 연속해서 처리 시 param 처리가 늦어지는 오류 -> 이전 값을 기준으로 param 설정
    setSearchParams((prevParams) => {
      const nextSearchParams = new URLSearchParams(prevParams);
      nextSearchParams.set("active", active ? "1" : "0");
      nextSearchParams.set("page", "1");
      return nextSearchParams;
    });
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
      <SearchBar
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <ActiveSwitch
        // defaultActive={searchParams?.get("active") === "1"}
        onActiveChange={handleActiveChange}
      />
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
          <Pagination
            count={count}
            pageSize={10}
            onPageChange={(newPage) => {
              const nextSearchParam = new URLSearchParams(searchParams);
              nextSearchParam.set("page", newPage);
              setSearchParams(nextSearchParam);
            }}
          />
        </Center>
      </Box>
    </Box>
  );
}
