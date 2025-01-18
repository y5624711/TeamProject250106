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

export function WarehouseDetail({ isOpen, onClose, warehouseKey }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handleDeleteClick() {
    axios.delete(`/api/warehouse/delete/${warehouseKey}`);
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{warehouseKey}번 창고</DialogTitle>
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
          <DialogCloseTrigger onClick={onClose} />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
