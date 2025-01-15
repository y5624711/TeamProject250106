import { Box, Table } from "@chakra-ui/react";

export function EmployeeList({ data }) {
  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader>사원번호</Table.ColumnHeader>
            <Table.ColumnHeader>이름</Table.ColumnHeader>
            <Table.ColumnHeader>연락처</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((list, index) => (
            <Table.Row key={list.employee_key || index}>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
