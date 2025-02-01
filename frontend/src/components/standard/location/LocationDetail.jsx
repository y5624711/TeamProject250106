import React, { useEffect, useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box, HStack } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import LocationView from "./LocationView.jsx";
import axios from "axios";
import { DialogEditConfirmation } from "../../tool/DialogEditConfirmation.jsx";
import { toaster } from "../../ui/toaster.jsx";

function LocationDetail({ isOpened, onClosed, locationKey }) {
  const [locationDetail, setLocationDetail] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setLocationDetail([]);
    onClosed();
  };

  useEffect(() => {
    if (locationKey) {
      axios
        .get(`/api/location/view/${locationKey}`)
        .then((res) => {
          setLocationDetail(res.data);
        })
        .catch((error) => {
          console.error("로케이션 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [locationKey, onClosed]);

  function handleCheckClick() {
    axios
      .put(`/api/location/edit`, {
        locationKey,
        warehouseCode: locationDetail.warehouseCode,
        itemCommonCode: locationDetail.itemCommonCode,
        locationNote: locationDetail.locationNote,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        handleClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
    setLocationDetail([]);
  }

  useEffect(() => {
    if (!isOpened) {
      handleClose(); // 다이얼로그가 닫히면 항상 초기화
    }
  }, [isOpened]);

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>로케이션 상세</Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <LocationView
              locationDetail={locationDetail}
              setLocationDetail={setLocationDetail}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <Box>
            <HStack>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Button onClick={() => setIsDialogOpen(true)}>확인</Button>
            </HStack>
          </Box>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogFooter>
        <DialogEditConfirmation
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleCheckClick}
          title="확인"
          body="변경된 사항은 저장됩니다."
        />
      </DialogContent>
    </DialogRoot>
  );
}

export default LocationDetail;
