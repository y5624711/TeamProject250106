import {
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import React from "react";

export function PurchaseList({ purchaseList = [] }) {
  return (
    <Table.Root interactive>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>#</TableColumnHeader>
          <TableColumnHeader>신청자 사번</TableColumnHeader>
          <TableColumnHeader>신청자</TableColumnHeader>
          <TableColumnHeader>협력 업체</TableColumnHeader>
          <TableColumnHeader>승인자 사번 </TableColumnHeader>
          <TableColumnHeader>승인자 </TableColumnHeader>
          <TableColumnHeader>품목명</TableColumnHeader>
          <TableColumnHeader>날짜</TableColumnHeader>
          <TableColumnHeader>상태 현황</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <Table.Body>
        {purchaseList && purchaseList.length > 0 ? (
          purchaseList.map((purchase, index) => (
            <Table.Row
              key={index}
              onClick={() => onPurchaseClick(purchase.purchaseRequestKey)} // 구매 요청 키 클릭 시
              style={{ cursor: "pointer" }}
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{purchase.businessEmployeeNo}</Table.Cell>
              <Table.Cell>{purchase.applicantName}</Table.Cell>
              <Table.Cell>{purchase.supplierName}</Table.Cell>
              <Table.Cell>{purchase.approverEmployeeNo}</Table.Cell>
              <Table.Cell>{purchase.approverName}</Table.Cell>
              <Table.Cell>{purchase.itemCommonCode}</Table.Cell>
              <Table.Cell>{purchase.purchaseRequestDate}</Table.Cell>
              <Table.Cell>
                {purchase.purchaseConsent ? "승인" : "대기"}
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
  );
}
