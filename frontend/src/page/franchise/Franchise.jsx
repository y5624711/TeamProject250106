import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { FranchiseSideBar } from "../../components/franchise/FranchiseSideBar.jsx";

export function Franchise() {
  return (
    <Box display={"flex"} h={"100vh"}>
      {/* 사이드바 */}
      <FranchiseSideBar />

      {/* 메인 컨텐츠 영역 */}
      <Box flex={"1"} display={"flex"} p={4}>
        {/* 왼쪽: 리스트 */}
        <Box flex={"1"} borderRight={"1px solid #e0e0e0"} pr={4}>
          <Heading size="md" mb={4}>
            가맹점 조회
          </Heading>
          <FranchiseList />
        </Box>

        {/* 오른쪽: 등록 */}
        <Box flex={"1"} pl={4}>
          <Heading size="md" mb={4}>
            가맹점 등록
          </Heading>
          <FranchiseAdd />
        </Box>
      </Box>
    </Box>
  );
}
