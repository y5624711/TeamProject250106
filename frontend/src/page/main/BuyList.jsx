import { Box, Heading, Table } from "@chakra-ui/react";

export function BuyList() {
  return (
    <Box>
      <Heading>구매 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell textAlign="end">3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
