import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { SideBar2 } from "../../components/tool/SideBar2.jsx";
import { Button } from "../../components/ui/button.jsx";
import { InstallList } from "../../components/install/InstallList.jsx";
import { InstallRequest } from "../../components/install/InstallRequest.jsx";
import { InstallApprove } from "../../components/install/InstallApprove.jsx";
import { InstallConfiguration } from "../../components/install/InstallConfiguration.jsx";

export function Install() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <SideBar2 />
        <Stack flex={1}>
          <InstallList />
          <Button
            onClick={() => setRequestDialogOpen(true)}
            size="lg"
            position="absolute"
            bottom="100px"
            right="100px"
          >
            출고 요청
          </Button>
        </Stack>
        <InstallRequest
          isOpen={requestDialogOpen}
          onClose={() => setRequestDialogOpen(false)}
        />
        <InstallApprove />
        <InstallConfiguration />
      </HStack>
    </Box>
  );
}
