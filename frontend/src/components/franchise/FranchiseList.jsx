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
import React, { useMemo } from "react";

export function FranchiseList({
  franchiseList,
  search,
  setSearch,
  handleSearchClick,
  checkedActive,
  toggleCheckedActive,
  onFranchiseClick,
  standard,
  setStandard,
}) {
  const FranchiseOptionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "사업자 번호", value: "franchiseNo" },
      { label: "가맹점명", value: "franchiseName" },
      { label: "가맹점주", value: "franchiseRep" },
      { label: "광역시도", value: "franchiseState" },
      { label: "시군", value: "franchiseCity" },
      { label: "직원 사번", value: "businessEmployeeNo" },
      { label: "직원 이름", value: "businessEmployeeName" },
    ],
  });

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
  };

  // 정렬된 데이터 반환
  const sortedFranchiseList = useMemo(() => {
    return [...franchiseList].sort((a, b) => {
      const aValue = a[standard.sort];
      const bValue = b[standard.sort];

      if (aValue < bValue) return standard.order === "asc" ? -1 : 1;
      if (aValue > bValue) return standard.order === "asc" ? 1 : -1;
      return 0;
    });
  }, [franchiseList, standard]);

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
          <SelectContent
            style={{
              width: "150px",
              position: "absolute",
            }}
          >
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
      <Checkbox mt={3} checked={checkedActive} onChange={toggleCheckedActive}>
        삭제 내역 포함 보기
      </Checkbox>
      <Table.Root interactive>
        <TableHeader>
          <TableRow>
            <TableColumnHeader onClick={() => HeaderClick("franchiseKey")}>
              #{" "}
              {standard.sort === "franchiseKey" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseName")}>
              가맹점명{" "}
              {standard.sort === "franchiseName" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseRep")}>
              가맹점주{" "}
              {standard.sort === "franchiseRep" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseNo")}>
              사업자 번호{" "}
              {standard.sort === "franchiseNo" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseTel")}>
              전화번호{" "}
              {standard.sort === "franchiseTel" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseState")}>
              광역시도{" "}
              {standard.sort === "franchiseState" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader onClick={() => HeaderClick("franchiseCity")}>
              시군{" "}
              {standard.sort === "franchiseCity" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              onClick={() => HeaderClick("businessEmployeeNo")}
            >
              직원 사번{" "}
              {standard.sort === "businessEmployeeNo" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              onClick={() => HeaderClick("businessEmployeeName")}
            >
              직원 이름{" "}
              {standard.sort === "businessEmployeeName" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <Table.Body>
          {sortedFranchiseList.length > 0 ? (
            sortedFranchiseList.map((franchise, index) => (
              <Table.Row
                key={index}
                onClick={() => onFranchiseClick(franchise.franchiseKey)}
                style={{
                  cursor: "pointer",
                  backgroundColor: franchise.franchiseActive === false ? "#EAEAEA" : "white",
                }}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{franchise.franchiseName}</Table.Cell>
                <Table.Cell>{franchise.franchiseRep}</Table.Cell>
                <Table.Cell>{franchise.franchiseNo}</Table.Cell>
                <Table.Cell>{franchise.franchiseTel}</Table.Cell>
                <Table.Cell>{franchise.franchiseState}</Table.Cell>
                <Table.Cell>{franchise.franchiseCity}</Table.Cell>
                <Table.Cell>{franchise.businessEmployeeNo}</Table.Cell>
                <Table.Cell>{franchise.businessEmployeeName}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="9">데이터가 없습니다.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
