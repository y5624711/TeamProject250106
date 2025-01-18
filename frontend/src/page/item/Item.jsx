import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { ItemList } from "../../components/item/ItemList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Button } from "../../components/ui/button.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ItemAdd } from "../../components/item/ItemAdd.jsx";
import { ItemView } from "../../components/item/ItemView.jsx";

export function Item() {
  const [itemKey, setItemKey] = useState(1);
  const [itemList, setItemList] = useState([]);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/item/list", {
        params: searchParams,
      })
      .then((res) => {
        setItemList(res.data.list || []);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("품목 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  // 물품 등록 시 리스트 변경, 다이얼로그 닫기
  const handleAddItem = (newItem) => {
    setItemList((prevItems) => [newItem, ...prevItems]);
    setAddDialogOpen(false);
  };

  // 물품 선택 시 해당 물품 보여주기
  const handleRowClick = (item) => {
    setItemKey(item);
    setViewDialogOpen(true);
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          기준정보 관리 > 품목 관리
          <ItemList
            count={count}
            itemList={itemList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setItemKey={setItemKey}
            onRowClick={handleRowClick}
          />
        </Stack>
        <ItemView
          itemKey={itemKey}
          isOpen={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          setChange={setChange}
          setItemKey={setItemKey}
        />
        <Button onClick={() => setAddDialogOpen(true)}>물품 등록</Button>
        <ItemAdd
          isOpen={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddItem}
          setChange={setChange}
        />
      </HStack>
    </Box>
  );
}
