import React, { useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseSideBar } from "../../components/franchise/FranchiseSideBar.jsx";
import { FranchiseView } from "../../components/franchise/FranchiseView.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { FranchiseEdit } from "../../components/franchise/FranchiseEdit.jsx";

export function Franchise() {
  const [viewMode, setViewMode] = useState("view");
  const [selectedFranchiseKey, setSelectedFranchiseKey] = useState(null);

  // 가맹점 클릭 시 선택된 franchiseKey를 상태로 설정
  const handleFranchiseClick = (franchiseKey) => {
    setSelectedFranchiseKey(franchiseKey);
    setViewMode("view");
  };

  return (
    <Box display={"flex"} h={"100vh"}>
      <FranchiseSideBar />
      <Box flex={"1"} display={"flex"} p={4}>
        <Box flex={"1"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 조회
          </Heading>
          <FranchiseList onFranchiseClick={handleFranchiseClick} />
        </Box>
        <Box flex={"1"} pl={4}>
          <Button colorScheme="teal" onClick={() => setViewMode("add")} mb={4}>
            추가
          </Button>
          {/* viewMode에 따라 컴포넌트 변경 */}
          {viewMode === "add" && (
            <FranchiseAdd
              setViewMode={setViewMode} // 상태 변경 함수 전달
              setSelectedFranchiseKey={setSelectedFranchiseKey} // 선택된 가맹점 키 설정 함수 전달
            />
          )}
          {viewMode === "view" && selectedFranchiseKey && (
            <FranchiseView
              franchiseKey={selectedFranchiseKey}
              setViewMode={setViewMode} // 상태 변경 함수 전달
            />
          )}
          {viewMode === "edit" && selectedFranchiseKey && (
            <FranchiseEdit franchiseKey={selectedFranchiseKey} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
