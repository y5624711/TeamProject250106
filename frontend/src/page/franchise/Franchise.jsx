import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { FranchiseList } from "../../components/franchise/FranchiseList.jsx";
import { FranchiseAdd } from "../../components/franchise/FranchiseAdd.jsx";
import { FranchiseSideBar } from "../../components/franchise/FranchiseSideBar.jsx";

export function Franchise() {
  const [selectedMenu, setSelectedMenu] = useState("list");
  const [, set] = useState();

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {}, [selectedMenu]);

  return (
    <Box display={"flex"}>
      <FranchiseSideBar onSelect={handleSelectMenu} />
      {selectedMenu === "list" && <FranchiseList />}
      {selectedMenu === "add" && <FranchiseAdd />}
    </Box>
  );
}
