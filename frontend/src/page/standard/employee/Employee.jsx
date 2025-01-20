import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { EmployeeList } from "../../../components/standard/employee/EmployeeList.jsx";
import { SideBar } from "../../../components/tool/SideBar.jsx";

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
      <SideBar />
      <EmployeeList
        onSelect={handleSelectedNo}
        updateList={addCheck}
        viewKey={selectedEmployeeNo}
        onChange={handleAddCheck}
      />
      {/* 혹시몰라 남겨놈*/}
      {/*<EmployeeAdd*/}
      {/*  viewKey={selectedEmployeeNo}*/}
      {/*  onChange={handleAddCheck}*/}
      {/*  onSelect={handleSelectedNo}*/}
      {/*/>*/}
    </Box>
  );
}
