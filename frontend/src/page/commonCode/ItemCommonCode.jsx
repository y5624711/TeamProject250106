import React, { useEffect, useState } from "react";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { ItemCommonCodeList } from "../../components/commonCode/ItemCommonCodeList.jsx";
import { ItemCommonCodeAdd } from "../../components/commonCode/ItemCommonCodeAdd.jsx";
import { useSearchParams } from "react-router-dom";

export function ItemCommonCode() {
  const [itemCommonCodeKey, setItemCommonCodeKey] = useState(1);
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // 품목 공통 코드 목록 가져오기
  useEffect(() => {
    axios
      .get(`/api/commonCode/item/list`, {
        params: searchParams,
      })
      .then((res) => {
        setItemCommonCodeList(res.data.list || []);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("품목 공통 코드 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  // 물품 코드 등록 시 리스트 변경, 다이얼로그 닫기
  const handleAddItemCommonCode = (newItem) => {
    setItemCommonCodeList((prevItems) => [newItem, ...prevItems]);
    setAddDialogOpen(false);
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <SideBar />
        <Stack flex={1}>
          <Text fontSize="xl" mx={10} my={3}>
            공통코드 관리 > 품목 코드
          </Text>
          <ItemCommonCodeList
            count={count}
            itemCommonCodeList={itemCommonCodeList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setItemCommonCodeKey={setItemCommonCodeKey}
          />
          <Button
            onClick={() => setAddDialogOpen(true)}
            size="lg"
            position="absolute"
            bottom="100px"
            right="100px"
          >
            물품 코드 등록
          </Button>
        </Stack>
        {/*<ItemCommonCodeView*/}
        {/*  itemCommonCodeKey={itemCommonCodeKey}*/}
        {/*  setItemCommonCodeList={setItemCommonCodeList}*/}
        {/*  setSearchParams={setSearchParams}*/}
        {/*  setChange={setChange}*/}
        {/*/>*/}
        <ItemCommonCodeAdd
          isOpen={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddItemCommonCode}
          setItemCommonCodeKey={setItemCommonCodeKey}
          setChange={setChange}
        />
      </HStack>
    </Box>
  );
}
