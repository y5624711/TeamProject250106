import {
  Box,
  Center,
  createListCollection,
  HStack,
  Stack,
  Table,
  TableColumnHeader,
  TableHeader,
} from "@chakra-ui/react";
import { SearchBar } from "../../tool/list/SearchBar.jsx";
import { Pagination } from "../../tool/list/Pagination.jsx";
import { StateRadioGroup } from "../../tool/list/StateRadioGroup.jsx";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import React, { useMemo } from "react";

export function PurchaseList({
  purchaseList,
  onViewClick,
  count,
  searchParams,
  setSearchParams,
  standard,
  setStandard,
  handleSortChange,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "담당 업체", value: "customerName" },
      { label: "품목", value: "itemCommonName" },
      { label: "요청자", value: "employeeName" },
      { label: "승인자", value: "customerEmployeeName" },
    ],
  });

  // 라디오 옵션
  const radioOptions = [
    { value: "all", label: "전체" },
    { value: "request", label: "대기" },
    { value: "approve", label: "승인" },
    { value: "disapprove", label: "반려" },
  ];

  // // URL에서 "state" 파라미터 값을 가져와 초기값으로 설정
  // const [radioValue, setRadioValue] = useState(
  //   searchParams.get("state") || "all",
  // );
  //
  // // 상태 변경 (라디오 버튼 선택 시 URL 쿼리 파라미터 갱신)
  // const handleStateChange = (value) => {
  //   const nextSearchParam = new URLSearchParams(searchParams);
  //
  //   nextSearchParam.set("page", "1");
  //   nextSearchParam.set("state", value);
  //
  //   setSearchParams(nextSearchParam);
  // };
  //
  // // 새로고침 시 검색 파라미터에서 state 값이 있으면 라디오 버튼 상태를 설정
  // useEffect(() => {
  //   const stateFromParams = searchParams.get("state") || "all";
  //   setRadioValue(stateFromParams);
  // }, [searchParams]);

  // 정렬 기준 변경
  const HeaderClick = (column) => {
    if (standard.sort === column) {
      setStandard({
        sort: column,
        order: standard.order === "asc" ? "desc" : "asc",
      });
    } else {
      setStandard({
        sort: column,
        order: "asc",
      });
    }
    // 새로운 파라미터를 사용하여 정렬 변경 함수 호출
    if (handleSortChange) {
      handleSortChange(column, standard.order);
    }
  };

  // 정렬된 데이터 반환
  const sortedPurchaseList = useMemo(() => {
    return [...purchaseList].sort((a, b) => {
      const aValue = a[standard.sort];
      const bValue = b[standard.sort];

      if (aValue < bValue) return standard.order === "asc" ? -1 : 1;
      if (aValue > bValue) return standard.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [purchaseList, standard]);

  return (
    <Box>
      {/* 검색 */}
      <SearchBar
        searchOptions={searchOptions}
        onSearchChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      {/* 라디오 */}
      <StateRadioGroup
        radioOptions={radioOptions}
        onRadioChange={(nextSearchParam) => setSearchParams(nextSearchParam)}
      />
      {/* 테이블 */}
      <Table.Root interactive>
        <TableHeader>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("purchaseRequestKey")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>#</Stack>
                {standard.sort === "purchaseRequestKey" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("customerName")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>담당 업체</Stack>
                {standard.sort === "customerName" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("itemCommonName")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>품목</Stack>
                {standard.sort === "itemCommonName" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("employeeNo")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>요청자</Stack>
                {standard.sort === "employeeNo" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("customerEmployeeNo")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>신청자</Stack>
                {standard.sort === "customerEmployeeNo" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              onClick={() => HeaderClick("date")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>날짜</Stack>
                {standard.sort === "date" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <Table.Cell textAlign="center">상태</Table.Cell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {sortedPurchaseList.length > 0 ? (
            sortedPurchaseList.map((purchase, index) => (
              <Table.Row
                key={index}
                onDoubleClick={() => onViewClick(purchase.purchaseRequestKey)}
                style={{ cursor: "pointer" }}
                _hover={{ backgroundColor: "gray.200" }}
                textAlign="center"
                verticalAlign="middle"
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.customerName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.itemCommonName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.employeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.customerEmployeeName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.purchaseApproveDate || purchase.purchaseRequestDate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {purchase.purchaseConsent == 1
                    ? "승인"
                    : purchase.purchaseConsent == 0
                      ? "반려"
                      : "대기"}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell textAlign="center" colSpan="9">
                데이터가 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      {/* 페이지네이션 */}
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
    </Box>
  );
}
