import React, { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import WarehouseEdit from "./WarehouseEdit.jsx";
import { Box, Center, HStack } from "@chakra-ui/react";
import WarehouseView from "./WarehouseView.jsx";
import { DialogConfirmation } from "../tool/DialogConfirmation.jsx";

export function WarehouseDetail({ isOpened, onClosed, warehouseKey }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handleDeleteClick() {
    axios.delete(`/api/warehouse/delete/${warehouseKey}`);
  }

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              {isEditing ? (
                <Box>{warehouseKey}번 창고 수정하기</Box>
              ) : (
                <Box>{warehouseKey}번 창고 상세보기</Box>
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
                      <Button onClick={() => setIsDialogOpen(true)}>
                        삭제
                      </Button>
                    </HStack>
                  </Center>
                </Box>
                <DialogConfirmation
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onConfirm={handleDeleteClick}
                  title="삭제 확인"
                  body="정말로 이 항목을 삭제하시겠습니까?"
                />
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
