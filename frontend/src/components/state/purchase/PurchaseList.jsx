import {
  Box,
  Center,
  createListCollection,
  HStack,
  Table,
  TableHeader,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { SearchBar } from "../../tool/form/SearchBar.jsx";
import { Pagination } from "../../tool/form/Pagination.jsx";
import { Sort } from "../../tool/form/Sort.jsx";
import React, { useEffect, useState } from "react";

export function PurchaseList({
  purchaseList,
  onViewClick,
  count,
  searchParams,
  setSearchParams,
  state,
  standard,
}) {
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "customerName" },
      { label: "발주 번호", value: "purchaseNo" },
      { label: "요청자", value: "employeeName" },
      { label: "반려/승인자", value: "customerEmployeeName" },
    ],
  });

  const sortOptions = [
    { key: "purchaseRequestKey", label: "#" },
    { key: "itemCommonName", label: "품목" },
    { key: "customerName", label: "담당 업체" },
    { key: "purchaseNo", label: "발주 번호" },
    { key: "employeeName", label: "요청자" },
    { key: "customerEmployeeName", label: "반려/승인자" },
    { key: "purchaseDate", label: "날짜" },
  ];

  // URL에서 "state" 파라미터 값을 가져와 초기값으로 설정
  const [radioValue, setRadioValue] = useState(
    searchParams.get("state") || "all",
  );

  // 상태 변경 (라디오 버튼 선택 시 URL 쿼리 파라미터 갱신)
  const handleStateChange = (value) => {
    const nextSearchParam = new URLSearchParams(searchParams);

    nextSearchParam.set("state", value);
    nextSearchParam.set("page", "1"); // 1 페이지로 설정

    setSearchParams(nextSearchParam);
  };

  // 새로고침 시 검색 파라미터에서 state 값이 있으면 라디오 버튼 상태를 설정
  useEffect(() => {
    const stateFromParams = searchParams.get("state") || "all";
    setRadioValue(stateFromParams);
  }, [searchParams]);

  return (
    <Box>
      {/* 검색 */}
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      {/* 라디오 버튼 */}
      <RadioGroup
        name={state}
        value={radioValue}
        onValueChange={(value) => handleStateChange(value.value)}
        my={6}
        ml={2}
      >
        <HStack gap={6}>
          <Radio value="all">전체</Radio>
          <Radio value="request">대기</Radio>
          <Radio value="approve">승인</Radio>
          <Radio value="disapprove">반려</Radio>
        </HStack>
      </RadioGroup>

      {/* 테이블 */}
      <Table.Root interactive>
        <TableHeader>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <Sort
              sortOptions={sortOptions}
              onSortChange={(nextSearchParam) =>
                setSearchParams(nextSearchParam)
              }
              defaultSortKey={"purchaseDate"}
            />
            <Table.Cell textAlign="center">상태</Table.Cell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {purchaseList.length > 0 ? (
            purchaseList.map((purchase, index) => (
              <Table.Row
                key={index}
                onDoubleClick={() => onViewClick(purchase.purchaseRequestKey)}
                style={{ cursor: "pointer" }}
                _hover={{ backgroundColor: "gray.200" }}
                textAlign="center"
                verticalAlign="middle"
              >
                <Table.Cell textAlign="center" width="90px">
                  {index + 1}
                </Table.Cell>
                <Table.Cell textAlign="center" width="17%">
                  {purchase.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center" width="16%">
                  {purchase.customerName}
                </Table.Cell>
                <Table.Cell textAlign="center" width="15%">
                  {purchase.purchaseNo || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center" width="12%">
                  {purchase.employeeName}
                </Table.Cell>
                <Table.Cell textAlign="center" width="12%">
                  {purchase.customerEmployeeName ||
                    purchase.disapproveEmployeeName ||
                    "-"}
                </Table.Cell>
                <Table.Cell textAlign="center" width="14%">
                  {purchase.purchaseConsent == 1
                    ? purchase.purchaseApproveDate
                    : purchase.purchaseConsent == 0
                      ? purchase.disapproveDate
                      : purchase.purchaseRequestDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.purchaseConsent == 1
                    ? "승인"
                    : purchase.purchaseConsent == 0
                      ? "반려"
                      : "대기"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell textAlign="center" colSpan="9">
                정보가 존재하지 않습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      {/* 페이지네이션 */}
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
  );
}
