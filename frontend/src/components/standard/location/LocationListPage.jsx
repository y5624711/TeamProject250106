import React from "react";
import { Table } from "@chakra-ui/react";

function WarehouseListPage({
  location,
  setIsDetailDialogOpen,
  setSelectedLocationKey,
}) {
  return (
    <>
      <Table.Row
        style={{ height: "50px" }}
        key={location.locationKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedLocationKey(location.locationKey);
        }}
      >
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.locationKey}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.warehouseCode}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.row}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.col}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.shelf}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.itemCommonCode}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.locationNote}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default WarehouseListPage;
