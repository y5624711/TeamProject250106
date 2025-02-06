import React, { useEffect, useState } from "react";
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
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

function ReturnList({
  returnList,
  count,
  onRowClick,
  handlePageChange,
  state,
  onStateChange,
  sort,
  order,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 검색 및 정렬 관련 상태 관리
  const [localKeyword, setLocalKeyword] = useState(
    searchParams.get("keyword") || "",
  );
  const [localType, setLocalType] = useState(searchParams.get("type") || "all");

  // URL의 page 값으로 초기화
  const [currentPage, setCurrentPage] = useState(
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1,
  );

  //검색 keyword
  const returnSearchKeywords = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "customerName" },
      { label: "시리얼 번호", value: "serialNo" },
      { label: "반품 번호", value: "returnNo" },
      { label: "요청자", value: "businessEmployeeName" },
      { label: "반려/승인자", value: "customerEmployeeName" },
      { label: "검수 기사", value: "customerConfigurerName" },
    ],
  });

  //검색 type 영어명으로 한국명 찾기
  const getLabelByValue = (value) => {
    const item = returnSearchKeywords.items.find(
      (item) => item.value === value,
    );
    return item ? item.label : value;
  };

  // 검색 실행
  const handleSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("type", localType);
    newParams.set("keyword", localKeyword);
    newParams.set("page", "1"); // 검색 시 첫 페이지로 초기화
    setSearchParams(newParams);
  };

  // 정렬 처리
  const handleSort = (columnName) => {
    const currentSort = searchParams.get("sort");
    const currentOrder = searchParams.get("order") || "ASC";
    const nextOrder =
      currentSort === columnName && currentOrder === "ASC" ? "DESC" : "ASC";

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", columnName);
    newParams.set("order", nextOrder);
    newParams.set("page", "1"); // 정렬 변경 시 페이지 초기화
    setSearchParams(newParams);
  };

  useEffect(() => {
    setLocalKeyword(searchParams.get("keyword") || "");
    setLocalType(searchParams.get("type") || "all");
  }, [searchParams]);

  // console.log(returnList);

  return (
    <Box>
      {/*검색*/}
      <HStack justifyContent="center" w={"100%"} mt={-2}>
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <IconButton
          transform="translateX(-130%) "
          style={{ cursor: "pointer" }}
          variant={"ghost"}
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          <BsArrowCounterclockwise size="25px" />
        </IconButton>
        <Button onClick={handleSearch} transform="translateX(-75%)">
          검색
        </Button>
      </HStack>

      {/* 상태 분류 */}
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

      {/*리스트*/}
      <Table.Root interactive my={3} style={{ cursor: "pointer" }}>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("rr.return_request_key")}
            >
              <HStack alignItems="center" justify="center">
                #
                {sort === "rr.return_request_key" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("franchise_name")}
            >
              <HStack alignItems="center" justify="center">
                가맹점
                {sort === "franchise_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("itc.common_code_name")}
            >
              <HStack alignItems="center" justify="center">
                품목
                {sort === "itc.common_code_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("customer_name")}
            >
              <HStack alignItems="center" justify="center">
                담당 업체
                {sort === "customer_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("serial_no")}
            >
              <HStack alignItems="center" justify="center">
                시리얼 번호
                {sort === "serial_no" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("return_no")}
            >
              <HStack alignItems="center" justify="center">
                반품 번호
                {sort === "return_no" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("emb.employee_name")}
            >
              <HStack alignItems="center" justify="center">
                요청자
                {sort === "emb.employee_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>

            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("emce.employee_name")}
            >
              <HStack alignItems="center" justify="center">
                반려/승인자
                {sort === "emce.employee_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("emcc.employee_name")}
            >
              <HStack alignItems="center" justify="center">
                검수 기사
                {sort === "emcc.employee_name" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => handleSort("date")}
            >
              <HStack alignItems="center" justify="center">
                날짜
                {sort === "date" &&
                  (order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
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
              <Table.Cell textAlign="center" width={"90px"}>
                {index + 1}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"9%"}>
                {data.franchiseName}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"9%"}>
                {data.itemCommonName}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"9%"}>
                {data.customerName}
              </Table.Cell>

              <Table.Cell textAlign="center" width={"11%"}>
                {data.serialNo}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"10%"}>
                {data.returnNo ? data.returnNo : "-"}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"9%"}>
                {data.businessEmployeeName}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"10%"}>
                {data.returnConsent == 1
                  ? data.customerEmployeeName
                  : data.returnConsent == 0
                    ? data.disapproveEmployeeName
                    : "-"}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"10%"}>
                {data.customerConfigurerName
                  ? data.customerConfigurerName
                  : "-"}
              </Table.Cell>
              <Table.Cell textAlign="center" width={"10%"}>
                {data.returnConsent == 1
                  ? data.returnApproveDate
                  : data.returnConsent == 0
                    ? data.disapproveDate
                    : data.returnRequestDate}
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
          onPageChange={(e) => {
            handlePageChange(e);
            setCurrentPage(e.page);
          }}
          count={count}
          pageSize={10}
          page={currentPage}
          variant="solid"
          size={"md"}
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
