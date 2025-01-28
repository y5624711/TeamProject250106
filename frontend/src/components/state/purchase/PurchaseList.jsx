import {
  Box,
  Center,
  createListCollection,
  HStack,
  Table,
  TableHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { Sort } from "../../tool/list/Sort.jsx";

export function PurchaseList({
  purchaseList,
  onViewClick,
  count,
  searchParams,
  setSearchParams,
  state,
}) {
  // 정렬 헤더
  const sortInstallOptions = [
    { key: "purchaseRequestKey", label: "#" },
    { key: "customerName", label: "담당 업체" },
    { key: "itemCommonName", label: "품목" },
    { key: "employeeName", label: "신청자" },
    { key: "customerEmployeeName", label: "승인자" },
    { key: "date", label: "날짜" },
  ];

  // 검색 셀렉트
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "담당 업체", value: "customerName" },
      { label: "품목", value: "itemCommonName" },
      { label: "신청자", value: "employeeName" },
      { label: "신청자 사번", value: "employeeNo" },
      { label: "승인자", value: "customerEmployeeName" },
      { label: "승인자 사번", value: "customerEmployeeNo" },
    ],
  });

  // URL에서 "state" 파라미터 값을 가져와 초기값으로 설정
  const [radioValue, setRadioValue] = useState(
    searchParams.get("state") || "all",
  );

  // 상태 변경 (라디오 버튼 선택 시 URL 쿼리 파라미터 갱신)
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
      {/* 검색창 */}
      <SearchBar searchOptions={searchOptions} />

      {/* 검색 초기화 */}
      {/*<IconButton*/}
      {/*  transform="translateX(-130%) "*/}
      {/*  style={{ cursor: "pointer" }}*/}
      {/*  variant={"ghost"}*/}
      {/*  onClick={() => {*/}
      {/*    window.location.search = ""; // searchParams 초기화*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <BsArrowCounterclockwise size="25px" />*/}
      {/*</IconButton>*/}
      {/*<Button transform="translateX(-75%)">검색</Button>*/}

      {/* 라디오 버튼 */}
      <RadioGroup
        name={state}
        value={state}
        defaultValue={radioValue}
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
              sortOptions={sortInstallOptions}
              onSortChange={(nextSearchParam) =>
                setSearchParams(nextSearchParam)
              }
            />
            <Table.Cell textAlign="center">상태</Table.Cell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {purchaseList && purchaseList.length > 0 ? (
            purchaseList.map((purchase, index) => (
              <Table.Row
                key={index}
                onDoubleClick={() => onViewClick(purchase.purchaseRequestKey)}
                style={{ cursor: "pointer" }}
                _hover={{ backgroundColor: "gray.200" }}
                textAlign="center"
                verticalAlign="middle"
              >
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {index + 1}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {purchase.customerName}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {purchase.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {purchase.employeeName}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {purchase.customerEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {purchase.purchaseRequestDate}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
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
                데이터가 없습니다.
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
