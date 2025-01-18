import React, { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import WarehouseView from "./WarehouseView.jsx";
import WarehouseEdit from "./WarehouseEdit.jsx";
import { Button } from "../ui/button.jsx";
import axios from "axios";
import { DialogConfirmation } from "../tool/DialogConfirmation.jsx";

function WarehouseDetail({ warehouseKey }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handleDeleteClick() {
    axios.delete(`/api/warehouse/delete/${warehouseKey}`);
  }

  return (
    <Box>
      {isEditing ? (
        <WarehouseEdit
          warehouseKey={warehouseKey}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ) : (
        <Box>
          <WarehouseView warehouseKey={warehouseKey} />
          <Box>
            <HStack>
              <Button onClick={handleEditClick}>수정</Button>
              <Button onClick={() => setIsDialogOpen(true)}>삭제</Button>
            </HStack>
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
  );
}

export default WarehouseDetail;
