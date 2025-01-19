import { Box, Table } from "@chakra-ui/react";
import React from "react";
import { Checkbox } from "../ui/checkbox.jsx";
import { SortableColumnHeader } from "../tool/SortableColumnHeader.jsx";

export function BusinessListTable({
  department,
  sort,
  handleSort,
  openDialog,
}) {
  // 컬럼 배열 정의
  const columnsList = [
    { key: "department_code", label: "부서번호" },
    { key: "department_name", label: "부서명" },
    { key: "department_active", label: "사용여부" },
    { key: "department_tel", label: "전화번호" },
    { key: "department_fax", label: "팩스번호" },
  ];

  return (
    <Box>
      <Table.Root variant={"outline"} interactive>
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
          {department.map((list, index) => (
            <Table.Row
              key={list.departmentKey || index}
              _hover={{ cursor: "pointer" }}
              onClick={() => openDialog(list)}
            >
              <Table.Cell>{list.departmentCode}</Table.Cell>
              <Table.Cell>{list.departmentName}</Table.Cell>
              <Table.Cell>
                <Checkbox checked={list.departmentActive} />
              </Table.Cell>
              <Table.Cell>{list.departmentTel}</Table.Cell>
              <Table.Cell>{list.departmentFax}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
