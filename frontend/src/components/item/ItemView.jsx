import React, { useEffect, useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../ui/button.jsx";

export function ItemView({ itemKey }) {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItemList(res.data);
        })
        .catch((error) => {
          console.error("물품 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey]);

  console.log(itemList);
  return (
    <Box>
      <Text>물품 조회 > 물품 상세{itemKey}</Text>
      <HStack>
        {itemList.map((item) => (
          <Box>
            <Box>{item.itemKey}</Box>
            <Box>{item.itemCodeName}</Box>
            <Box>{item.itemName}</Box>
            <Box>임시 담당 업체</Box>
            <Box>임시 취급 담당자</Box>
            <Box>{item.size}</Box>
            <Box>{item.unit}</Box>
            <Box>{item.inPrice}</Box>
            <Box>{item.outPrice}</Box>
            <Box>{item.itemCurrentCount}</Box>
            <Box>{item.minimumStock}</Box>
            <Box>{item.active}</Box>
            <Box>{item.note}</Box>
          </Box>
        ))}
        <Box>
          <Text>창고 리스트</Text>
        </Box>
      </HStack>
      <Button>수정</Button>
      <Button>삭제</Button>
    </Box>
  );
}
