import { Box, HStack, Stack } from "@chakra-ui/react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { BusinessAndEmployeeList } from "../../components/businessAndDepartment/BusinessAndEmployeeList.jsx";

export function BusinessAndEmployee() {
  return (
    <Box>
      <HStack>
        <SideBar />
        <Stack>
          <BusinessAndEmployeeList />
        </Stack>
      </HStack>
    </Box>
  );
}
