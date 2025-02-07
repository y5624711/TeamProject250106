import React from "react";
import { Table } from "@chakra-ui/react";

function InoutHistoryListPage({
  inoutHistory,
  setSelectedInoutHistory,
  setIsDetailDialogOpen,
  index,
}) {
  return (
    <>
      <Table.Row
        style={{
          cursor: "pointer",
        }}
        key={inoutHistory.inoutHistoryKey}
        onDoubleClick={() => {
          setSelectedInoutHistory(inoutHistory.inoutHistoryKey);
          setIsDetailDialogOpen(true);
        }}
        _hover={{ backgroundColor: "gray.200" }}
      >
        {/* TODO: inoutHistoryKey 대신 index 주기 */}
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
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.inoutCommonCode === "OUT"
            ? "일반 출고"
            : inoutHistory.inoutCommonCode === "RETRN"
              ? "회수 입고"
              : inoutHistory.inoutCommonCode === "INSTK"
                ? "일반 입고"
                : inoutHistory.inoutCommonCode === "LOS"
                  ? "실사 분실"
                  : "실사 입고"}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.itemName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.serialNo}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.customerName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.warehouseName}
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          {inoutHistory.franchiseName ? inoutHistory.franchiseName : "-"}
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
