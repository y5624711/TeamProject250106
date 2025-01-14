import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { ItemList } from "../../components/item/ItemList.jsx";
import { ItemAdd } from "../../components/item/ItemAdd.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Button } from "../../components/ui/button.jsx";
import { ItemView } from "../../components/item/ItemView.jsx";

export function Item() {
  const [selectedItemKey, setSelectedItemKey] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleShowDetail = (itemKey) => {
    setSelectedItemKey(itemKey);
    setIsAdding(false);
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          기준정보 관리 > 품목 관리
          <ItemList onShowDetail={handleShowDetail} />
        </Stack>
        <Stack>
          <Button
            onClick={() => {
              setIsAdding((prev) => !prev);
              setSelectedItemKey(null);
            }}
          >
            {isAdding ? "닫기" : "추가"}
          </Button>
          {isAdding ? <ItemAdd /> : <ItemView itemKey={selectedItemKey} />}
        </Stack>
      </HStack>
    </Box>
  );
}
