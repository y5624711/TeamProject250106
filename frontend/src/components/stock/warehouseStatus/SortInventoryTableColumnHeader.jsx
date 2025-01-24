import { HStack, Table } from "@chakra-ui/react";
import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export function SortInventoryTableColumnHeader({
  columnsList,
  searchParams,
  setSearchParams,
  onSortChange,
}) {
  const handleSort = (key) => {
    const currentOrder = searchParams.get("sortOrder") || "asc";
    const nextOrder =
      searchParams.get("sortColum") === key && currentOrder === "asc"
        ? "desc"
        : "asc";

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("sortColum", key);
    nextSearchParams.set("sortOrder", nextOrder);

    console.log(nextSearchParams.get("sortColum"));
    console.log(nextSearchParams.get("sortOrder"));
    onSortChange(nextSearchParams);
    setSearchParams(nextSearchParams);
  };

  return (
    <>
      {columnsList.map((sort) => (
        <Table.ColumnHeader
          textAlign="center"
          style={{ cursor: "pointer" }}
          key={sort.key}
          onClick={() => handleSort(sort.key)}
        >
          <HStack justify="center" align="center" width="100%">
            {sort.label}
            {searchParams.get("sortColum") === sort.key ? (
              searchParams.get("sortOrder") === "asc" ? (
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
