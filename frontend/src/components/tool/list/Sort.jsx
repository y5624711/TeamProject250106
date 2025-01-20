import React from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";

// 정렬 컴포넌트
export function Sort({ sortOptions, onSortChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 정렬 처리 함수
  const handleSort = (key) => {
    const currentOrder = searchParams.get("order") || "asc";
    const nextOrder =
      searchParams.get("sort") === key && currentOrder === "asc"
        ? "desc"
        : "asc";

    // URLSearchParams를 이용해 정렬 파라미터 업데이트
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sort", key); // 정렬 기준 키
    nextSearchParams.set("order", nextOrder); // 오름차순/내림차순
    nextSearchParams.set("page", "1"); // 페이지는 1로 리셋

    // 부모 컴포넌트로 새 검색 파라미터 전달
    onSortChange(nextSearchParams);
    setSearchParams(nextSearchParams); // URL에 반영
  };

  return (
    <>
      {sortOptions.map((sort) => (
        <Table.ColumnHeader
          textAlign="center"
          key={sort.key}
          onClick={() => handleSort(sort.key)}
          style={{ cursor: "pointer" }}
        >
          {sort.label}
          {searchParams.get("sort") === sort.key
            ? searchParams.get("order") === "asc"
              ? "▲"
              : "▼"
            : ""}
        </Table.ColumnHeader>
      ))}
    </>
  );
}
