import React, { useState } from "react";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Button } from "../../ui/button.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";
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
  page,
  handlePageChange,
  state,
  onStateChange,
  sort,
  order,
  onHeader,
}) {
  // 검색 keyword와 type 상태 관리
  const [localKeyword, setLocalKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [localType, setLocalType] = useState(
    new URLSearchParams(window.location.search).get("type") || "all",
  );
  const [localSort, setLocalSort] = useState(sort);
  const [localOrder, setLocalOrder] = useState(order);

  //검색 keyword
  const returnSearchKeywords = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "품목", value: "itemCommonName" },
      { label: "시리얼번호", value: "serialNo" },
      { label: "반품번호", value: "returnNo" },
      { label: "협력업체", value: "customerName" },
      { label: "신청자", value: "businessEmployeeName" },
      { label: "신청자사번", value: "businessEmployeeNo" },
      { label: "승인자", value: "customerEmployeeName" },
      { label: "승인자사번", value: "customerEmployeeNo" },
      { label: "검수기사", value: "customerConfigurerName" },
      { label: "검수기사 사번", value: "customerConfigurerNo" },
    ],
  });

  // console.log("list", returnList);
  // console.log("count", count);
  // console.log("local filters", filters);
  // console.log("state", filters.state);

  //검색 버튼 클릭 시
  const handleSearchButton = (sort) => {
    const searchParams = new URLSearchParams();
    searchParams.set("type", localType);
    searchParams.set("keyword", localKeyword);
    searchParams.set("page", 1); // 검색 결과는 항상 첫 페이지로 이동
    searchParams.set("state", state);

    // URL을 갱신하고 새로고침
    window.location.search = searchParams.toString();
  };

  // 헤더 클릭 처리
  const handleHeaderClick = (columnName) => {
    const nextOrder =
      localSort === columnName && localOrder === "ASC" ? "DESC" : "ASC";

    // URL을 업데이트하고 새로고침
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", columnName);
    searchParams.set("order", nextOrder);
    searchParams.set("page", 1); // 정렬 변경 시 페이지를 초기화
    window.location.search = searchParams.toString();
  };

  // console.log(localType);
  // console.log("name", localType);

  return (
    <Box>
      {/*검색*/}
      <HStack justifyContent="center" w={"100%"}>
        <SelectRoot
          collection={returnSearchKeywords}
          postition={"relative"}
          width={"160px"}
          onValueChange={(value) => {
            console.log("value", value);
            setLocalType(value.value[0]);
            // setLocalTypeName(value.items[0].label);
          }}
        >
          <SelectTrigger>
            <SelectValueText placeholder={"선택"} />
          </SelectTrigger>
          <SelectContent
            style={{
              top: "242px",
              position: "absolute",
              zIndex: 100,
              width: "160px",
            }}
          >
            {returnSearchKeywords.items.map((e) => (
              <SelectItem item={e} key={e.value}>
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
        <Box transform="translateX(-170%) " style={{ cursor: "pointer" }}>
          <BsArrowCounterclockwise size="25px" />
        </Box>
        <Button onClick={handleSearchButton} transform="translateX(-55%) ">
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
              {localSort === "franchise_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("itc.common_code_name")}
            >
              품목
              {localSort === "itc.common_code_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("customer_name")}
            >
              담당 업체
              {localSort === "customer_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("serial_no")}
            >
              시리얼 번호
              {localSort === "serial_no" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("return_no")}
            >
              반품 번호
              {localSort === "return_no" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("business_employee_name")}
            >
              산청자
              {localSort === "business_employee_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>

            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("emce.employee_name")}
            >
              승인자
              {localSort === "emce.employee_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("emcc.employee_name")}
            >
              검수기사
              {localSort === "emcc.employee_name" &&
                (localOrder === "ASC" ? " ▲" : " ▼")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleHeaderClick("date")}
            >
              날짜{localSort === "date" && (localOrder === "ASC" ? " ▲" : " ▼")}
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
          page={page}
          variant={"solid"}
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
