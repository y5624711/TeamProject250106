import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/root/Navbar.jsx";
import { LoginCheck } from "../main/LoginCheck.jsx";

export function RootLayout() {
  return (
    <Stack>
      <Box height="100vh" display="flex" flexDirection="column">
        <Box>
          <Navbar />
          <LoginCheck />
        </Box>
        <Box flex="1" overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
}
