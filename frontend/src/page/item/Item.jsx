import React, { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { ItemMenu } from "../../components/item/ItemMenu.jsx";
import { ItemList } from "../../components/item/ItemList.jsx";
import { ItemAdd } from "../../components/item/ItemAdd.jsx";
import { ItemView } from "../../components/item/ItemView.jsx";

export function Item() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  // 메뉴 선택 시 호출되는 함수
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setShowDetail(false); // 메뉴 변경 시 상세보기 상태 초기화
  };

  // 특정 상품 클릭 시 상세 정보로 이동
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  return (
    <Box>
      <HStack>
        <ItemMenu onSelect={handleSelectMenu} />
        {selectedMenu === "add" && <ItemAdd />}
        {selectedMenu === "list" && !showDetail && (
          <ItemList onShowDetail={handleShowDetail} />
        )}
        {showDetail && <ItemView />}
      </HStack>
    </Box>
  );
}
