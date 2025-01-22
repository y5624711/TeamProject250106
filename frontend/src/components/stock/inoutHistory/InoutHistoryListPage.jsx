import React from "react";
import { Table } from "@chakra-ui/react";

function InoutHistoryListPage({
  inoutHistory,
  setSelectedInoutHistory,
  setIsDetailDialogOpen,
}) {
  return (
    <>
      <Table.Row
        style={{ height: "50px" }}
        key={inoutHistory.inoutHistoryKey}
        onDoubleClick={() => {
          setSelectedInoutHistory(inoutHistory.inoutHistoryKey);
          setIsDetailDialogOpen(true);
        }}
      >
        {/* TODO: inoutHistoryKey 대신 index 주기 */}
        <Table.Cell>{inoutHistory.inoutHistoryKey}</Table.Cell>
        <Table.Cell>{inoutHistory.inoutCommonCode}</Table.Cell>
        <Table.Cell>{inoutHistory.serialNo}</Table.Cell>
        <Table.Cell>{inoutHistory.itemName}</Table.Cell>
        <Table.Cell>{inoutHistory.warehouseName}</Table.Cell>
        <Table.Cell>{inoutHistory.franchiseName}</Table.Cell>
        <Table.Cell>{inoutHistory.businessEmployeeName}</Table.Cell>
        <Table.Cell>{inoutHistory.customerEmployeeName}</Table.Cell>
        <Table.Cell>{inoutHistory.inoutHistoryDate}</Table.Cell>
      </Table.Row>
    </>
  );
}

export default InoutHistoryListPage;
