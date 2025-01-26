import React, { useEffect, useState } from "react";
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
  // 정렬 헤더
  const sortInstallOptions = [
    { key: "installRequestKey", label: "#" },
    { key: "franchiseName", label: "가맹점" },
    { key: "itemCommonName", label: "품목" },
    { key: "customerName", label: "담당 업체" },
    { key: "outputNo", label: "출고 번호" },
    { key: "businessEmployeeName", label: "신청자" },
    { key: "customerEmployeeName", label: "승인자" },
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
      { label: "신청자", value: "businessEmployeeName" },
      { label: "승인자", value: "customerEmployeeName" },
      { label: "설치 기사", value: "customerInstallerName" },
      { label: "창고", value: "warehouseName" },
    ],
  });

  const [radioValue, setRadioValue] = useState(
    searchParams.get("state") || "all",
  );

  const handleStateChange = (value) => {
    const nextSearchParam = new URLSearchParams(searchParams);

    nextSearchParam.set("page", "1");
    nextSearchParam.set("state", value);
    setSearchParams(nextSearchParam);
  };

  // 새로고침 시 검색 파라미터에서 state 값이 있으면 라디오 버튼 상태를 설정
  useEffect(() => {
    const stateFromParams = searchParams.get("state") || "all";
    setRadioValue(stateFromParams);
  }, [searchParams]);

  return (
    <Box>
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      <RadioGroup
        defaultValue={radioValue}
        my={3}
        onValueChange={(value) => handleStateChange(value.value)}
      >
        <HStack gap={6}>
          <Radio value="all">전체 조회</Radio>
          <Radio value="request">대기 상태 조회</Radio>
          <Radio value="approve">승인 상태 조회</Radio>
          <Radio value="configuration">완료 상태 조회</Radio>
          <Radio value="disapprove">반려 상태 조회</Radio>
        </HStack>
      </RadioGroup>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortInstallOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
              <Table.Cell textAlign="center">상태</Table.Cell>
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
                  {!install.installApproveKey
                    ? install.installRequestDate
                    : install.inoutHistoryDate || install.installApproveDate}
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
