import React from "react";
import { Table } from "@chakra-ui/react";

function WarehouseListPage({
  location,
  setIsDetailDialogOpen,
  setSelectedLocationKey,
  index,
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
          {index + 1}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.warehouseName}
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
          {location.itemCommonName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.locationNote}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default WarehouseListPage;
