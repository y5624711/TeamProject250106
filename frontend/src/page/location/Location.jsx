import React, { useState } from "react";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Box, HStack, Stack } from "@chakra-ui/react";
import LocationSearch from "../../components/location/LocationSearch.jsx";
import { Button } from "../../components/ui/button.jsx";
import LocationAdd from "../../components/location/LocationAdd.jsx";

function Location(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          <HStack>
            로케이션 관리
            <Box>
              <Button width="120px" onClick={() => setIsAddDialogOpen(true)}>
                새 로케이션 등록
              </Button>
            </Box>
            {/*등록 jsx*/}
            <LocationAdd
              isOpen={isAddDialogOpen}
              onClose={() => setIsAddDialogOpen(false)}
              onConfirm={() => setIsAddDialogOpen(false)}
              title="새 로케이션 등록"
            />
          </HStack>
          <LocationSearch />
        </Stack>
      </HStack>
    </Box>
  );
}

export default Location;
