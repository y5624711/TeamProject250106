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
        style={{
          cursor: "pointer",
        }}
        key={location.locationKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedLocationKey(location.locationKey);
        }}
        _hover={{ backgroundColor: "gray.200" }}
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
