import { Box, Flex, Stack } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessView } from "../../components/businessAndDepartment/BusinessView.jsx";
import { BusinessDepartmentList } from "../../components/businessAndDepartment/BusinessDepartmentList.jsx";

function DepartmentView() {
  return <Box w={"200px"} bgColor={"black"}></Box>;
}

export function BusinessAndDepartment() {
  return (
    <Flex>
      <SideBar />
      <Stack w={"60%"}>
        <BusinessView />
        <BusinessDepartmentList />
      </Stack>
      <Stack>
        <DepartmentView />
      </Stack>
    </Flex>
  );
}
