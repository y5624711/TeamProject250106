import {
  Box,
  Button,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
  TableColumnHeader,
  TableHeader,
  TableRow,
} from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import React from "react";

export function FranchiseList({
  franchiseKey,
  search,
  setSearch,
  handleSearchClick,
  checkedActive,
  setCheckedActive,
  onFranchiseClick,
  franchiseList, // 이미 부모에서 받은 franchiseList 사용
}) {
  console.log(franchiseList);
  console.log("체크박스 상태:", checkedActive);

  const FranchiseOptionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점명", value: "franchiseName" },
      { label: "가맹점주", value: "franchiseRep" },
      { label: "광역시도", value: "franchiseState" },
      { label: "시군", value: "franchiseCity" },
      { label: "본사 직원 이름", value: "businessEmployeeName" },
    ],
  });

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <SelectRoot
          collection={FranchiseOptionList}
          value={[search.type]}
          onValueChange={(oc) => {
            setSearch({ ...search, type: oc.value[0] });
          }}
          width="150px"
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {FranchiseOptionList.items.map((option) => (
              <SelectItem item={option} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        <Input
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          placeholder="검색어 입력해 주세요."
          width="300px"
          marginLeft="10px"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <Button onClick={handleSearchClick} marginLeft="10px" width="80px">
          검색
        </Button>
      </Box>
      <Checkbox
        mt={3}
        Checked={checkedActive}
        onChange={() => {
          setCheckedActive(!checkedActive); // 상태 업데이트
          console.log("checkedActive 상태:", !checkedActive);
        }}
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
            franchiseList.map((franchise, index) => (
              <Table.Row
                key={index}
                onClick={() => onFranchiseClick(franchise.franchiseKey)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell>{index + 1}</Table.Cell>
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
