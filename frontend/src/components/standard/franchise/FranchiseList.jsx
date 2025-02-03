import {
  Box,
  Button,
  createListCollection,
  HStack,
  IconButton,
  Input,
  Table,
  TableHeader,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";
import React from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { Sort } from "../../tool/list/Sort.jsx";

export function FranchiseList({
  franchiseList,
  search,
  setSearch,
  setSearchParams,
  handleSearchClick,
  onReset,
  checkedActive,
  toggleCheckedActive,
  onFranchiseClick,
}) {
  const FranchiseOptionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "가맹점", value: "franchiseName" },
      { label: "사업자 번호", value: "franchiseNo" },
      { label: "대표자", value: "franchiseRep" },
      { label: "광역시도", value: "franchiseState" },
      { label: "시군", value: "franchiseCity" },
    ],
  });

  const sortOptions = [
    { key: "franchiseKey", label: "#" },
    { key: "franchiseName", label: "가맹점" },
    { key: "franchiseNo", label: "사업자 번호" },
    { key: "franchiseRep", label: "대표자" },
    { key: "franchiseTel", label: "전화번호" },
    { key: "franchiseState", label: "광역시도" },
    { key: "franchiseCity", label: "시군" },
  ];

  return (
    <Box>
      {/* 검색창 */}
      <HStack justifyContent="center" w={"100%"} mt={-2}>
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
          <SelectContent>
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
          style={{ cursor: "pointer" }}
          transform="translateX(-130%) "
          variant={"ghost"}
          onClick={onReset}
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
        ml={3}
        checked={checkedActive}
        onChange={toggleCheckedActive}
      >
        미사용 포함 조회
      </Checkbox>

      {/* 테이블 */}
      <Table.Root interactive style={{ cursor: "pointer" }}>
        <TableHeader>
          <Table.Row whiteSpace={"nowrap"} bg={"gray.100"}>
            <Sort
              sortOptions={sortOptions}
              onSortChange={(nextSearchParam) =>
                setSearchParams(nextSearchParam)
              }
              defaultSortKey={"franchiseKey"}
            />
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {franchiseList.length > 0 ? (
            franchiseList.map((franchise, index) => (
              <Table.Row
                key={franchise.franchiseKey}
                onDoubleClick={() => onFranchiseClick(franchise.franchiseKey)}
                style={{ cursor: "pointer" }}
                bg={franchise.franchiseActive === false ? "gray.100" : "white"} // undefined일 경우 기본값 white
                _hover={{ backgroundColor: "gray.200" }}
              >
                <Table.Cell textAlign="center">{index + 1}</Table.Cell>
                <Table.Cell textAlign="center">
                  {franchise.franchiseName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {franchise.franchiseNo}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {franchise.franchiseRep}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {franchise.franchiseTel}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {franchise.franchiseState}
                </Table.Cell>
                <Table.Cell textAlign="center">
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
