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
import { useSearchParams } from "react-router-dom";
import { Sort } from "../../tool/list/Sort.jsx";

export function InstkList() {
  const [instkList, setInstkList] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDetailViewModalOpen, setIsDetailViewModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);

  //페이지 네이션 + 저거 옵션다는거 부터 하자
  useEffect(() => {
    axios
      .get("api/instk/list", {
        params: {
          state: searchParams.get("state"),
          page: searchParams.get("page"),
          keyword: searchParams.get("keyword"),
          sort: searchParams.get("sort"),
          order: searchParams.get("order"),
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setInstkList(res.data.list);
      });
  }, [searchParams]);

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
      { label: "입고 구분", value: "inputCommonCode" },
      { label: "발주 번호", value: "inputNo" },
      { label: "품목", value: "itemCommonName" },
      { label: "담당 업체", value: "customerName" },
      { label: "날짜", value: "inputStockDate" },
      { label: "신청자", value: "requestEmployeeName" },
      { label: "승인자", value: "inputStockEmployeeName" },
      { label: "상태", value: "inputConsent" },
    ],
  });
  const sortOptions = [
    { key: "input_key", label: "#" },
    { key: "input_common_code", label: "입고 구분" },
    { key: "input_no", label: "발주 번호" },
    { key: "item_common_name", label: "품목" },
    { key: "customer_name", label: "담당 업체" },
    { key: "request_employee_name", label: "신청자" },
    { key: "input_stock_employee_name", label: "승인자" },
    { key: "input_stock_date", label: "날짜" },
    { key: "input_consent", label: "상태" },
  ];

  return (
    <Box>
      <SearchBar
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
        searchOptions={searchOptions}
      />
      <RadioGroup
        value={searchParams.get("state") || "all"}
        my={3}
        onValueChange={(e) => {
          setSearchParams((prev) => ({
            ...Object.fromEntries(prev.entries()), // 기존 searchParams의 깊은 복사
            state: e.value,
            page: 1,
          }));
        }}
      >
        <HStack gap={6}>
          <Radio value="all">전체</Radio>
          <Radio value="request">대기</Radio>
          <Radio value="approve">승인</Radio>
          <Radio value="reject">반려</Radio>
        </HStack>
      </RadioGroup>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
              <Sort
                sortOptions={sortOptions}
                onSortChange={(nextSearchParam) =>
                  setSearchParams(nextSearchParam)
                }
              />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {instkList.map((item, index) => {
              return (
                <Table.Row
                  onDoubleClick={() => {
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
          count={count}
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
