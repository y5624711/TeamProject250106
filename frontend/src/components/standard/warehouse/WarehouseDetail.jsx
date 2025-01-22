import React, { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import WarehouseEdit from "./WarehouseEdit.jsx";
import { Box, Center, HStack } from "@chakra-ui/react";
import WarehouseView from "./WarehouseView.jsx";

export function WarehouseDetail({ isOpened, onClosed, warehouseKey }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              {isEditing ? (
                <Box>{warehouseKey}번 창고 수정</Box>
              ) : (
                <Box>{warehouseKey}번 창고 상세</Box>
              )}
            </Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            {isEditing ? (
              <Box>
                <WarehouseEdit
                  warehouseKey={warehouseKey}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                />
              </Box>
            ) : (
              <Box>
                <WarehouseView warehouseKey={warehouseKey} />
                <Box>
                  <Center>
                    <HStack>
                      <Button onClick={handleEditClick}>수정</Button>
                      <Button onClick={onClosed}>닫기</Button>
                    </HStack>
                  </Center>
                </Box>
              </Box>
            )}
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
