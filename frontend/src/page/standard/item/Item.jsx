import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { ItemList } from "../../../components/standard/item/ItemList.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ItemAdd } from "../../../components/standard/item/ItemAdd.jsx";
import { ItemView } from "../../../components/standard/item/ItemView.jsx";

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
      <HStack align="flex-start" w="100%">
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading fontSize="xl" p={2} mb={3}>
            기준정보 관리 {">"} 품목 관리
          </Heading>
          <ItemList
            count={count}
            itemList={itemList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setItemKey={setItemKey}
            onRowClick={handleRowClick}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={() => setAddDialogOpen(true)} size="lg">
              품목 등록
            </Button>
          </Box>
        </Stack>
        <ItemView
          itemKey={itemKey}
          isOpen={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          setChange={setChange}
          setItemKey={setItemKey}
        />
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
