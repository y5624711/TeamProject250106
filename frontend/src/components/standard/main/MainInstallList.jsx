import { Box, Heading, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MainInstallList({ company }) {
  const [installList, setInstallList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/main/installList", { params: { company } })
      .then((res) => res.data)
      .then((data) => {
        const formattedList = data.map((item) => {
          // requestKey 상태에 따라 "대기", "승인", "반려" 구분
          let state = null;

          if (!item.installApproveKey) {
            if (!item.requestConsent) {
              state = "대기";
            } else if (item.requestConsent === true) {
              state = "승인";
            } else if (item.requestConsent === false) {
              state = "반려";
            }
          } else if (item.installApproveKey) {
            if (!item.approveConsent) {
              state = "승인";
            } else if (item.approveConsent === true) {
              state = "완료";
            } else if (item.approveConsent === false) {
              state = "반려";
            }
          }

          return { ...item, state };
        });

        console.log(data);
        setInstallList(formattedList || []);
      });
  }, []);

  const columnHeaders = [
    { label: "#" },
    { label: "가맹점" },
    { label: "품목" },
    { label: "협력업체" },
    { label: "신청자" },
    { label: "승인자" },
    { label: "날짜" },
    { label: "상태" },
  ];

  return (
    <Box>
      <Heading mb={3}>설치 현황</Heading>
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
          {installList.length > 0 ? (
            installList.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">{row.franchiseName}</Table.Cell>
                <Table.Cell textAlign="center">{row.itemCommonName}</Table.Cell>
                <Table.Cell textAlign="center">{row.customerName}</Table.Cell>
                <Table.Cell textAlign="center">
                  {row.businessEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {row.customerEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {!row.installApproveKey
                    ? row.installRequestDate
                    : row.installApproveDate}
                </Table.Cell>
                <Table.Cell textAlign="center">{row.state}</Table.Cell>
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
