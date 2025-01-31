import { Box, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function MainBuyList() {
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/main/purList")
      .then((res) => res.data)
      .then((data) => {
        setPurchaseList(data);
        console.log(data);
      });
  }, []);

  const columnHeaders = [
    { label: "#" },
    { label: "담당 업체" },
    { label: "품목" },
    { label: "승인자" },
    { label: "날짜" },
    { label: "상태" },
  ];

  return (
    <Box>
      <Heading mb={3}>구매 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            {columnHeaders.map((col, index) => (
              <Table.ColumnHeader key={index} textAlign="center">
                {col.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {purchaseList.length > 0 ? (
            purchaseList.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">{row.customerName}</Table.Cell>
                <Table.Cell textAlign="center">{row.itemCommonName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {row.customerEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {row.purchaseRequestDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {row.purchaseConsent === 1
                    ? "승인"
                    : row.purchaseConsent === 0
                      ? "반려"
                      : "대기"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} style={{ textAlign: "center" }}>
                요청내역이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
