import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { ItemList } from "../../components/item/ItemList.jsx";
import { ItemAdd } from "../../components/item/ItemAdd.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Button } from "../../components/ui/button.jsx";
import { ItemView } from "../../components/item/ItemView.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function Item() {
  const [selectedPage, setSelectedPage] = useState("view");
  const [itemKey, setItemKey] = useState(1);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");

  useEffect(() => {
    axios
      .get("/api/item/list", {
        params: searchParams,
      })
      .then((res) => {
        setItems(res.data.list || []);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("물품 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams]);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
    handleSelectPage("view");
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          기준정보 관리 > 품목 관리
          <ItemList
            count={count}
            items={items}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setItemKey={setItemKey}
          />
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
              onAdd={handleAddItem}
              setItemKey={setItemKey}
            />
          ) : (
            <ItemView itemKey={itemKey} setItems={setItems} />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
