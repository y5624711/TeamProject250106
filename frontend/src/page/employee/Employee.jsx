import { Box } from "@chakra-ui/react";
import { EmployeeAdd } from "../../components/employee/EmployeeAdd.jsx";
import { AccountSideBar } from "../../components/employee/AccountSideBar.jsx";
import React, { useEffect, useState } from "react";
import { EmployeeList } from "../../components/employee/EmployeeList.jsx";
import { SideBar } from "../../components/tool/SideBar.jsx";

// 왼쪽 탭에 따라서 > 오른쪽을 다르게 보이게 할건가 ?
export function Employee() {
  const [selectedMenu, setSelectedMenu] = useState("list");
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
      {selectedMenu === "list" && (
        <EmployeeList onSelect={handleSelectedNo} updateList={addCheck} />
      )}
      <EmployeeAdd
        viewKey={selectedEmployeeNo}
        onChange={handleAddCheck}
        onSelect={handleSelectedNo}
      />
    </Box>
  );
}
