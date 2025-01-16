import React from "react";
import { Box, Center, Table } from "@chakra-ui/react";
import { Pagination } from "../tool/Pagination.jsx";
import { ActiveSwitch } from "../tool/ActiveSwitch.jsx";
import { SearchBar } from "../tool/SearchBar.jsx";
import { Sort } from "../tool/Sort.jsx";

export function ItemList({
  itemList,
  count,
  searchParams,
  setSearchParams,
  setItemKey,
}) {
  // 정렬 헤더
  const sortOptions = [
    { key: "itemKey", label: "#" },
    { key: "itemCommonName", label: "품목명" },
    { key: "customerName", label: "담당업체" },
    { key: "inputPrice", label: "입고가" },
    { key: "outputPrice", label: "출고가" },
  ];

  return (
    <Box>
      <SearchBar
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <ActiveSwitch
        onActiveChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
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
