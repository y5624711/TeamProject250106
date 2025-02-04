import { Box, Heading, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MainBuyList({ company, scope }) {
  const [purchaseList, setPurchaseList] = useState([]);
  const navigate = useNavigate("");

  useEffect(() => {
    axios
      .get("/api/main/purList", { params: { company, scope } })
      .then((res) => res.data)
      .then((data) => {
        setPurchaseList(data);
        console.log(data);
      });
  }, [company]);

  const columnHeaders = [
    { label: "#" },
    { label: "담당 업체" },
    { label: "품목" },
    { label: "요청자" },
    { label: "승인자" },
    { label: "날짜" },
    { label: "상태" },
  ];

  return (
    <Box whiteSpace={"nowrap"} style={{ minHeight: "200px" }}>
      <Heading mb={3}>구매 현황</Heading>
      <Table.Root size="sm" whitespace={"nowrap"}>
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
              <Table.Row
                key={index}
                onDoubleClick={() => navigate("/purchase")}
                title="더블 클릭시 해당 페이지로 이동합니다."
                _hover={{ cursor: "pointer", backgroundColor: "gray.200" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">{row.customerName}</Table.Cell>
                <Table.Cell textAlign="center">{row.itemCommonName}</Table.Cell>
                <Table.Cell textAlign="center">{row.employeeName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {row.customerEmployeeName || "-"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {row.purchaseRequestDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {row.purchaseConsent == 1
                    ? "승인"
                    : row.purchaseConsent == 0
                      ? "반려"
                      : "대기"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={7} style={{ textAlign: "center" }}>
                요청내역이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
