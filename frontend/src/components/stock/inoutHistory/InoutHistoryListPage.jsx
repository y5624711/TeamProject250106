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
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.inoutHistoryKey}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.inoutCommonCode}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.serialNo}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.itemName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.franchiseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.businessEmployeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.customerEmployeeName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.inoutHistoryDate.slice(0, 10)}
        </Table.Cell>
      </Table.Row>
    </>
  );
}

export default InoutHistoryListPage;
