import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

export function ItemView({ itemId }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/item/${itemId}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.error("물품 상세 정보 요청 중 오류 발생: ", error);
      });
  }, []);

  return (
    <Box>
      <Text>물품 조회 > 물품 상세</Text>
      <Box>{itemId}</Box>
    </Box>
  );
}
