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
        <Table.Cell>{location.locationKey}</Table.Cell>
        <Table.Cell>{location.warehouseCode}</Table.Cell>
        <Table.Cell>{location.row}</Table.Cell>
        <Table.Cell>{location.col}</Table.Cell>
        <Table.Cell>{location.shelf}</Table.Cell>
        <Table.Cell>{location.itemCommonCode}</Table.Cell>
        <Table.Cell>{location.locationNote}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default WarehouseListPage;
