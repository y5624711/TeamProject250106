import React from "react";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  IconButton,
  Input,
  Table,
} from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import { Button } from "../../ui/button.jsx";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { Pagination } from "../../tool/list/Pagination.jsx";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";

function CustomerList({
  customerList,
  standard,
  onHeader,
  count,
  handlePageChange,
  onRowClick,
  checkedActive,
  search,
  setSearch,
  handleSearchClick,
  toggleCheckedActive,
  onReset,
}) {
  const totalPages = Math.ceil(count / 10);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log("commonCodeList", customerList);
  // console.log(customerKey);
  // console.log(checkedActive);

  const optionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "업체명", value: "customerName" },
      { label: "사업자번호", value: "customerNo" },
      { label: "취급 물품", value: "itemName" },
      { label: "대표자", value: "customerRep" },
      { label: "전화번호", value: "customerTel" },
    ],
  });

  // console.log("c", customerList);
  // console.log(standard.order);

  return (
    <Box>
      {/* 검색창 */}
      <HStack justifyContent="center" w={"100%"} mt={-2}>
        <SelectRoot
          collection={optionList}
          width={"160px"}
          value={[search.type]}
          onValueChange={(oc) => {
            setSearch({ ...search, type: oc.value[0] });
          }}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {optionList.items.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <Input
          width="50%"
          placeholder="검색어를 입력해 주세요."
          type="text"
          value={search.keyword}
          onChange={(e) => {
            setSearch({ ...search, keyword: e.target.value });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <IconButton
          transform="translateX(-130%) "
          style={{ cursor: "pointer" }}
          variant={"ghost"}
          onClick={onReset}
        >
          <BsArrowCounterclockwise size="25px" />
        </IconButton>
        <Button onClick={handleSearchClick} transform="translateX(-75%)">
          검색
        </Button>
      </HStack>

      {/* 체크박스 필터 */}
      <Checkbox
        mt={3}
        mb={5}
        ml={3}
        checked={checkedActive}
        onChange={toggleCheckedActive}
      >
        미사용 포함 조회
      </Checkbox>

      {/*테이블*/}
      <Table.Root interactive style={{ cursor: "pointer" }}>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => onHeader("customer_key")}
            >
              <HStack alignItems="center" justify="center">
                #
                {standard.sort === "customer_key" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              onClick={() => onHeader("customer_name")}
            >
              <HStack alignItems="center" justify="center">
                업체명
                {standard.sort === "customer_name" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => onHeader("customer_no")}>
              <HStack alignItems="center" justify="center">
                사업자번호
                {standard.sort === "customer_no" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => onHeader("item_common_name")}>
              <HStack alignItems="center" justify="center">
                취급 품목
                {standard.sort === "item_common_name" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => onHeader("customer_rep")}>
              <HStack alignItems="center" justify="center">
                대표
                {standard.sort === "customer_rep" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader onClick={() => onHeader("customer_tel")}>
              <HStack alignItems="center" justify="center">
                전화번호
                {standard.sort === "customer_tel" &&
                  (standard.order === "ASC" ? <FaCaretUp /> : <FaCaretDown />)}
              </HStack>
            </Table.ColumnHeader>
            {/*<Table.ColumnHeader>*/}
            {/*  <HStack align={"flex-start"}>*/}
            {/*    <Stack>계약 여부</Stack>*/}
            {/*    <Stack>*/}
            {/*      <LuChevronsUpDown />*/}
            {/*    </Stack>*/}
            {/*  </HStack>*/}
            {/*</Table.ColumnHeader>*/}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customerList.map((customer, index) => (
            <Table.Row
              key={customer.customerKey}
              onDoubleClick={() => {
                onRowClick(customer.customerKey);
              }}
              _hover={{ cursor: "pointer" }}
              bg={customer.customerActive ? "white" : "gray.200"}
            >
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell textAlign="center">
                {customer.customerName}
              </Table.Cell>
              <Table.Cell textAlign="center">{customer.customerNo}</Table.Cell>
              <Table.Cell textAlign="center">{customer.itemName}</Table.Cell>
              <Table.Cell textAlign="center">{customer.customerRep}</Table.Cell>
              <Table.Cell textAlign="center">{customer.customerTel}</Table.Cell>
              {/*<Table.Cell>*/}
              {/*  {customer.customerActive ? "계약" : "계약 종료"}*/}
              {/*</Table.Cell>*/}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/*pagination*/}
      <Center my={3}>
        <Pagination
          size={"md"}
          count={count}
          pageSize={10}
          onPageChange={(newPage) => {
            handlePageChange(newPage);
          }}
        />
        {/*{pages.map((page) => (*/}
        {/*  <Button key={page} onClick={() => handlePageChange({ page })}>*/}
        {/*    {page}*/}
        {/*  </Button>*/}
        {/*))}*/}
      </Center>
    </Box>
  );
}

export default CustomerList;
