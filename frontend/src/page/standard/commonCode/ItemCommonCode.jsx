import React, { useEffect, useState } from "react";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../../../components/ui/button.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { ItemCommonCodeList } from "../../../components/standard/commonCode/ItemCommonCodeList.jsx";
import { ItemCommonCodeAdd } from "../../../components/standard/commonCode/ItemCommonCodeAdd.jsx";
import { useSearchParams } from "react-router-dom";
import { ItemCommonCodeView } from "../../../components/standard/commonCode/ItemCommonCodeView.jsx";

export function ItemCommonCode() {
  const [itemCommonCodeKey, setItemCommonCodeKey] = useState(1);
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // 품목 공통 코드 목록 가져오기
  useEffect(() => {
    axios
      .get(`/api/commonCode/list`, {
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

  // 물품 선택 시 해당 물품 보여주기
  const handleRowClick = (item) => {
    setItemCommonCodeKey(item);
    setViewDialogOpen(true);
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StandardSideBar />
        <Stack flex={1}>
          <Text fontSize="xl" mx={10} my={3}>
            공통코드 관리
          </Text>
          <Box position="relative">
            {/* ItemCommonCodeList 감싸는 컨테이너 */}
            <ItemCommonCodeList
              count={count}
              itemCommonCodeList={itemCommonCodeList}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setItemCommonCodeKey={setItemCommonCodeKey}
              onRowClick={handleRowClick}
            />
            <Button
              onClick={() => setAddDialogOpen(true)}
              size="lg"
              position="absolute"
              right="10px"
            >
              코드 등록
            </Button>
          </Box>
        </Stack>
        <ItemCommonCodeView
          itemCommonCodeKey={itemCommonCodeKey}
          setItemCommonCodeKey={setItemCommonCodeKey}
          isOpen={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          setChange={setChange}
        />
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
