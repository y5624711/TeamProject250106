import {
  Box,
  Button,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
  TableColumnHeader,
  TableHeader,
} from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
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
  handleSortChange,
}) {
  const FranchiseOptionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점명", value: "franchiseName" },
      { label: "사업자 번호", value: "franchiseNo" },
      { label: "대표자", value: "franchiseRep" },
      { label: "광역시도", value: "franchiseState" },
      { label: "시군", value: "franchiseCity" },
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
    // 새로운 파라미터를 사용하여 정렬 변경 함수 호출
    if (handleSortChange) {
      handleSortChange(column, standard.order);
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
      {/* 검색창 */}
      <HStack justifyContent="center">
        <SelectRoot
          collection={FranchiseOptionList}
          width="160px"
          position="relative"
          value={[search.type]}
          onValueChange={(oc) => {
            setSearch({ ...search, type: oc.value[0] });
          }}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent
            style={{
              width: "150px",
              top: "40px",
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
          placeholder="검색어를 입력해 주세요."
          width="50%"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
        />
        <Button onClick={handleSearchClick}>검색</Button>
      </HStack>

      {/* 전체 조회 체크 박스 */}
      <Checkbox
        mt={5}
        mb={5}
        ml={2}
        checked={checkedActive}
        onChange={toggleCheckedActive}
      >
        전체 조회
      </Checkbox>

      {/* 테이블 */}
      <Table.Root interactive>
        <TableHeader>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <TableColumnHeader onClick={() => HeaderClick("franchiseKey")}>
              #{" "}
              {standard.sort === "franchiseKey" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseName")}
            >
              가맹점명{" "}
              {standard.sort === "franchiseName" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseNo")}
            >
              사업자 번호{" "}
              {standard.sort === "franchiseNo" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseRep")}
            >
              대표자{" "}
              {standard.sort === "franchiseRep" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseTel")}
            >
              전화번호{" "}
              {standard.sort === "franchiseTel" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseState")}
            >
              광역시도{" "}
              {standard.sort === "franchiseState" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseCity")}
            >
              시군{" "}
              {standard.sort === "franchiseCity" &&
                (standard.order === "asc" ? "↑" : "↓")}
            </TableColumnHeader>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {sortedFranchiseList.length > 0 ? (
            sortedFranchiseList.map((franchise, index) => (
              <Table.Row
                key={index}
                onDoubleClick={() => onFranchiseClick(franchise.franchiseKey)}
                bg={franchise.franchiseActive ? "white" : "gray.100"}
                _hover={{ backgroundColor: "gray.200" }}
                cursor="pointer"
              >
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {index + 1}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseName}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseNo}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseRep}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseTel}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseState}
                </Table.Cell>
                <Table.Cell textAlign="center" verticalAlign="middle">
                  {franchise.franchiseCity}
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="7">데이터가 없습니다.</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
