import {
  Box,
  Center,
  createListCollection,
  HStack,
  Table,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { InstkConfirmModal } from "./InstkConfirmModal.jsx";
import { InstkDetaiViewModal } from "./InstkDetaiViewModal.jsx";
import axios from "axios";
import { SearchBar } from "../../tool/form/SearchBar.jsx";
import { Pagination } from "../../tool/form/Pagination.jsx";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { useSearchParams } from "react-router-dom";
import { Sort } from "../../tool/form/Sort.jsx";

export function InstkList() {
  const [instkList, setInstkList] = useState([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDetailViewModalOpen, setIsDetailViewModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectInputKey, setSelectInputKey] = useState(-1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = useCallback(() => {
    setIsLoading(true);
    axios
      .get("api/instk/list", {
        params: {
          state: searchParams.get("state"),
          page: searchParams.get("page"),
          keyword: searchParams.get("keyword"),
          sort: searchParams.get("sort"),
          order: searchParams.get("order"),
          type: searchParams.get("type"),
        },
      })
      .then((res) => {
        setCount(res.data.count);
        setInstkList(res.data.list);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleApproveModal = () => {
    setIsApproveModalOpen(!isApproveModalOpen);
  };
  const handleDetailViewModal = () => {
    setIsDetailViewModalOpen(!isDetailViewModalOpen);
  };
  // 상태 현황에 따라 다른 모달 띄울 함수
  const handleSelectModal = (checkState) => {
    checkState === true
      ? handleDetailViewModal()
      : checkState === false
        ? handleDetailViewModal()
        : handleApproveModal();
  };

  const handleApprovalSuccess = async () => {
    await refreshData(); // 데이터 새로고침

    // 상세모달띄우기
    handleDetailViewModal();
  };

  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "입고 구분", value: "input_common_code" },
      { label: "주문 번호", value: "input_no" },
      { label: "품목", value: "item_common_name" },
      { label: "담당 업체", value: "customer_name" },
      { label: "요청자", value: "request_employee_name" },
      { label: "승인자", value: "input_stock_employee_name" },
    ],
  });
  const sortOptions = [
    { key: "input_key", label: "#" },
    { key: "input_common_code", label: "입고 구분" },
    { key: "input_no", label: "주문 번호" },
    { key: "item_common_name", label: "품목" },
    { key: "customer_name", label: "담당 업체" },
    { key: "request_employee_name", label: "요청자" },
    { key: "input_stock_employee_name", label: "반려/승인자" },
    { key: "combined_date", label: "날짜" },
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
        my={6}
        ml={2}
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
                defaultSortKey={"combined_date"}
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
                    setSelectInputKey(item.inputKey);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  textAlign="center"
                  key={index}
                  _hover={{ backgroundColor: "gray.200" }}
                >
                  <Table.Cell textAlign="center" width="90px">
                    {index + 1}
                  </Table.Cell>
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
                    {item.inputStockEmployeeName ||
                      item.disapproveEmployeeName ||
                      "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item.inputStockDate ||
                      item.disapproveDate ||
                      item.requestDate}
                  </Table.Cell>
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
      <Center>
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
          onApprovalSuccess={handleApprovalSuccess}
          instk={instkList[selectedIndex]}
        />
      )}

      {isDetailViewModalOpen && (
        <InstkDetaiViewModal
          isModalOpen={isDetailViewModalOpen}
          selectInputKey={selectInputKey}
          setChangeModal={handleDetailViewModal}
          instk={instkList[selectedIndex]}
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}
