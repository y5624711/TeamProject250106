import React from "react";
import {
  Box,
  Center,
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
import { Button } from "../../ui/button.jsx";
import { MdOutlineNumbers } from "react-icons/md";
import { Pagination } from "../../tool/list/Pagination.jsx";

function ReturnList({ returnList }) {
  return (
    <Box>
      {/*검색창*/}
      <Center>
        <HStack>
          <SelectRoot>
            <SelectTrigger>
              <SelectValueText />
            </SelectTrigger>
            <SelectContent>
              <SelectItem></SelectItem>
            </SelectContent>
          </SelectRoot>
          <Input placeholder="검색어를 입력해 주세요" type="text" />
          <Button>검색</Button>
        </HStack>
      </Center>

      {/*리스트*/}
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader onClick={() => onHeader("customer_key")}>
              <HStack align={"flex-start"}>
                <Stack>
                  <MdOutlineNumbers />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>가맹점명</Table.ColumnHeader>
            <Table.ColumnHeader>품명</Table.ColumnHeader>
            <Table.ColumnHeader>시리얼번호</Table.ColumnHeader>
            <Table.ColumnHeader>반환번호</Table.ColumnHeader>
            <Table.ColumnHeader>요청자(사번)</Table.ColumnHeader>
            <Table.ColumnHeader>요청자(명)</Table.ColumnHeader>
            <Table.ColumnHeader>협력업체</Table.ColumnHeader>
            <Table.ColumnHeader>승인자(사번)</Table.ColumnHeader>
            <Table.ColumnHeader>승인자(명)</Table.ColumnHeader>
            <Table.ColumnHeader>반품 날짜</Table.ColumnHeader>
            <Table.ColumnHeader>상태</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {returnList.map((each) => (
            <Table.Row>
              <Table.Cell>#</Table.Cell>
              <Table.Cell>{each.franchiseName}</Table.Cell>
              <Table.Cell>{each.itemCommonName}</Table.Cell>
              <Table.Cell>{each.serialNo}</Table.Cell>
              <Table.Cell>{each.returnNo}</Table.Cell>
              <Table.Cell>{each.businessEmployeeNo}</Table.Cell>
              <Table.Cell>{each.businessEmployeeNo}</Table.Cell>
              <Table.Cell>{each.customerName}</Table.Cell>
              <Table.Cell>{each.customerEmployeeNo}</Table.Cell>
              <Table.Cell>{each.customerEmployeeNo}</Table.Cell>
              <Table.Cell>{each.returnDate}</Table.Cell>
              <Table.Cell>
                {each.returnConsent == 1
                  ? "승인"
                  : each.returnConsent == 0
                    ? "기각"
                    : "대기"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/*페이지*/}
      <Pagination />
    </Box>
  );
}

export default ReturnList;
