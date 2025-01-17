import { Box, Table } from "@chakra-ui/react";

export function BusinessListTable({ department, sort, handleSort }) {
  return (
    <Box>
      <Table.Root variant={"outline"}>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader onClick={() => handleSort("department_code")}>
              부서번호
              {sort.column === "department_code" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_name")}>
              부서명
              {sort.column === "department_name" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_tel")}>
              전화번호
              {sort.column === "department_tel" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("department_fax")}>
              팩스번호
              {sort.column === "department_fax" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {department.map((list, index) => (
            <Table.Row key={list.departmentKey || index}>
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
