import React from "react";
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
  Stack,
  Table,
} from "@chakra-ui/react";
import { MdOutlineNumbers } from "react-icons/md";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Button } from "../../ui/button.jsx";

function ReturnList({ returnList, onRowClick, setSearchParams }) {
  //검색 keyword
  const returnSearchKeywords = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점명", value: "franchiseName" },
      { label: "시리얼번호", value: "serialNo" },
      { label: "반품번호", value: "returnNo" },
      { label: "협력업체명", value: "customerName" },
      { label: "요청자명", value: "businessEmployeeName" },
      { label: "요청자사번", value: "businessEmployeeNo" },
      { label: "승인자명", value: "customerEmployeeName" },
      { label: "승인자사번", value: "customerEmployeeNo" },
      { label: "검수자명", value: "customerConfigurerName" },
      { label: "검수자사번", value: "customerConfigurerNo" },
    ],
  });

  // console.log("list", returnList);

  return (
    <Box>
      {/*검색창*/}
      {/*<SearchBar*/}
      {/*  itemSearchOptions={returnSearchKeywords}*/}
      {/*  onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}*/}
      {/*/>*/}
      <Center>
        <HStack alignItems={"flex-start"} w={"80%"} my={3}>
          <SelectRoot
            collection={returnSearchKeywords}
            postition={"relative"}
            width={"200px"}
          >
            <SelectTrigger>
              <SelectValueText placeholder={"선택"} />
            </SelectTrigger>
            <SelectContent>
              {returnSearchKeywords.items.map((e) => (
                <SelectItem item={e} key={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
          <Input placeholder="검색어를 입력해 주세요" type="text" />
          <Button>검색</Button>
        </HStack>
      </Center>

      <RadioGroup defaultValue="all" my={3}>
        <HStack gap="6">
          <Radio value="all">전체 조회</Radio>
          <Radio value="request">요청 상태 조회</Radio>
          <Radio value="approve">승인 상태 조회</Radio>
          <Radio value="disapprove">반려 상태 조회</Radio>
        </HStack>
      </RadioGroup>

      {/*리스트*/}
      <Table.Root interactive my={3}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader onClick={() => onHeader("customer_key")}>
              <HStack align={"flex-start"}>
                <Stack>
                  <MdOutlineNumbers />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>가맹점 명</Table.ColumnHeader>
            <Table.ColumnHeader>품명</Table.ColumnHeader>
            <Table.ColumnHeader>시리얼 번호</Table.ColumnHeader>
            <Table.ColumnHeader>반품 번호</Table.ColumnHeader>
            <Table.ColumnHeader>요청자 명</Table.ColumnHeader>
            <Table.ColumnHeader>협력 업체</Table.ColumnHeader>
            <Table.ColumnHeader>승인자 명</Table.ColumnHeader>
            <Table.ColumnHeader>검수자 명</Table.ColumnHeader>
            <Table.ColumnHeader>날짜</Table.ColumnHeader>
            <Table.ColumnHeader>상태</Table.ColumnHeader>
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
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{data.franchiseName}</Table.Cell>
              <Table.Cell>{data.itemCommonName}</Table.Cell>
              <Table.Cell>{data.serialNo}</Table.Cell>
              <Table.Cell>{data.returnNo}</Table.Cell>
              <Table.Cell>{data.businessEmployeeName}</Table.Cell>
              <Table.Cell>{data.customerName}</Table.Cell>
              <Table.Cell>{data.customerEmployeeName}</Table.Cell>
              <Table.Cell>{data.customerConfigurerName}</Table.Cell>
              <Table.Cell>
                {data.returnApproveDate || data.returnRequestDate}
              </Table.Cell>
              <Table.Cell>
                {data.returnConsent == 1
                  ? "승인"
                  : data.returnConsent == 0
                    ? "기각"
                    : "대기"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/*페이지*/}
      <Pagination my={3} />
    </Box>
  );
}

export default ReturnList;
