import {
  Box,
  Button,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import React from "react";

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
      { label: "신청자 사번", value: "employeeNo" },
      { label: "신청자", value: "employeeName" },
      { label: "협력업체", value: "customerName" },
      { label: "품목명", value: "itemCommonName" },
      { label: "승인자 사번", value: "customerEmployeeNo" },
      { label: "승인자", value: "customerEmployeeName" },
    ],
  });

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <SelectRoot
            collection={PurchaseOptionList}
            value={[search.type]}
            onValueChange={(oc) => {
              setSearch({ ...search, type: oc.value[0] });
            }}
            width="150px"
          >
            <SelectTrigger>
              <SelectValueText />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "150px",
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
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            placeholder="검색어를 입력해 주세요."
            width="700px"
            marginLeft="10px"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          />
          <Button onClick={handleSearchClick} marginLeft="10px" width="80px">
            검색
          </Button>
        </Box>
      </Box>
      <Table.Root interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>#</TableColumnHeader>
            <TableColumnHeader>협력 업체</TableColumnHeader>
            <TableColumnHeader>품목명</TableColumnHeader>
            {/*<TableColumnHeader>신청자 사번</TableColumnHeader>*/}
            <TableColumnHeader>신청자</TableColumnHeader>
            {/*<TableColumnHeader>승인자 사번 </TableColumnHeader>*/}
            <TableColumnHeader>승인자 </TableColumnHeader>
            <TableColumnHeader>날짜</TableColumnHeader>
            <TableColumnHeader>상태 현황</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {purchaseList && purchaseList.length > 0 ? (
            purchaseList.map((purchase, index) => (
              <Table.Row
                key={index}
                onClick={() => onViewClick(purchase.purchaseRequestKey)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{purchase.customerName}</Table.Cell>
                <Table.Cell>{purchase.itemCommonName}</Table.Cell>
                {/*<Table.Cell>{purchase.employeeNo}</Table.Cell>*/}
                <Table.Cell>{purchase.employeeName}</Table.Cell>
                {/*<Table.Cell>{purchase.customerEmployeeNo}</Table.Cell>*/}
                <Table.Cell>{purchase.customerEmployeeName}</Table.Cell>
                <Table.Cell>{purchase.purchaseRequestDate}</Table.Cell>
                <Table.Cell>
                  {purchase.purchaseConsent ? "승인" : "요청"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="9">데이터가 없습니다.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
