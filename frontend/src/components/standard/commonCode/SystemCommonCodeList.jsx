import { Box, Table } from "@chakra-ui/react";
import React from "react";
import { SortableColumnHeader } from "../../tool/SortableColumnHeader.jsx";

export function SystemCommonCodeList({
  commonCodeList,
  sort,
  setSort,
  openDialog,
}) {
  // 컬럼 배열 정의
  const columnsList = [
    { key: "common_code_key", label: "#" },
    { key: "common_code_name", label: "공통코드" },
    { key: "common_code", label: "공통코드명" },
  ];

  function handleSort(column) {
    console.log(column);
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
  }

  return (
    <Box>
      <Box>
        <Table.Root variant={"outline"}>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"}>
              {columnsList.map((col) => (
                <SortableColumnHeader
                  key={col.key}
                  columnKey={col.key}
                  label={col.label}
                  sort={sort}
                  handleSort={handleSort}
                />
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {commonCodeList.map((list, index) => (
              <Table.Row
                key={list.commonCodeKey || index}
                _hover={{ cursor: "pointer" }}
                onClick={() => openDialog(list)}
                bg={list.commonCodeActive ? "white" : "gray.200"}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{list.commonCode}</Table.Cell>
                <Table.Cell>{list.commonCodeName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
}
