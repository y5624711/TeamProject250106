import React from "react";
import {
  Box,
  createListCollection,
  Flex,
  HStack,
  Table,
} from "@chakra-ui/react";
import { ActiveSwitch } from "../../tool/list/ActiveSwitch.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Field } from "../../ui/field.jsx";
import { CommonCodeSelect } from "./CommonCodeSelect.jsx";

export function CommonCodeList({
  commonCodeList,
  count,
  searchParams,
  setSearchParams,
  onRowClick,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "코드", value: "commonCode" },
      { label: "코드명", value: "commonCodeName" },
    ],
  });

  // 정렬 헤더
  const sortOptions = [
    { key: "commonCodeKey", label: "#" },
    { key: "commonCodeType", label: "코드구분" },
    { key: "commonCode", label: "코드" },
    { key: "commonCodeName", label: "코드명" },
  ];

  return (
    <Box>
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <HStack alignItems="center" justifyContent="space-between" width="100%">
        <ActiveSwitch
          onActiveChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
        />
        <Box css={{ "--field-label-width": "70px" }}>
          <Field label={"코드 구분"} orientation="horizontal" gap={0}>
            <CommonCodeSelect
              onSelectChange={(nextSearchParam) =>
                setSearchParams(nextSearchParam)
              }
            />
          </Field>
        </Box>
      </HStack>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
                defaultSortKey={"commonCodeKey"}
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {commonCodeList?.map((code, index) => (
              <Table.Row
                key={code.commonCodeKey ? code.commonCodeKey : index}
                onDoubleClick={() => {
                  onRowClick(code.commonCodeKey);
                }}
                style={{
                  cursor: "pointer",
                }}
                bg={code.commonCodeActive ? "white" : "gray.100"}
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {code.commonCodeType}
                </Table.Cell>
                <Table.Cell textAlign="center">{code.commonCode}</Table.Cell>
                <Table.Cell textAlign="center">
                  {code.commonCodeName}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex justify="center">
          <HStack w={"100%"}>
            <Pagination
              count={count}
              pageSize={10}
              onPageChange={(newPage) => {
                const nextSearchParam = new URLSearchParams(searchParams);
                nextSearchParam.set("page", newPage);
                setSearchParams(nextSearchParam);
              }}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
