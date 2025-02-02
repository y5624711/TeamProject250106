import React from "react";
import { Table } from "@chakra-ui/react";

function StocktakingListPage({
  stocktaking,
  setIsDetailDialogOpen,
  setSelectedStocktaking,
  index,
}) {
  return (
    <>
      <Table.Row
        style={{
          cursor: "pointer",
        }}
        key={stocktaking.stocktakingKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedStocktaking(stocktaking.stocktakingKey);
        }}
        _hover={{ backgroundColor: "gray.200" }}
      >
        <Table.Cell textAlign="center" verticalAlign="middle">
          {index + 1}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.customerName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.itemName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.countCurrent}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.countConfiguration}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.countDifference}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingType === false ? "비정기" : "정기"}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.customerEmployeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingDate?.slice(0, 10) || ""}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default StocktakingListPage;
