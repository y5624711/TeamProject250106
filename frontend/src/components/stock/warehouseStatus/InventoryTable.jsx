import { Table } from "@chakra-ui/react";
import React from "react";
import { SortInventoryTableColumnHeader } from "./SortInventoryTableColumnHeader.jsx";

export function InventoryTable({
  inventoryList,
  searchParams,
  setSearchParams,
}) {
  // 컬럼 배열 정의
  const columnsList = [
    { key: "itemCurrentKey", label: "#" },
    { key: "wareHouseName", label: "창고명" },
    { key: "wareHouseCity", label: "광역시도" },
    { key: "wareHouseAddress", label: "시군" },
    { key: "wareHouseAddressDetail", label: "창고 위치" },
    { key: "customerName", label: "협력업체" },
    { key: "commonCodeName", label: "품명" },
    { key: "count", label: "수량" },
  ];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
          <SortInventoryTableColumnHeader
            columnsList={columnsList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSortChange={(nextSearchParams) =>
              setSearchParams(nextSearchParams)
            }
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {inventoryList.map((item, index) => (
          <Table.Row key={item.inoutHistoryNote || index}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>{item.wareHouseName}</Table.Cell>
            <Table.Cell>{item.wareHouseCity}</Table.Cell>
            <Table.Cell>{item.wareHouseAddress}</Table.Cell>
            <Table.Cell>{item.wareHouseAddressDetail}</Table.Cell>
            <Table.Cell>{item.customerName}</Table.Cell>
            <Table.Cell>{item.commonCodeName}</Table.Cell>
            <Table.Cell textAlign="end">{item.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
