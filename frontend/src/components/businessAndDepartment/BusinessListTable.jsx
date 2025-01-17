import { Box, HStack, Table } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import React from "react";

export function BusinessListTable({
  department,
  sort,
  handleSort,
  openDialog,
}) {
  return (
    <Box>
      <Table.Root variant={"outline"} interactive>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader onClick={() => handleSort("department_code")}>
              <HStack>
                부서번호
                {sort.column === "department_code" &&
                  (sort.order === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_name")}>
              <HStack>
                부서명
                {sort.column === "department_name" &&
                  (sort.order === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_tel")}>
              <HStack>
                전화번호
                {sort.column === "department_tel" &&
                  (sort.order === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_fax")}>
              <HStack>
                팩스번호
                {sort.column === "department_fax" &&
                  (sort.order === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
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
              <Table.Cell>{list.departmentTel}</Table.Cell>
              <Table.Cell>{list.departmentFax}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
