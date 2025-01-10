import { Box } from "@chakra-ui/react";
import { AccountAdd } from "../../components/account/AccountAdd.jsx";
import { AccountSideBar } from "../../components/account/AccountSideBar.jsx";
import React, { useEffect, useState } from "react";
import { AccountList } from "../../components/account/AccountList.jsx";

// 왼쪽 탭에 따라서 > 오른쪽을 다르게 보이게 할건가 ?
export function Account() {
  const [selectedMenu, setSelectedMenu] = useState("list");
  const [, set] = useState();

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {}, [selectedMenu]);

  return (
    <Box display={"flex"}>
      <AccountSideBar onSelect={handleSelectMenu} />
      {selectedMenu === "list" && <AccountList />}
      {selectedMenu === "add" && <AccountAdd />}
    </Box>
  );
}
