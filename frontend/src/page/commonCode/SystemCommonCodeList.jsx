import { Box, createListCollection, Table } from "@chakra-ui/react";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import React from "react";
import { SearchBar } from "../../components/tool/SearchBar.jsx";
import { Sort } from "../../components/tool/Sort.jsx";

export function SystemCommonCodeList({
  commonCodeList,
  count,
  searchParams,
  setSearchParams,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "코드명", value: "commonCodeName" },
      { label: "공통코드", value: "commonCode" },
    ],
  });

  //정렬헤더
  const sortOption = [
    { key: "commonCodeKey", label: "#" },
    { key: "commonCode", label: "공통코드" },
    { key: "commonCodeName", label: "코드명" },
    { key: "commonCodeActive", label: "사용여부" },
  ];

  return (
    <Box>
      <SearchBar
        itemSearchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"}>
              <Sort
                sortOptions={sortOption}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {commonCodeList.map((list, index) => (
              <Table.Row key={list.commonCodeKey || index}>
                <Table.Cell>{list.commonCodeKey}</Table.Cell>
                <Table.Cell>{list.commonCode}</Table.Cell>
                <Table.Cell>{list.commonCodeName}</Table.Cell>
                <Table.Cell>
                  <Checkbox checked={list.commonCodeActive} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
