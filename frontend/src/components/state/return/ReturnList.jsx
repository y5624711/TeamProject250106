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

function ReturnList({ returnList, onRowClick }) {
  // console.log(returnList);

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
      <Pagination />
    </Box>
  );
}

export default ReturnList;
