import { Flex, Stack } from "@chakra-ui/react";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import { BusinessView } from "../../../components/standard/businessAndDepartment/BusinessView.jsx";
import { BusinessDepartmentList } from "../../../components/standard/businessAndDepartment/BusinessDepartmentList.jsx";

export function BusinessAndDepartment() {
  return (
    <Flex>
      <StandardSideBar />
      <Stack mx={"auto"} pl={"40px"} pr={"40px"} w={"100%"}>
        <BusinessView />
        <BusinessDepartmentList />
      </Stack>
    </Flex>
  );
}
