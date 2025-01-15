import { Box, HStack, Stack } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessView } from "../../components/businessAndDepartment/BusinessAndEmployeeList.jsx";
import { EmployeeList } from "../../components/businessAndDepartment/EmployeeList.jsx";

export function BusinessAndEmployee() {
  return (
    <Box>
      <HStack>
        <SideBar />
        <Stack>
          <BusinessView />
          <EmployeeList />
        </Stack>
      </HStack>
    </Box>
  );
}
