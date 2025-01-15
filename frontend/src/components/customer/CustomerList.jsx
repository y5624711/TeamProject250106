import React from "react";
import { Table } from "@chakra-ui/react";

function CustomerList({ customerList, customerKey, setCustomerKey }) {
  // console.log("list", customerList);
  // console.log(customerKey);

  return (
    <div>
      <h2>협력사 조회</h2>
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>업체명</Table.ColumnHeader>
            <Table.ColumnHeader>취급 물품</Table.ColumnHeader>
            <Table.ColumnHeader>취급 대표자</Table.ColumnHeader>
            <Table.ColumnHeader>취급 계약여부</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {customerList.map((customer, index) => (
            <Table.Row
              key={index}
              onClick={() => setCustomerKey(customer.customerKey)}
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{customer.customerName}</Table.Cell>
              <Table.Cell>{customer.itemCode}</Table.Cell>
              <Table.Cell>{customer.customerRep}</Table.Cell>
              <Table.Cell>
                {customer.customerActive ? "계약" : "계약 종료"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default CustomerList;
