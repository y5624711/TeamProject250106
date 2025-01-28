import { Box, Heading, Table } from "@chakra-ui/react";

export function MainInstkList() {
  return (
    <Box>
      <Heading mb={3}>입고 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            <Table.ColumnHeader textAlign="center">Product2</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="center">1</Table.Cell>
            <Table.Cell textAlign="center">2</Table.Cell>
            <Table.Cell textAlign="center">2</Table.Cell>
            <Table.Cell textAlign="center">2</Table.Cell>
            <Table.Cell textAlign="center">2</Table.Cell>
            <Table.Cell textAlign="center"></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
