import { Box } from "@chakra-ui/react";
import { AccountAdd } from "../../components/account/AccountAdd.jsx";
import { AccountSideBar } from "../../components/account/AccountSideBar.jsx";
import React from "react";
import { AccountList } from "../../components/account/AccountList.jsx";

// 왼쪽 탭에 따라서 > 오른쪽을 다르게 보이게 할건가 ?
export function Account() {
  return (
    <Box display={"flex"}>
      <AccountSideBar />
      <AccountList />
      <AccountAdd />
    </Box>
  );
}
