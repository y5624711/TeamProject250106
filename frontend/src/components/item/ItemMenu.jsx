import React from "react";
import { Box } from "@chakra-ui/react";

export function ItemMenu({ onSelect }) {
  return (
    <Box>
      <Box>물품 관리</Box>
      <Box onClick={() => onSelect("list")}>물품 조회</Box>
      <Box onClick={() => onSelect("add")}>물품 등록</Box>
    </Box>
  );
}
