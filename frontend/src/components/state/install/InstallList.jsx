import React from "react";
import { Box, Center, Table } from "@chakra-ui/react";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { ActiveSwitch } from "../../tool/list/ActiveSwitch.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";

export function InstallList({ installList, onRowClick }) {
  const sortInstallOptions = [
    { key: "installKey", label: "#" },
    { key: "customerName", label: "가맹점" },
    { key: "itemName", label: "품목명" },
    { key: "businessEmployeeNo", label: "신청자 사번" }, // 본사
    { key: "businessEmployeeName", label: "신청자명" },
    { key: "customerEmployeeNo", label: "승인자 사번" }, // 협력업체
    { key: "customerEmployeeName", label: "승인자명" },
    { key: "warehouseName", label: "창고" },
    { key: "installDate", label: "날짜" },
    { key: "currentState", label: "상태 현황" },
  ];

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
            {installList?.map((install, index) => (
              <Table.Row
                onClick={() => onRowClick(install.installRequestKey)}
                style={{
                  cursor: "pointer",
                }}
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {install.franchiseName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.businessEmployeeNo}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.businessEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center"></Table.Cell>
                <Table.Cell textAlign="center"></Table.Cell>
                <Table.Cell textAlign="center">
                  {install.warehouseName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.installRequestDate.split("T")[0]}
                </Table.Cell>
                <Table.Cell textAlign="center">{install.state}</Table.Cell>
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
