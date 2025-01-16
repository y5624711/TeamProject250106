import { Box, Flex } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessView } from "../../components/businessAndDepartment/BusinessView.jsx";
import { BusinessEmployeeList } from "../../components/businessAndDepartment/BusinessEmployeeList.jsx";

export function BusinessAndEmployee() {
  return (
    <Box>
      <Flex>
        <SideBar />
        <BusinessEmployeeList />
        <Box ml="auto" height="auto">
          <BusinessView />
        </Box>
      </Flex>
    </Box>
  );
}
