import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Button } from "../../components/ui/button.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { ItemCommonCodeList } from "../../components/commonCode/ItemCommonCodeList.jsx";
import { ItemCommonCodeAdd } from "../../components/commonCode/ItemCommonCodeAdd.jsx";
import { ItemCommonCodeView } from "../../components/commonCode/ItemCommonCodeView.jsx";

export function ItemCommonCode() {
  const [selectedPage, setSelectedPage] = useState("view");
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [itemCommonCodeKey, setItemCommonCodeKey] = useState(1);

  // 물품 공통 코드 정보를 가져오기
  useEffect(() => {
    axios
      .get(`/api/commonCode/item/list`)
      .then((res) => {
        setItemCommonCodeList(res.data || []);
        setItemCommonCodeKey(res.data[0].itemCommonCodeKey);
      })
      .catch((error) => {
        console.error("물품 구분 코드 정보 요청 중 오류 발생: ", error);
      });
  }, []);

  const handleSelectPage = (page) => {
    setSelectedPage(page);
  };

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          공통코드 관리 > 품목 코드
          <ItemCommonCodeList
            itemCommonCodeList={itemCommonCodeList}
            itemCommonCodeKey={itemCommonCodeKey}
          />
        </Stack>
        <Stack>
          {selectedPage === "view" && (
            <Button onClick={() => handleSelectPage("add")}>추가</Button>
          )}
          {selectedPage === "add" ? (
            <ItemCommonCodeAdd />
          ) : (
            <ItemCommonCodeView />
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
