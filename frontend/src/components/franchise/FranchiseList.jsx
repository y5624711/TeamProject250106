import {
  Box,
  Button,
  createListCollection,
  Input,
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import React from "react";

export function FranchiseList({
  search,
  setSearch,
  handleSearchClick,
  checkedActive,
  setCheckedActive,
  onFranchiseClick,
  franchiseList, // 이미 부모에서 받은 franchiseList 사용
}) {
  const optionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점명", value: "franchiseName" },
      { label: "가맹점주", value: "franchiseRep" },
      { label: "광역시도", value: "franchiseState" },
      { label: "시군", value: "franchiseCity" },
      { label: "본사 직원", value: "businessEmployeeName" },
    ],
  });

  return (
    <Box>
      <Box>
        <Input
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          placeholder="검색어 입력해 주세요."
          width="200px"
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </Box>
      <Checkbox
        isChecked={checkedActive}
        onChange={() => setCheckedActive(!checkedActive)}
      >
        삭제 내역 포함 보기
      </Checkbox>
      <Table.Root interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>#</TableColumnHeader>
            <TableColumnHeader>가맹점명</TableColumnHeader>
            <TableColumnHeader>가맹점주</TableColumnHeader>
            <TableColumnHeader>광역시도</TableColumnHeader>
            <TableColumnHeader>시군</TableColumnHeader>
            <TableColumnHeader>본사 직원 이름</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {franchiseList.length > 0 ? (
            franchiseList.map((franchise) => (
              <Table.Row
                style={{ cursor: "pointer" }}
                key={franchise.franchiseKey}
                onClick={() => onFranchiseClick(franchise.franchiseKey)} // 클릭 시 부모 컴포넌트로 franchiseKey 전달
              >
                <Table.Cell>{franchise.franchiseKey}</Table.Cell>
                <Table.Cell>{franchise.franchiseName}</Table.Cell>
                <Table.Cell>{franchise.franchiseRep}</Table.Cell>
                <Table.Cell>{franchise.franchiseState}</Table.Cell>
                <Table.Cell>{franchise.franchiseCity}</Table.Cell>
                <Table.Cell>{franchise.businessEmployeeName}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="6">데이터가 없습니다.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
