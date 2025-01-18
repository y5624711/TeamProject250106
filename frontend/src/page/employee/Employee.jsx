import { Box } from "@chakra-ui/react";
import { EmployeeAdd } from "../../components/employee/EmployeeAdd.jsx";
import { AccountSideBar } from "../../components/employee/AccountSideBar.jsx";
import React, { useEffect, useState } from "react";
import { EmployeeList } from "../../components/employee/EmployeeList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

export function Employee() {
  const [selectedEmployeeNo, setSelectedEmployeeNo] = useState(-1);
  const [addCheck, setAddChecck] = useState(false);

  useEffect(() => {}, [selectedEmployeeNo, addCheck]);

  const handleSelectedNo = (selectedEmployeeNo) => {
    setSelectedEmployeeNo(selectedEmployeeNo);
  };

  const handleAddCheck = () => {
    setAddChecck(!addCheck);
  };

  return (
    <Box display={"flex"}>
      <SideBar />
      <EmployeeList
        onSelect={handleSelectedNo}
        updateList={addCheck}
        viewKey={selectedEmployeeNo}
      />
      {/*viewKey={selectedEmployeeNo}*/}
      {/*onChange={handleAddCheck}*/}
      {/*onSelect={handleSelectedNo}*/}
      {/*<EmployeeAdd*/}
      {/*  viewKey={selectedEmployeeNo}*/}
      {/*  onChange={handleAddCheck}*/}
      {/*  onSelect={handleSelectedNo}*/}
      {/*/>*/}
    </Box>
  );
}
