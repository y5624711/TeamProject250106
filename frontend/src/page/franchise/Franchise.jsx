import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseView } from "../../components/franchise/FranchiseView.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";
import axios from "axios";

export function Franchise() {
  const [viewMode, setViewMode] = useState("view");
  const [franchises, setFranchises] = useState([]);
  const [selectedFranchiseKey, setSelectedFranchiseKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 가맹점 목록을 가져와서 첫 번째 가맹점의 franchiseKey를 기본값으로 설정
  useEffect(() => {
    axios
      .get("/api/franchise/list")
      .then((response) => {
        setFranchises(response.data.list); // 가맹점 목록 업데이트
        if (response.data.list && response.data.list.length > 0) {
          setSelectedFranchiseKey(response.data.list[0].franchiseKey); // 첫 번째 가맹점 선택
        }
      })
      .catch((error) => {
        console.error("가맹점 데이터를 불러오는 데 실패했습니다:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // 가맹점 클릭 시 선택된 franchiseKey를 상태로 설정
  const handleFranchiseClick = (franchiseKey) => {
    setSelectedFranchiseKey(franchiseKey);
    setViewMode("view");
  };

  return (
    <Box display={"flex"} h={"100vh"}>
      <SideBar />
      <Box flex={"1"} display={"flex"} p={4}>
        <Box flex={"1"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 조회
          </Heading>
          <FranchiseList
            onFranchiseClick={handleFranchiseClick}
            franchises={franchises}
          />
        </Box>
        <Box flex={"1"} pl={4}>
          <Button colorScheme="teal" onClick={() => setViewMode("add")} mb={4}>
            추가
          </Button>
          {/* 로딩 상태에 따른 조건부 렌더링 */}
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {viewMode === "add" && (
                <FranchiseAdd
                  setViewMode={setViewMode} // 상태 변경 함수 전달
                  setSelectedFranchiseKey={setSelectedFranchiseKey} // 선택된 가맹점 키 설정 함수 전달
                  setFranchises={setFranchises}
                />
              )}
              {viewMode === "view" && selectedFranchiseKey && (
                <FranchiseView
                  franchiseKey={selectedFranchiseKey}
                  setViewMode={setViewMode} // 상태 변경 함수 전달
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
