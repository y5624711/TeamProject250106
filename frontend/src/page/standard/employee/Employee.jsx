import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { EmployeeList } from "../../../components/standard/employee/EmployeeList.jsx";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";

export function Employee() {
  const [selectedEmployeeNo, setSelectedEmployeeNo] = useState(-1);
  const [addCheck, setAddCheck] = useState(false);

  useEffect(() => {}, [selectedEmployeeNo, addCheck]);

  //  클릭리스트 키값 기억하는 버튼
  const handleSelectedNo = (selectedEmployeeNo) => {
    setSelectedEmployeeNo(selectedEmployeeNo);
  };

  // 추가시 화면 리렌더용
  const handleAddCheck = () => {
    setAddCheck(!addCheck);
  };

  return (
    <Box display={"flex"}>
      <StandardSideBar />
      <Box p={5}>
        <Heading>기준정보관리 {">"} 인사관리</Heading>
        <EmployeeList
          onSelect={handleSelectedNo}
          updateList={addCheck}
          viewKey={selectedEmployeeNo}
          onChange={handleAddCheck}
        />
      </Box>
    </Box>
  );
}
