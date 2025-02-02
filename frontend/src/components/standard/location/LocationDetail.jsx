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
import { toaster } from "../../ui/toaster.jsx";

function LocationDetail({ isOpened, onClosed, locationKey, refresh }) {
  const [locationDetail, setLocationDetail] = useState([]);

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
        located: locationDetail.located,
        locationNote: locationDetail.locationNote,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        refresh();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
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
              locationKey={locationKey}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <Box>
            <HStack>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Button onClick={handleCheckClick}>확인</Button>
            </HStack>
          </Box>
          <DialogCloseTrigger onClick={handleClose} />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default LocationDetail;
