import { Flex, Stack } from "@chakra-ui/react";
import { SideBar } from "../../../components/tool/SideBar.jsx";
import { BusinessView } from "../../../components/standard/businessAndDepartment/BusinessView.jsx";
import { BusinessDepartmentList } from "../../../components/standard/businessAndDepartment/BusinessDepartmentList.jsx";

export function BusinessAndDepartment() {
  return (
    <Flex>
      <SideBar />
      <Stack w={"80%"} mx={"auto"}>
        <BusinessView />
        <BusinessDepartmentList />
      </Stack>
    </Flex>
  );
}
