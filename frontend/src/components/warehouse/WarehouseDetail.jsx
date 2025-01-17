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
              <Button>삭제</Button>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default WarehouseDetail;
