import React from "react";
import { Box, Center, createListCollection, Table } from "@chakra-ui/react";

import { Pagination } from "../../tool/list/Pagination.jsx";
import { ActiveSwitch } from "../../tool/list/ActiveSwitch.jsx";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Sort } from "../../tool/list/Sort.jsx";

export function ItemList({
  itemList,
  count,
  searchParams,
  setSearchParams,
  onRowClick,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "customerName" },
      { label: "규격", value: "size" },
      { label: "단위", value: "unit" },
      { label: "입고가", value: "inputPrice" },
      { label: "출고가", value: "outputPrice" },
    ],
  });

  // 정렬 헤더
  const sortOptions = [
    { key: "itemKey", label: "#" },
    { key: "itemCommonName", label: "품목" },
    { key: "customerName", label: "담당 업체" },
    { key: "size", label: "규격" },
    { key: "unit", label: "단위" },
    { key: "inputPrice", label: "입고가" },
    { key: "outputPrice", label: "출고가" },
  ];

  return (
    <Box>
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <ActiveSwitch
        onActiveChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
                defaultSortKey={"itemKey"}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemList?.map((item, index) => (
              <Table.Row
                key={item.itemKey}
                onDoubleClick={() => onRowClick(item.itemKey)}
                style={{
                  cursor: "pointer",
                }}
                bg={item.itemActive ? "white" : "gray.100"}
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Table.Cell textAlign="center" width={"90px"}>
                  {index + 1}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"170px"}>
                  {item.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"150px"}>
                  {item.customerName}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"100px"}>
                  {item.size || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"100px"}>
                  {item.unit || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"130px"}>
                  {item.inputPrice.toLocaleString("ko-KR")}
                </Table.Cell>
                <Table.Cell textAlign="center" width={"130px"}>
                  {item.outputPrice.toLocaleString("ko-KR")}
                </Table.Cell>
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
