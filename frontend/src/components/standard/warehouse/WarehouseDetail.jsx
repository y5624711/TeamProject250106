import React from "react";
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
import { Box, Center, HStack } from "@chakra-ui/react";
import WarehouseView from "./WarehouseView.jsx";

export function WarehouseDetail({ isOpened, onClosed, warehouseKey }) {
  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              <Box>창고 상세</Box>
            </Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <WarehouseView warehouseKey={warehouseKey} />
            <Box>
              <Center>
                <HStack>
                  <Button>확인</Button>
                  <Button onClick={onClosed}>닫기</Button>
                </HStack>
              </Center>
            </Box>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
