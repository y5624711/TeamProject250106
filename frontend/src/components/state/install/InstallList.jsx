import React from "react";
import { Box, Center, createListCollection, Table } from "@chakra-ui/react";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Sort } from "../../tool/list/Sort.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { StateRadioGroup } from "../../tool/list/StateRadioGroup.jsx";

export function InstallList({
  installList,
  onRowClick,
  count,
  searchParams,
  setSearchParams,
}) {
  // 정렬 헤더
  const sortInstallOptions = [
    { key: "installRequestKey", label: "#" },
    { key: "franchiseName", label: "가맹점" },
    { key: "itemCommonName", label: "품목" },
    { key: "customerName", label: "담당 업체" },
    { key: "outputNo", label: "출고 번호" },
    { key: "businessEmployeeName", label: "요청자" },
    { key: "customerEmployeeName", label: "반려/승인자" },
    { key: "customerInstallerName", label: "설치 기사" },
    { key: "warehouseName", label: "창고" },
    { key: "installDate", label: "날짜" },
  ];

  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "customerName" },
      { label: "출고 번호", value: "outputNo" },
      { label: "요청자", value: "businessEmployeeName" },
      { label: "반려/승인자", value: "customerEmployeeName" },
      { label: "설치 기사", value: "customerInstallerName" },
      { label: "창고", value: "warehouseName" },
    ],
  });

  const radioOptions = [
    { value: "all", label: "전체" },
    { value: "request", label: "대기" },
    { value: "approve", label: "승인" },
    { value: "configuration", label: "완료" },
    { value: "disapprove", label: "반려" },
  ];

  return (
    <Box>
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <StateRadioGroup
        radioOptions={radioOptions}
        onRadioChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortInstallOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
                defaultSortKey={"installDate"}
              />
              <Table.Cell textAlign="center">상태</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {installList?.map((install, index) => (
              <Table.Row
                onDoubleClick={() => onRowClick(install)}
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
                <Table.Cell textAlign="center">
                  {install.outputNo || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.businessEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.customerEmployeeName || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.customerInstallerName || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.warehouseName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {install.installDate}
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
