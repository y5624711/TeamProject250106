import React from "react";
import { Box, Center, Table } from "@chakra-ui/react";
import { SearchBar } from "../tool/SearchBar.jsx";
import { ActiveSwitch } from "../tool/ActiveSwitch.jsx";
import { Sort } from "../tool/Sort.jsx";
import { Pagination } from "../tool/Pagination.jsx";

export function ItemCommonCodeList({ itemCommonCodeList }) {
  // 정렬 헤더
  const sortOptions = [
    { key: "itemCommonCodeKey", label: "#" },
    { key: "itemCommonCode", label: "품목코드" },
    { key: "itemCommonName", label: "품목명" },
  ];
  console.log(itemCommonCodeList);

  return (
    <Box>
      <SearchBar />
      <ActiveSwitch />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Sort sortOptions={sortOptions} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {itemCommonCodeList?.map((item, index) => (
              <Table.Row
                key={item.itemCommonCodeKey}
                onClick={() => setItemKey(item.itemCommonCodeKey)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell>{item.itemCommonCode}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Center>
          <Pagination />
        </Center>
      </Box>
    </Box>
  );
}
