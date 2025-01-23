import {
  Box,
  Center,
  createListCollection,
  Heading,
  Table,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InstkConfirmModal } from "./InstkConfirmModal.jsx";
import { InstkDetaiViewModal } from "./InstkDetaiViewModal.jsx";
import axios from "axios";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";

export function InstkList() {
  const [instkList, setInstkList] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDetailViewModalOpen, setIsDetailViewModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useEffect(() => {
    axios.get("api/instk/list").then((res) => {
      setInstkList(res.data);
    });
  }, []);

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

  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "입고 구분", value: "itemCommonName" },
      { label: "발주 번호", value: "customerName" },
      { label: "품목 명", value: "size" },
      { label: "협력 업체", value: "unit" },
      { label: "날짜", value: "inputPrice" },
      { label: "신청자", value: "outputPrice" },
      { label: "승인자", value: "outputPrice" },
      { label: "상태현황", value: "outputPrice" },
    ],
  });

  return (
    <Box p={5}>
      <Heading>구매/설치관리 >입고 관리</Heading>
      <Box m={3}>
        <SearchBar onSearchChange={"sibal"} searchOptions={searchOptions} />
      </Box>
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
          {instkList.map((item, index) => {
            return (
              <Table.Row
                key={index}
                onClick={() => {
                  handleSelectModal(item.inputConsent);
                  setSelectedIndex(index);
                }}
              >
                <Table.Cell>{item.index}</Table.Cell>
                <Table.Cell>{item.inputCommonCode}</Table.Cell>
                <Table.Cell>{item.inputNo}</Table.Cell>
                <Table.Cell>{item.itemCommonName}</Table.Cell>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell>{item.requestDate}</Table.Cell>
                <Table.Cell>{item.requestEmployeeName}</Table.Cell>
                <Table.Cell>{}</Table.Cell>
                <Table.Cell>
                  {item.inputConsent === true ? "승인" : "대기"}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table.Root>
      <Center m={3}>
        <Pagination
          count={30}
          pageSize={10}
          onPageChange={(newPage) => {
            const nextSearchParam = new URLSearchParams(searchParams);
            nextSearchParam.set("page", newPage);
            setSearchParams(nextSearchParam);
          }}
        />
      </Center>

      {isApproveModalOpen && (
        <InstkConfirmModal
          isModalOpen={isApproveModalOpen}
          setChangeModal={handleApproveModal}
          instk={instkList[selectedIndex]}
        />
      )}
      {isDetailViewModalOpen && (
        <InstkDetaiViewModal
          isModalOpen={isDetailViewModalOpen}
          setChangeModal={handleDetailViewModal}
          instk={instkList[selectedIndex]}
        />
      )}
    </Box>
  );
}
