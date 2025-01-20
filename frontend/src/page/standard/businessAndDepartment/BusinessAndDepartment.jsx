import { Flex, Stack } from "@chakra-ui/react";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { BusinessView } from "../../../components/standard/businessAndDepartment/BusinessView.jsx";
import { BusinessDepartmentList } from "../../../components/standard/businessAndDepartment/BusinessDepartmentList.jsx";

export function BusinessAndDepartment() {
  return (
    <Flex>
      <StandardSideBar />
      <Stack w={"80%"} mx={"auto"}>
        <BusinessView />
        <BusinessDepartmentList />
      </Stack>
    </Flex>
  );
}
