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
    { key: "customerName", label: "협력 업체" },
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
        {inventoryList.length > 0 ? (
          inventoryList.map((item, index) => (
            <Table.Row
              key={item.inoutHistoryNote || index}
              _hover={{ backgroundColor: "gray.200" }}
            >
              <Table.Cell textAlign="center" w={"90px"}>
                {index + 1}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"15%"}>
                {item.wareHouseName}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"13%"}>
                {item.wareHouseCity}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"18%"}>
                {item.wareHouseAddress}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"13%"}>
                {item.wareHouseAddressDetail}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"20 %"}>
                {item.customerName}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"13%"}>
                {item.commonCodeName}
              </Table.Cell>
              <Table.Cell textAlign="center" w={"10%"}>
                {item.count}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell textAlign="center" colSpan="8">
              정보가 존재하지 않습니다.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
