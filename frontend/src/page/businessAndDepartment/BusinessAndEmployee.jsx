import { Box, Flex, Stack } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessView } from "../../components/businessAndDepartment/BusinessAndEmployeeList.jsx";
import { BusinessEmployeeList } from "../../components/businessAndDepartment/BusinessEmployeeList.jsx";

export function BusinessAndEmployee() {
  return (
    <Box>
      <Flex>
        <SideBar />
        <Stack>
          <BusinessView />
          <BusinessEmployeeList />
        </Stack>
      </Flex>
    </Box>
  );
}
