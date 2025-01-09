import React, { useState } from "react";
import { BranchAdd } from "../../components/branch/BranchAdd";
import { BranchList } from "../../components/branch/BranchList";
import { BranchView } from "../../components/branch/BranchView";
import { Text, VStack } from "@chakra-ui/react";

export function Branch() {
  const [activeComponent, setActiveComponent] = useState("add"); // 기본값: BranchAdd

  return (
    <div>
      <VStack>
        <Text>가맹점 관리</Text>
        <button onClick={() => setActiveComponent("add")}>가맹점 등록</button>
        <button onClick={() => setActiveComponent("list")}>가맹점 조회</button>
      </VStack>

      <div>
        {activeComponent === "add" && <BranchAdd />}
        {activeComponent === "list" && <BranchList />}
        {activeComponent === "view" && <BranchView id={1} />} {/* 임시 ID */}
      </div>
    </div>
  );
}
