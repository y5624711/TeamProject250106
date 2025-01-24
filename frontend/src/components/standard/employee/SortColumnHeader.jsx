import { HStack, Stack, Table } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown, FaCaretDown, FaCaretUp } from "react-icons/fa6";
import React, { useState } from "react";

export function SortColumnHeader({ handleSortControl, searchParams }) {
  return (
    <Table.Row>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("기본키");
        }}
      >
        <HStack>
          #
          {searchParams.get("sort") === "기본키" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("소속구분", "asc");
        }}
      >
        <HStack>
          소속 구분
          {searchParams.get("sort") === "소속구분" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("기업명", "asc");
        }}
      >
        <HStack>
          기업
          {searchParams.get("sort") === "기업명" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("기본키", "asc");
        }}
      >
        <HStack>
          기업 전화번호
          {searchParams.get("sort") === "소속구분" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("부서명", "asc");
        }}
      >
        <HStack>
          부서
          {searchParams.get("sort") === "부서명" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("부서번호", "asc");
        }}
      >
        <HStack>
          부서 번호
          {searchParams.get("sort") === "부서번호" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("직원명", "asc");
        }}
      >
        <HStack>
          직원
          {searchParams.get("sort") === "직원명" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("직원전화번호", "asc");
        }}
      >
        <HStack>
          직원 전화번호
          {searchParams.get("sort") === "직원전화번호" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader
        onClick={() => {
          handleSortControl("사번", "asc");
        }}
      >
        <HStack>
          사번{" "}
          {searchParams.get("sort") === "사번" ? (
            searchParams.get("order") === "asc" ? (
              <FaCaretUp />
            ) : (
              <FaCaretDown />
            )
          ) : (
            ""
          )}
        </HStack>
      </Table.ColumnHeader>
    </Table.Row>
  );
}
