import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { StateSideBar } from "../../../components/tool/sidebar/StateSideBar.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { InstallList } from "../../../components/state/install/InstallList.jsx";
import { InstallRequest } from "../../../components/state/install/InstallRequest.jsx";
import { InstallApprove } from "../../../components/state/install/InstallApprove.jsx";
import { InstallConfiguration } from "../../../components/state/install/InstallConfiguration.jsx";

export function Install() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StateSideBar />
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
