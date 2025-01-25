import React, { useState } from "react";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  IconButton,
  Input,
  Table,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Button } from "../../ui/button.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";

function ReturnList({
  returnList,
  onRowClick,
  count,
  handlePageChange,
  state,
  onStateChange,
  sort,
  order,
}) {
  // 검색 keyword와 type 상태 관리
  const [localKeyword, setLocalKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [localType, setLocalType] = useState(
    new URLSearchParams(window.location.search).get("type") || "all",
  );

  //검색 keyword
  const returnSearchKeywords = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당업체", value: "customerName" },
      { label: "시리얼번호", value: "serialNo" },
      { label: "반품번호", value: "returnNo" },
      { label: "신청자", value: "businessEmployeeName" },
      // { label: "신청자사번", value: "businessEmployeeNo" },
      { label: "승인자", value: "customerEmployeeName" },
      // { label: "승인자사번", value: "customerEmployeeNo" },
      { label: "검수기사", value: "customerConfigurerName" },
      // { label: "검수기사 사번", value: "customerConfigurerNo" },
    ],
  });

  //영어명으로 한국명 찾기
  const getLabelByValue = (value) => {
    const item = returnSearchKeywords.items.find(
      (item) => item.value === value,
    );
    return item ? item.label : value;
  };

  // console.log("이름", getLabelByValue(localType));
  // console.log("list", returnList);
  // console.log("count", count);
  // console.log("local filters", filters);
  // console.log("state", filters.state);
  // console.log("page", page);

  //검색 버튼 클릭 시
  const handleSearchButton = () => {
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

  // 헤더 클릭 처리 : 정렬
  const handleHeaderClick = (columnName) => {
    const nextOrder = sort === columnName && order === "ASC" ? "DESC" : "ASC";

    // URL을 업데이트하고 새로고침
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", columnName);
    searchParams.set("order", nextOrder);
    searchParams.set("page", 1); // 정렬 변경 시 페이지를 초기화
    window.location.search = searchParams.toString();
  };

  // console.log(localType);
  // console.log("name", localTypeName);
  // console.log("type", localType);

  return (
    <Box>
      {/*검색*/}
      <HStack justifyContent="center" w={"100%"}>
        <SelectRoot
          collection={returnSearchKeywords}
          width={"160px"}
          value={getLabelByValue(localType)}
          onValueChange={(e) => {
            setLocalType(e.value[0]);
          }}
        >
          <SelectTrigger>
            <SelectValueText placeholder={getLabelByValue(localType)} />
          </SelectTrigger>
          <SelectContent>
            {returnSearchKeywords.items.map((e) => (
              <SelectItem item={e} key={e.value} value={e.value}>
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Input
          width="50%"
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          placeholder="검색어를 입력해 주세요."
        />
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
        <Button onClick={handleSearchButton} transform="translateX(-75%)">
          검색
        </Button>
      </HStack>

      {/* 상태 분류 */}
      <RadioGroup
        name={state}
        value={state}
        onValueChange={onStateChange}
        my={3}
      >
        <HStack gap={6}>
          <Radio value="all">전체 조회</Radio>
          <Radio value="request">대기 상태 조회</Radio>
          <Radio value="approve">승인 상태 조회</Radio>
          <Radio value="disapprove">반려 상태 조회</Radio>
        </HStack>
      </RadioGroup>

      {/*리스트*/}
      <Table.Root interactive my={3}>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <Table.ColumnHeader textAlign="center">#</Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("franchise_name")}
            >
              가맹점
              {sort === "franchise_name" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("itc.common_code_name")}
            >
              품목
              {sort === "itc.common_code_name" &&
                (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("customer_name")}
            >
              담당 업체
              {sort === "customer_name" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("serial_no")}
            >
              시리얼 번호
              {sort === "serial_no" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("return_no")}
            >
              반품 번호
              {sort === "return_no" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("business_employee_name")}
            >
              산청자
              {sort === "business_employee_name" &&
                (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>

            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("emce.employee_name")}
            >
              승인자
              {sort === "emce.employee_name" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("emcc.employee_name")}
            >
              검수기사
              {sort === "emcc.employee_name" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("date")}
            >
              날짜{sort === "date" && (order === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">상태</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {returnList.map((data, index) => (
            <Table.Row
              key={data.returnRequestKey}
              onDoubleClick={() => {
                onRowClick(data.returnRequestKey);
              }}
            >
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell textAlign="center">{data.franchiseName}</Table.Cell>
              <Table.Cell textAlign="center">{data.itemCommonName}</Table.Cell>
              <Table.Cell textAlign="center">{data.customerName}</Table.Cell>

              <Table.Cell textAlign="center">{data.serialNo}</Table.Cell>
              <Table.Cell textAlign="center">{data.returnNo}</Table.Cell>
              <Table.Cell textAlign="center">
                {data.businessEmployeeName}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {data.customerEmployeeName}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {data.customerConfigurerName}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {data.returnApproveDate || data.returnRequestDate}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {data.returnConsent == 1
                  ? "승인"
                  : data.returnConsent == 0
                    ? "반려"
                    : "대기"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/*페이지*/}
      <Center>
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pageSize={10}
          variant="solid"
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

export default ReturnList;
