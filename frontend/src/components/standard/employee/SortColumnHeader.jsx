import { HStack, Stack, Table } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import React from "react";

export function SortColumnHeader({ handleSortControl }) {
  return (
    <Table.Row>
      <Table.ColumnHeader>
        <HStack>
          #
          <FaArrowUp
            onClick={() => {
              handleSortControl("기본키", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("기본키", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          소속 구분
          <FaArrowUp
            onClick={() => {
              handleSortControl("소속구분", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("소속구분", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          기업명{" "}
          <FaArrowUp
            onClick={() => {
              handleSortControl("기업명", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("기업명", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          기업 전화번호
          <FaArrowUp
            onClick={() => {
              handleSortControl("기본키", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("기본키", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          부서명{" "}
          <FaArrowUp
            onClick={() => {
              handleSortControl("부서명", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("부서명", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          부서 번호
          <FaArrowUp
            onClick={() => {
              handleSortControl("부서명", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("부서명", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          직원명
          <FaArrowUp
            onClick={() => {
              handleSortControl("직원명", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("직원명", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          직원전화번호
          <FaArrowUp
            onClick={() => {
              handleSortControl("직원명", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("직원명", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
      <Table.ColumnHeader>
        <HStack>
          사번{" "}
          <FaArrowUp
            onClick={() => {
              handleSortControl("사번", "asc");
            }}
          />
          <FaArrowDown
            onClick={() => {
              handleSortControl("사번", "desc");
            }}
          />
        </HStack>
      </Table.ColumnHeader>
    </Table.Row>
  );
}
