import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { ItemCommonCodeList } from "../../components/commonCode/ItemCommonCodeList.jsx";
import { ItemCommonCodeAdd } from "../../components/commonCode/ItemCommonCodeAdd.jsx";
import { ItemCommonCodeView } from "../../components/commonCode/ItemCommonCodeView.jsx";
import { useSearchParams } from "react-router-dom";

export function ItemCommonCode() {
  const [selectedPage, setSelectedPage] = useState("view");
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [itemCommonCodeKey, setItemCommonCodeKey] = useState(1);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams("");

  // 품목 공통 코드 목록 가져오기
  useEffect(() => {
    axios
      .get(`/api/commonCode/item/list`, {
        params: searchParams,
      })
      .then((res) => {
        setItemCommonCodeList(res.data.list || []);
        setCount(res.data.count);
        setItemCommonCodeKey(res.data.list[0].itemCommonCodeKey);
      })
      .catch((error) => {
        console.error("품목 공통 코드 목록 요청 중 오류 발생: ", error);
      });
  }, [searchParams, change]);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  const handleAddItemCommonCode = (newItem) => {
    setItemCommonCodeList((prevItems) => [newItem, ...prevItems]);
    handleSelectPage("view");
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          공통코드 관리 > 품목 코드
          <ItemCommonCodeList
            count={count}
            itemCommonCodeList={itemCommonCodeList}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setItemCommonCodeKey={setItemCommonCodeKey}
          />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}
          {selectedPage === "add" ? (
            <ItemCommonCodeAdd
              onCancel={() => {
                handleSelectPage("view");
                setItemCommonCodeKey(itemCommonCodeKey);
              }}
              onAdd={handleAddItemCommonCode}
              setItemCommonCodeKey={setItemCommonCodeKey}
              setChange={setChange}
            />
          ) : (
            <ItemCommonCodeView
              itemCommonCodeKey={itemCommonCodeKey}
              setItemCommonCodeList={setItemCommonCodeList}
              setSearchParams={setSearchParams}
              setChange={setChange}
            />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
