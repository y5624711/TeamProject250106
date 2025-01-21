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
    { key: "outputNo", label: "출고 번호" },
    { key: "businessEmployeeName", label: "신청자명" },
    { key: "customerEmployeeName", label: "승인자명" },
    { key: "customerInstallerName", label: "설치기사" },
    { key: "warehouseName", label: "창고" },
    { key: "installDate", label: "날짜" },
    { key: "currentState", label: "상태 현황" },
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
            {installList?.map((install, index) => (
              <Table.Row
                onClick={() => onRowClick(install)}
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
                <Table.Cell textAlign="center">{install.outputNo}</Table.Cell>
                <Table.Cell textAlign="center">
                  {install.businessEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.customerEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.customerInstallerName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.warehouseName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {
                    install.state === "요청"
                      ? install.installRequestDate?.split("T")[0] // 요청 상태일 때 요청 날짜 표시
                      : install.state === "승인"
                        ? install.installApproveDate?.split("T")[0] // 승인 상태일 때 승인 날짜 표시
                        : "N/A" // 그 외 상태일 때 표시할 값
                  }
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
