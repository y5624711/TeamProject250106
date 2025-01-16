import { Box, Table } from "@chakra-ui/react";

export function BusinessListTable({ employee, sort, handleSort }) {
  return (
    <Box>
      <Table.Root variant={"outline"}>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader onClick={() => handleSort("employee_key")}>
              ID
              {sort.column === "employee_key" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("employee_no")}>
              사원번호
              {sort.column === "employee_no" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("employee_name")}>
              이름
              {sort.column === "employee_name" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => handleSort("employee_note")}>
              비고
              {sort.column === "employee_note" &&
                (sort.order === "asc" ? "↑" : "↓")}
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employee.map((list, index) => (
            <Table.Row key={list.employeeKey || index}>
              <Table.Cell>{list.employeeKey}</Table.Cell>
              <Table.Cell>{list.employeeNo}</Table.Cell>
              <Table.Cell>{list.employeeName}</Table.Cell>
              <Table.Cell>{list.employeeNote}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
