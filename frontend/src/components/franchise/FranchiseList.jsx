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

  const [sortColumn, setSortColumn] = React.useState("franchiseKey"); // 초기 정렬 기준
  const [sortOrder, setSortOrder] = React.useState("asc"); // 초기 정렬 방향

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

  const HeaderClick = (column) => {
    if (sortColumn === column) {
      // 이미 해당 컬럼으로 정렬 중이면, 정렬 방향 반전
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // 새로 클릭한 컬럼으로 정렬
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // 정렬된 데이터 반환
  const sortedFranchiseList = React.useMemo(() => {
    return [...franchiseList].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [franchiseList, sortColumn, sortOrder]);

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
            <TableColumnHeader onClick={() => HeaderClick("franchiseKey")}>
              #{" "}
              {sortColumn === "franchiseKey" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseName")}>
              가맹점명{" "}
              {sortColumn === "franchiseName" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseRep")}>
              가맹점주{" "}
              {sortColumn === "franchiseRep" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseState")}>
              광역시도{" "}
              {sortColumn === "franchiseState" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseCity")}>
              시군{" "}
              {sortColumn === "franchiseCity" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              onClick={() => HeaderClick("businessEmployeeName")}
            >
              본사 직원 이름{" "}
              {sortColumn === "businessEmployeeName" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {sortedFranchiseList.length > 0 ? (
            sortedFranchiseList.map((franchise, index) => (
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
