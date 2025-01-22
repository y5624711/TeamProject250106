import React from "react";
import { Table } from "@chakra-ui/react";

function StocktakingListPage({
  stocktaking,
  setIsDetailDialogOpen,
  setSelectedStocktaking,
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
          {stocktaking.stocktakingKey}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.warehouseName}
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
          {stocktaking.customerEmployeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.employeeTel}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingDate}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default StocktakingListPage;
