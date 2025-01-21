import React, { useState } from "react";
import axios from "axios";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box, Center, HStack } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { DialogConfirmation } from "../../tool/DialogConfirmation.jsx";
import LocationEdit from "./LocationEdit.jsx";
import LocationView from "./LocationView.jsx";

function LocationDetail({ isOpened, onClosed, locationKey }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handleDeleteClick() {
    axios.delete(`/api/location/delete/${locationKey}`);
  }

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              {isEditing ? (
                <Box>{locationKey}번 로케이션 수정하기</Box>
              ) : (
                <Box>{locationKey}번 로케이션 상세보기</Box>
              )}
            </Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            {isEditing ? (
              <Box>
                <LocationEdit
                  locationKey={locationKey}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                />
              </Box>
            ) : (
              <Box>
                <LocationView locationKey={locationKey} />
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

export default LocationDetail;
