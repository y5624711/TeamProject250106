import React from "react";
import { Box } from "@chakra-ui/react";

export function BranchMenu({ onSelect }) {
  return (
    <Box>
      <Box>가맹점 관리</Box>
      <Box onClick={() => onSelect("list")}>가맹점 조회</Box>
      <Box onClick={() => onSelect("add")}>가맹점 등록</Box>
    </Box>
  );
}
