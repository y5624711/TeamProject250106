import { Box, Table } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import React from "react";
import { SortableColumnHeader } from "../tool/SortableColumnHeader.jsx";

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
    { key: "common_code_active", label: "사용여부" },
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
        <Table.Root>
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
              >
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
