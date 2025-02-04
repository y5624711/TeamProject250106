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
    { key: "inOutHistoryDate", label: "#" },
    { key: "wareHouseName", label: "창고" },
    { key: "wareHouseCity", label: "광역시도" },
    { key: "wareHouseAddress", label: "시군" },
    { key: "wareHouseAddressDetail", label: "상세주소" },
    { key: "customerName", label: "협력업체" },
    { key: "commonCodeName", label: "품목" },
    { key: "count", label: "수량" },
  ];

  return (
    <Table.Root mt={6}>
      <Table.Header>
        <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
          <SortInventoryTableColumnHeader
            columnsList={columnsList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSortChange={(nextSearchParams) =>
              setSearchParams(nextSearchParams)
            }
            defaultSortKey={"inOutHistoryDate"}
          />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {inventoryList.map((item, index) => (
          <Table.Row
            key={item.inoutHistoryNote || index}
            _hover={{ backgroundColor: "gray.200" }}
          >
            <Table.Cell textAlign="center">{index + 1}</Table.Cell>
            <Table.Cell textAlign="center">{item.wareHouseName}</Table.Cell>
            <Table.Cell textAlign="center">{item.wareHouseCity}</Table.Cell>
            <Table.Cell textAlign="center">{item.wareHouseAddress}</Table.Cell>
            <Table.Cell textAlign="center">
              {item.wareHouseAddressDetail}
            </Table.Cell>
            <Table.Cell textAlign="center">{item.customerName}</Table.Cell>
            <Table.Cell textAlign="center">{item.commonCodeName}</Table.Cell>
            <Table.Cell textAlign="center">{item.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
