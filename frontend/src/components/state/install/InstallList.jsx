import React from "react";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  Table,
} from "@chakra-ui/react";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { Radio, RadioGroup } from "../../ui/radio.jsx";

export function InstallList({
  installList,
  onRowClick,
  count,
  searchParams,
  setSearchParams,
}) {
  const sortInstallOptions = [
    { key: "installKey", label: "#" },
    { key: "customerName", label: "가맹점" },
    { key: "itemName", label: "품목" },
    { key: "customerName", label: "담당 업체" },
    { key: "outputNo", label: "출고 번호" },
    { key: "businessEmployeeName", label: "신청자" },
    { key: "customerEmployeeName", label: "승인자" },
    { key: "customerInstallerName", label: "설치 기사" },
    { key: "warehouseName", label: "창고" },
    { key: "installDate", label: "날짜" },
    { key: "currentState", label: "상태" },
  ];

  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "itemCommonName" },
      { label: "출고 번호", value: "outputNo" },
      { label: "신청자", value: "businessEmployeeName" },
      { label: "승인자", value: "customerEmployeeName" },
      { label: "설치 기사", value: "customerInstallerName" },
      { label: "창고", value: "warehouseName" },
      { label: "날짜", value: "outputPrice" },
      { label: "상태", value: "state" },
    ],
  });

  return (
    <Box>
      <SearchBar searchOptions={searchOptions} />
      {/*<ActiveSwitch />*/}
      <RadioGroup defaultValue="1" my={3}>
        <HStack gap={6}>
          <Radio value="1">전체 조회</Radio>
          <Radio value="2">요청 상태 조회</Radio>
          <Radio value="3">승인 상태 조회</Radio>
          <Radio value="3">완료 상태 조회</Radio>
          <Radio value="3">반려 상태 조회</Radio>
        </HStack>
      </RadioGroup>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
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
                <Table.Cell textAlign="center">
                  {install.customerName}
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
                  {install.installRequestKey != null
                    ? install.installRequestDate
                    : install.installApproveDate}
                </Table.Cell>
                <Table.Cell textAlign="center">{install.state}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Center>
          <Pagination
            count={count}
            pageSize={10}
            onPageChange={(newPage) => {
              const nextSearchParam = new URLSearchParams(searchParams);
              nextSearchParam.set("page", newPage);
              setSearchParams(nextSearchParam);
            }}
          />
        </Center>
      </Box>
    </Box>
  );
}
