import {
  Box,
  Button,
  createListCollection,
  HStack,
  IconButton,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Table,
  TableColumnHeader,
  TableHeader,
} from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import React, { useMemo } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { BsArrowCounterclockwise } from "react-icons/bs";

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

        {/* 검색 초기화 */}
        <IconButton
          transform="translateX(-130%) "
          style={{ cursor: "pointer" }}
          variant={"ghost"}
          onClick={() => {
            window.location.search = ""; // searchParams 초기화
          }}
        >
          <BsArrowCounterclockwise size="25px" />
        </IconButton>
        <Button onClick={handleSearchClick} transform="translateX(-75%)">
          검색
        </Button>
      </HStack>

      {/* 전체 조회 체크 박스 */}
      <Checkbox
        mt={3}
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
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseKey")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>#</Stack>
                {standard.sort === "franchiseKey" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseName")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>가맹점명</Stack>
                {standard.sort === "franchiseName" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseNo")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>사업자 번호</Stack>
                {standard.sort === "franchiseNo" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseRep")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>대표자</Stack>
                {standard.sort === "franchiseRep" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseTel")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>전화번호</Stack>
                {standard.sort === "franchiseTel" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseState")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>광역시도</Stack>
                {standard.sort === "franchiseState" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
            </TableColumnHeader>
            <TableColumnHeader
              textAlign="center"
              verticalAlign="middle"
              onClick={() => HeaderClick("franchiseCity")}
            >
              <HStack alignItems="center" justify="center">
                <Stack>시군</Stack>
                {standard.sort === "franchiseCity" && (
                  <Stack>
                    {standard.order === "asc" ? <FaCaretUp /> : <FaCaretDown />}
                  </Stack>
                )}
              </HStack>
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
              <Table.Cell textAlign="center" colSpan="7">
                데이터가 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
