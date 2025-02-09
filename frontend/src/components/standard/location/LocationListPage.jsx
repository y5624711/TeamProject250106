import React from "react";
import { Box, Table } from "@chakra-ui/react";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";

function WarehouseListPage({
  location,
  setIsDetailDialogOpen,
  setSelectedLocationKey,
  index,
}) {
  return (
    <>
      <Table.Row
        key={location.locationKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedLocationKey(location.locationKey);
        }}
        _hover={{ cursor: "pointer", backgroundColor: "gray.200" }}
        bg={location.locationActive ? "white" : "gray.200"}
      >
        <Table.Cell textAlign="center" verticalAlign="middle" width={"90px"}>
          {index + 1}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"15%"}>
          {location.customerName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"20%"}>
          {location.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"15%"}>
          {location.itemName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"10%"}>
          {location.row}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"10%"}>
          {location.col}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"10%"}>
          {location.shelf}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {location.located === true ? (
            <Box display="flex" justifyContent="center">
              <BsCheckSquareFill />
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <BsSquare />
            </Box>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default WarehouseListPage;
