import { Flex, Stack } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessView } from "../../components/businessAndDepartment/BusinessView.jsx";
import { BusinessEmployeeList } from "../../components/businessAndDepartment/BusinessEmployeeList.jsx";

export function BusinessAndEmployee() {
  return (
    <Flex>
      <SideBar />
      <Stack w={"60%"}>
        <BusinessView />
        <BusinessEmployeeList />
      </Stack>
    </Flex>
  );
}
