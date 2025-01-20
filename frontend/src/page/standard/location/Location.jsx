import React, { useState } from "react";
import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import LocationAdd from "../../../components/location/LocationAdd.jsx";
import LocationSearch from "../../../components/location/LocationSearch.jsx";

function Location(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Box>
      <HStack align="flex-start">
        <StandardSideBar />
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
