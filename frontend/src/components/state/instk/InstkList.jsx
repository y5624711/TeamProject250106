import { Box, Heading, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InstkConfirmModal } from "./InstkConfirmModal.jsx";
import { InstkDetaiViewModal } from "./InstkDetaiViewModal.jsx";
import axios from "axios";

export function InstkList() {
  const [instkList, setInstkList] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDetailViewModalOpen, setIsDetailViewModalOpen] = useState(false);
  useEffect(() => {
    axios.get("api/instk/list").then((res) => {
      setInstkList(res.data);
    });
  }, [isApproveModalOpen]);

  console.log(instkList, "instklist");

  const handleApproveModal = () => {
    setIsApproveModalOpen(!isApproveModalOpen);
  };
  const handleDetailViewModal = () => {
    setIsDetailViewModalOpen(!isDetailViewModalOpen);
  };
  // 상태 현황에 따라 다른 모달 띄울 함수
  const handleSelectModal = (checkState) => {
    checkState === true ? handleDetailViewModal() : handleApproveModal();
  };

  return (
    <Box>
      <Heading>구매/설치관리 >가입고 관리</Heading>
      <Box> 검색 화면 </Box>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>입고 구분</Table.ColumnHeader>
            <Table.ColumnHeader>발주 번호</Table.ColumnHeader>
            <Table.ColumnHeader>품목 명</Table.ColumnHeader>
            <Table.ColumnHeader>협력 업체</Table.ColumnHeader>
            <Table.ColumnHeader>날짜</Table.ColumnHeader>
            <Table.ColumnHeader>신청자</Table.ColumnHeader>
            <Table.ColumnHeader>승인자</Table.ColumnHeader>
            <Table.ColumnHeader>상태 현황</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {instkList.map((item) => {
            return (
              <Table.Row>
                <Table.Cell>{item.inputKey}</Table.Cell>
                <Table.Cell>{item.inputCommonCode}</Table.Cell>
                <Table.Cell>{item.inputNo}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell>{"날짜"}</Table.Cell>
                <Table.Cell>{"신청자"}</Table.Cell>
                <Table.Cell>{"승인자"}</Table.Cell>
                <Table.Cell>
                  {item.inputConsent === true ? "승인" : "대기"}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table.Root>

      <InstkConfirmModal isModalOpen={isApproveModalOpen} />
      <InstkDetaiViewModal />
    </Box>
  );
}
