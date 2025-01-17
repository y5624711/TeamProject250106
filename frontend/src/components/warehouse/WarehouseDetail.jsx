import React, { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import WarehouseView from "./WarehouseView.jsx";
import WarehouseEdit from "./WarehouseEdit.jsx";
import { Button } from "../ui/button.jsx";

function WarehouseDetail({ warehouseKey }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handleSaveClick() {
    setIsEditing(!isEditing);
  }

  function handleCancelClick() {
    setIsEditing(!isEditing);
  }

  return (
    <Box>
      {isEditing ? (
        <Box>
          <WarehouseEdit warehouseKey={warehouseKey} />
          <Box>
            <HStack>
              <Button onClick={handleSaveClick}>저장</Button>
              <Button onClick={handleCancelClick}>취소</Button>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Box>
          <WarehouseView warehouseKey={warehouseKey} />
          <Box>
            <HStack>
              <Button onClick={handleEditClick}>수정</Button>
              <Button>삭제</Button>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default WarehouseDetail;
