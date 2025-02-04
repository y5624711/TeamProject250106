import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import axios from "axios";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { CommonCodeList } from "../../../components/standard/commonCode/CommonCodeList.jsx";
import { CommonCodeAdd } from "../../../components/standard/commonCode/CommonCodeAdd.jsx";
import { useSearchParams } from "react-router-dom";
import { CommonCodeView } from "../../../components/standard/commonCode/CommonCodeView.jsx";
import { Button } from "../../../components/ui/button.jsx";

export function CommonCode() {
  const [commonCodeKey, setCommonCodeKey] = useState(1);
  const [commonCodeList, setCommonCodeList] = useState([]);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/commonCode/list`, {
        params: searchParams,
      })
      .then((res) => {
        setCommonCodeList(res.data.list || []);
        setCount(res.data.count);
        // setCommonCodeKey(null);
      })
      .catch((error) => {
        console.error("품목 공통 코드 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  // 코드 등록 시 리스트 변경, 다이얼로그 닫기
  const handleAddCommonCode = (newCode) => {
    setCommonCodeList((prevCodes) => [newCode, ...prevCodes]);
    setAddDialogOpen(false);
  };

  // 코드 선택 시 해당 코드 정보 보여주기
  const handleRowClick = (code) => {
    setCommonCodeKey(code);
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
          <CommonCodeList
            count={count}
            commonCodeList={commonCodeList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setCommonCodeKey={setCommonCodeKey}
            onRowClick={handleRowClick}
          />
          <Box display="flex" justifyContent="flex-end" mt={"-65px"}>
            <Button onClick={() => setAddDialogOpen(true)} size="lg">
              코드 등록
            </Button>
          </Box>
        </Stack>
        <CommonCodeView
          commonCodeKey={commonCodeKey}
          isOpen={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          setChange={setChange}
          setCommonCodeKey={setCommonCodeKey}
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
