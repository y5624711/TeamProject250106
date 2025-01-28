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
        style={{ height: "50px" }}
        key={stocktaking.stocktakingKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedStocktaking(stocktaking.stocktakingKey);
        }}
      >
        {/* TODO: stocktakingKey 대신 index 주기 */}

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
          {stocktaking.countConfiguration - stocktaking.countCurrent}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingType}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.customerEmployeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingDate.slice(0, 10)}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default StocktakingListPage;
