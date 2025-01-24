import {
  Box,
  Button,
  createListCollection,
  HStack,
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
import React from "react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";

export function PurchaseList({
  purchaseList,
  onViewClick,
  search,
  setSearch,
  handleSearchClick,
}) {
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

  return (
    <Box>
      <HStack justifyContent="center">
        <SelectRoot
          collection={PurchaseOptionList}
          width="160px"
          position="relative"
          value={[search.type]}
          onValueChange={(oc) => {
            setSearch({ ...search, type: oc.value[0] });
          }}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent
            style={{
              width: "150px",
              top: "40px",
              position: "absolute",
            }}
          >
            {PurchaseOptionList.items.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Input
          placeholder="검색어를 입력해 주세요."
          width="50%"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </HStack>

      <RadioGroup defaultValue="1" my={6} ml={12}>
        <HStack gap={6}>
          <Radio value="1">전체</Radio>
          <Radio value="2">대기</Radio>
          <Radio value="3">승인</Radio>
          <Radio value="4">반려</Radio>
        </HStack>
      </RadioGroup>

      <Table.Root interactive>
        <TableHeader>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              #
            </TableColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              담당 업체
            </TableColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              품목
            </TableColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              신청자
            </TableColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              승인자
            </TableColumnHeader>
            <TableColumnHeader textAlign="center" verticalAlign="middle">
              날짜
            </TableColumnHeader>
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
                onClick={() => onViewClick(purchase.purchaseRequestKey)}
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
    </Box>
  );
}
