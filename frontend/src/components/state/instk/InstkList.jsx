import {
  Box,
  Center,
  createListCollection,
  Heading,
  HStack,
  Table,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InstkConfirmModal } from "./InstkConfirmModal.jsx";
import { InstkDetaiViewModal } from "./InstkDetaiViewModal.jsx";
import axios from "axios";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { Radio, RadioGroup } from "../../ui/radio.jsx";

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
      { label: "품목", value: "size" },
      { label: "담당 업체", value: "unit" },
      { label: "날짜", value: "inputPrice" },
      { label: "신청자", value: "outputPrice" },
      { label: "승인자", value: "outputPrice" },
      { label: "상태현황", value: "outputPrice" },
    ],
  });

  return (
    <Box>
      <SearchBar onSearchChange={"sibal"} searchOptions={searchOptions} />
      <RadioGroup defaultValue="1" my={3}>
        <HStack gap={6}>
          <Radio value="1">전체</Radio>
          <Radio value="2">요청</Radio>
          <Radio value="3">승인</Radio>
          <Radio value="4">반려</Radio>
        </HStack>
      </RadioGroup>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Table.ColumnHeader textAlign="center">#</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                입고 구분
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                발주 번호
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">품목</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                협력 업체
              </Table.ColumnHeader>

              <Table.ColumnHeader textAlign="center">신청자</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">승인자</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">날짜</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">상태</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {instkList.map((item, index) => {
              return (
                <Table.Row
                  onClick={() => {
                    handleSelectModal(item.inputConsent);
                    setSelectedIndex(index);
                  }}
                  textAlign="center"
                  key={index}
                >
                  <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.inputCommonCodeName}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{item.inputNo}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.itemCommonName}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.customerName}
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

                  {/*TODO 반려 대기 처리 어떻게 변경해야하는데 ..*/}
                  <Table.Cell textAlign="center">
                    {item.inputConsent === true
                      ? "승인"
                      : item.inputConsent === false
                        ? "반려"
                        : "대기"}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer></Table.Footer>
        </Table.Root>
      </Box>
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
