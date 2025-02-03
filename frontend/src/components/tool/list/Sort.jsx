import React from "react";
import { useSearchParams } from "react-router-dom";
import { HStack, Table } from "@chakra-ui/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

// 정렬 컴포넌트
export function Sort({ sortOptions, onSortChange, defaultSortKey }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 기본값 설정: sort가 없으면 defaultSortKey, order가 없으면 'desc'
  const sort = searchParams.get("sort") || defaultSortKey;
  const order = searchParams.get("order") || "desc";

  // 정렬 처리 함수
  const handleSort = (key) => {
    const currentOrder = order;
    const nextOrder = sort === key && currentOrder === "desc" ? "asc" : "desc";

    // URLSearchParams를 이용해 정렬 파라미터 업데이트
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", key); // 정렬 기준 키
    nextSearchParams.set("order", nextOrder); // 오름차순/내림차순

    // 부모 컴포넌트로 새 검색 파라미터 전달
    onSortChange(nextSearchParams);
    setSearchParams(nextSearchParams); // URL에 반영
  };

  return (
    <>
      {sortOptions.map((sortOption) => (
        <Table.ColumnHeader
          textAlign="center"
          key={sortOption.key}
          onClick={() => handleSort(sortOption.key)}
          style={{ cursor: "pointer" }}
        >
          <HStack justify="center" align="center" width="100%">
            {sortOption.label}
            {sort === sortOption.key ? (
              order === "asc" ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )
            ) : (
              ""
            )}
          </HStack>
        </Table.ColumnHeader>
      ))}
    </>
  );
}
