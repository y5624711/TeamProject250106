import {
  Box,
  Button,
  Center,
  createListCollection,
  HStack,
  IconButton,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
  TableColumnHeader,
  TableHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";

export function PurchaseList({
  purchaseList,
  onViewClick,
  onStateChange,
  handlePageChange,
  page,
  count,
  state,
  sort,
  order,
}) {
  // URL 쿼리의 'keyword'와 'type'을 초기값으로 설정
  const [localKeyword, setLocalKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [localType, setLocalType] = useState(
    new URLSearchParams(window.location.search).get("type") || "all",
  );

  // 검색 셀렉트
  const PurchaseOptionList = createListCollection({
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

  //영어명으로 한국명 찾기
  const getLabelByValue = (value) => {
    const item = PurchaseOptionList.items.find((item) => item.value === value);
    return item ? item.label : value;
  };

  // 검색 버튼 클릭
  const handleSearchClick = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("type", localType);
    searchParams.set("keyword", localKeyword);
    searchParams.set("page", 1); // 검색 결과는 항상 첫 페이지로 이동
    searchParams.set("state", state);
    searchParams.set("sort", sort);
    searchParams.set("order", order);

    // URL을 갱신하고 새로고침
    window.location.search = searchParams.toString();
  };

  // 헤더 클릭 (정렬)
  const handleHeaderClick = (columnName) => {
    // 날짜 컬럼을 클릭하면 기본적으로 ASC로 정렬하도록 설정
    const nextOrder = sort === columnName && order === "ASC" ? "DESC" : "ASC";

    // URL을 업데이트하고 새로고침
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", columnName);
    searchParams.set("order", nextOrder);
    searchParams.set("page", 1); // 정렬 변경 시 페이지를 초기화
    window.location.search = searchParams.toString();
  };

  return (
    <Box>
      {/* 검색창 */}
      <HStack justifyContent="center">
        <SelectRoot
          collection={PurchaseOptionList}
          width="160px"
          position="relative"
          value={getLabelByValue(localType)}
          onValueChange={(e) => {
            setLocalType(e.value[0]);
          }}
        >
          <SelectTrigger>
            <SelectValueText placeholder={getLabelByValue(localType)} />
          </SelectTrigger>
          <SelectContent
            style={{
              width: "150px",
              top: "40px",
              position: "absolute",
            }}
          >
            {PurchaseOptionList.items.map((e) => (
              <SelectItem item={e} key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Input
          placeholder="검색어를 입력해 주세요."
          width="50%"
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />

        {/* 검색 초기화 */}
        <IconButton
          transform="translateX(-130%) "
          style={{ cursor: "pointer" }}
          variant={"ghost"}
          onClick={() => {
            window.location.search = ""; // searchParams 초기화
          }}
        >
          <BsArrowCounterclockwise size="25px" />
        </IconButton>
        <Button onClick={handleSearchClick} transform="translateX(-75%)">
          검색
        </Button>
      </HStack>

      {/* 라디오 */}
      <RadioGroup
        name={state}
        value={state}
        onValueChange={onStateChange}
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
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              #
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => handleHeaderClick("customer_name")}
            >
              담당 업체
              {sort === "customer_name" && (order === "ASC" ? " ▲" : " ▼")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => handleHeaderClick("sys.common_code_name")}
            >
              품목
              {sort === "sys.common_code_name" &&
                (order === "ASC" ? " ▲" : " ▼")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => handleHeaderClick("emp1.employee_name")}
            >
              신청자
              {sort === "emp1.employee_name" && (order === "ASC" ? " ▲" : " ▼")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => handleHeaderClick("emp2.employee_name")}
            >
              승인자
              {sort === "emp2.employee_name" && (order === "ASC" ? " ▲" : " ▼")}
            </TableColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => handleHeaderClick("date")}
            >
              날짜
              {sort === "date" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              상태
            </TableColumnHeader>
          </Table.Row>
        </TableHeader>

        <Table.Body>
          {purchaseList && purchaseList.length > 0 ? (
            purchaseList.map((purchase, index) => (
              <Table.Row
                key={index}
                onDoubleClick={() => onViewClick(purchase.purchaseRequestKey)}
                style={{ cursor: "pointer" }}
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
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          page={page}
          variant={"solid"}
          mt={5}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Center>
    </Box>
  );
}
