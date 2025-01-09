import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";

export function ItemList({ onShowDetail }) {
  return (
    <Box>
      <Text>물품 조회</Text>
      <Button onClick={onShowDetail}>상세보기</Button>
    </Box>
  );
}
