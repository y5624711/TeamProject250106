import { Box, Heading, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MainInstkList({ company }) {
  const [mainInstkList, setMainInstkList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/main/instkList", { params: { company } })
      .then((res) => res.data)
      .then((data) => {
        setMainInstkList(data);
      });
  }, []);

  const columnHeaders = [
    { label: "#" },
    { label: "입고 구분" },
    { label: "발주 번호" },
    { label: "담당 업체" },
    { label: "품목" },
    { label: "요청자" },
    { label: "승인자" },
    { label: "날짜" },
    { label: "상태" },
  ];

  return (
    <Box whiteSpace={"nowrap"} style={{ minHeight: "200px" }}>
      <Heading mb={3}>입고 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            {columnHeaders.map((col, index) => (
              <Table.ColumnHeader textAlign="center" key={index}>
                {col.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mainInstkList.length > 0 ? (
            mainInstkList.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {item.inputCommonCodeName}
                </Table.Cell>
                <Table.Cell textAlign="center">{item.inputNo}</Table.Cell>
                <Table.Cell textAlign="center">{item.customerName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {item.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.requestEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.inputStockEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.inputStockDate || item.requestDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.inputConsent === true
                    ? "승인"
                    : item.inputConsent === false
                      ? "반려"
                      : "대기"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell
                colSpan={9}
                style={{ textAlign: "center", height: "150px" }}
              >
                요청내역이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
