import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { ItemList } from "../../components/item/ItemList.jsx";
import { ItemAdd } from "../../components/item/ItemAdd.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Button } from "../../components/ui/button.jsx";
import { ItemView } from "../../components/item/ItemView.jsx";

export function Item() {
  const [selectedPage, setSelectedPage] = useState("view");
  const [itemKey, setItemKey] = useState(1);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          기준정보 관리 > 품목 관리
          <ItemList setItemKey={setItemKey} />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}
          {selectedPage === "add" ? (
            <ItemAdd
              onCancel={() => {
                handleSelectPage("view");
                setItemKey(1);
              }}
            />
          ) : (
            <ItemView itemKey={itemKey} />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
