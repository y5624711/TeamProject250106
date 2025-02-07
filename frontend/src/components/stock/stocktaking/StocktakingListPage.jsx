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
        <Table.Cell
          textAlign="center"
          verticalAlign="middle"
          style={{
            width: "90px", // 더 좁게 설정 가능
            minWidth: "90px",
            maxWidth: "90px",
          }}
        >
          {index + 1}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"10%"}>
          {stocktaking.customerName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"20%"}>
          {stocktaking.itemName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"7.5%"}>
          {stocktaking.countCurrent}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"7.5%"}>
          {stocktaking.countConfiguration}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.countDifference}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"20%"}>
          {stocktaking.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {stocktaking.stocktakingType === false ? "비정기" : "정기"}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle" width={"10%"}>
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
