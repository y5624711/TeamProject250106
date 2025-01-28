import React from "react";
import { Table } from "@chakra-ui/react";

function WarehouseListPage({
  warehouse,
  setIsDetailDialogOpen,
  setSelectedWarehouseKey,
  index,
}) {
  return (
    <>
      <Table.Row
        style={{ height: "50px" }}
        key={warehouse.warehouseKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedWarehouseKey(warehouse.warehouseKey);
        }}
      >
        <Table.Cell textAlign="center" verticalAlign="middle">
          {index + 1}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.customerName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.employeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.warehouseState}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.warehouseCity}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {warehouse.warehouseTel}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default WarehouseListPage;
