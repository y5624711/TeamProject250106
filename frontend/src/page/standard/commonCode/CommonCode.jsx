import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import axios from "axios";
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
        setCommonCodeKey(null);
      })
      .catch((error) => {
        console.error("품목 공통 코드 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  // 품목 코드 등록 시 리스트 변경, 다이얼로그 닫기
  const handleAddCommonCode = (newItem) => {
    setCommonCodeList((prevItems) => [newItem, ...prevItems]);
    setAddDialogOpen(false);
  };

  // 품목 선택 시 해당 품목 보여주기
  const handleRowClick = (item) => {
    setCommonCodeKey(item);
    setViewDialogOpen(true);
  };

  return (
    <Box>
      <HStack align={"flex-start"} w={"100%"}>
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            기준정보 관리 {">"} 공통 코드 관리
          </Heading>
          <Box>
            {/* CommonCodeList 감싸는 컨테이너 */}
            <CommonCodeList
              count={count}
              commonCodeList={commonCodeList}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              setAddDialogOpen={setAddDialogOpen}
              onRowClick={handleRowClick}
              defaultSortKey={"commonCodeKey"}
            />
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
