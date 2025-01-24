import { Table } from "@chakra-ui/react";
import { SortableColumnHeader } from "../../tool/SortableColumnHeader.jsx";
import React from "react";

export function InventoryTable({ inventoryList, sort, setSort }) {
  // 컬럼 배열 정의
  const columnsList = [
    { key: "item_current_key", label: "#" },
    { key: "ware_house_name", label: "창고명" },
    { key: "ware_house_city", label: "광역시도" },
    { key: "ware_house_address", label: "시군" },
    { key: "ware_house_address_detail", label: "창고 위치" },
    { key: "customer_name", label: "협력업체" },
    { key: "common_code_name", label: "품명" },
    { key: "count", label: "수량" },
  ];

  function handleSort(column) {
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
          {columnsList.map((col) => (
            <SortableColumnHeader
              key={col.key}
              columnKey={col.key}
              label={col.label}
              sort={sort}
              handleSort={handleSort}
            />
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {inventoryList.map((item, index) => (
          <Table.Row key={item.itemCurrentKey || index}>
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
