import React from "react";
import { Box, Center, createListCollection, Table } from "@chakra-ui/react";
import { ActiveSwitch } from "../tool/ActiveSwitch.jsx";
import { Sort } from "../tool/Sort.jsx";
import { Pagination } from "../tool/Pagination.jsx";
import { SearchBar } from "../tool/SearchBar.jsx";
import { Checkbox } from "../ui/checkbox.jsx";

export function ItemCommonCodeList({
  itemCommonCodeList,
  count,
  searchParams,
  setSearchParams,
  onRowClick,
}) {
  // 검색 옵션
  const itemSearchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "품목코드", value: "itemCommonCode" },
      { label: "품목명", value: "itemCommonName" },
    ],
  });

  // 정렬 헤더
  const sortOptions = [
    { key: "itemCommonCodeKey", label: "#" },
    { key: "itemCommonCode", label: "품목코드" },
    { key: "itemCommonName", label: "품목명" },
  ];

  // active가 true인 경우 사용 여부 컬럼 추가
  const active = searchParams.get("active") === "true";
  const dynamicSortOptions = active
    ? [...sortOptions, { key: "isActive", label: "사용 여부" }]
    : sortOptions;

  return (
    <Box px={10}>
      <SearchBar
        itemSearchOptions={itemSearchOptions}
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
                sortOptions={dynamicSortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemCommonCodeList?.map((item, index) => (
              <Table.Row
                key={item.itemCommonCodeKey}
                onClick={() => onRowClick(item.itemCommonCodeKey)}
                style={{ cursor: "pointer" }}
                _hover={{ backgroundColor: "gray.100" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {item.itemCommonCode}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.itemCommonName}
                </Table.Cell>
                {active && (
                  <Table.Cell textAlign="center">
                    <Checkbox checked={item.itemCommonCodeActive} />
                  </Table.Cell>
                )}
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
