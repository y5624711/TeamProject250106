import React from "react";
import { Box, Center, Table } from "@chakra-ui/react";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { ActiveSwitch } from "../../tool/list/ActiveSwitch.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";

export function InstallList({ installList }) {
  const sortInstallOptions = [
    { key: "installKey", label: "#" },
    { key: "installCommonName", label: "품목명" },
    { key: "customerName", label: "담당업체" },
    { key: "size", label: "규격" },
    { key: "unit", label: "단위" },
    { key: "inputPrice", label: "입고가" },
    { key: "outputPrice", label: "출고가" },
  ];
  console.log(installList);

  return (
    <Box px={10}>
      <SearchBar />
      <ActiveSwitch />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Sort sortOptions={sortInstallOptions} />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/*{installList?.map((install, index) => (*/}
            <Table.Row
              // key={install.installKey}
              // onClick={() => onRowClick(install.installKey)}
              style={{
                cursor: "pointer",
              }}
              // bg={install.installActive ? "white" : "gray.100"}
              _hover={{ backgroundColor: "gray.200" }}
            >
              <Table.Cell textAlign="center">1</Table.Cell>
              <Table.Cell textAlign="center">
                {/*{install.installCommonName}*/}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {/*{install.customerName}*/}
              </Table.Cell>
              <Table.Cell textAlign="center">a</Table.Cell>
              <Table.Cell textAlign="center">b</Table.Cell>
              <Table.Cell textAlign="center">c</Table.Cell>
              <Table.Cell textAlign="center">
                {/*{install.outputPrice}*/}
              </Table.Cell>
            </Table.Row>
            {/*))}*/}
          </Table.Body>
        </Table.Root>
        <Center>
          <Pagination />
        </Center>
      </Box>
    </Box>
  );
}
