import React, { useEffect, useState } from "react";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../../../components/ui/button.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { CommonCodeList } from "../../../components/standard/commonCode/CommonCodeList.jsx";
import { CommonCodeAdd } from "../../../components/standard/commonCode/CommonCodeAdd.jsx";
import { useSearchParams } from "react-router-dom";
import { CommonCodeView } from "../../../components/standard/commonCode/CommonCodeView.jsx";

export function CommonCode() {
  const [commonCodeKey, setCommonCodeKey] = useState(1);
  const [commonCodeList, setCommonCodeList] = useState([]);
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
        setCommonCodeList(res.data.list || []);
        setCount(res.data.count);
      })
      .catch((error) => {
        console.error("품목 공통 코드 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  // 물품 코드 등록 시 리스트 변경, 다이얼로그 닫기
  const handleAddCommonCode = (newItem) => {
    setCommonCodeList((prevItems) => [newItem, ...prevItems]);
    setAddDialogOpen(false);
  };

  // 물품 선택 시 해당 물품 보여주기
  const handleRowClick = (item) => {
    setCommonCodeKey(item);
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
            {/* CommonCodeList 감싸는 컨테이너 */}
            <CommonCodeList
              count={count}
              commonCodeList={commonCodeList}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setItemCommonCodeKey={setCommonCodeKey}
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
        <CommonCodeView
          commonCodeKey={commonCodeKey}
          setCommonCodeKey={setCommonCodeKey}
          isOpen={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          setChange={setChange}
        />
        <CommonCodeAdd
          isOpen={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={handleAddCommonCode}
          setChange={setChange}
        />
      </HStack>
    </Box>
  );
}
