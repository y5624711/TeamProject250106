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
        key={stocktaking.inoutHistoryKey}
        onDoubleClick={() => {
          setIsDetailDialogOpen(true);
          setSelectedStorageRetrieval(storageRetrieval.inoutHistoryKey);
        }}
      >
        <Table.Cell>{storageRetrieval.inoutHistoryKey}</Table.Cell>
        <Table.Cell>{storageRetrieval}</Table.Cell>
        <Table.Cell>{location.row}</Table.Cell>
        <Table.Cell>{location.col}</Table.Cell>
        <Table.Cell>{location.shelf}</Table.Cell>
        <Table.Cell>{location.itemCommonCode}</Table.Cell>
        <Table.Cell>{location.locationNote}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default StocktakingListPage;
