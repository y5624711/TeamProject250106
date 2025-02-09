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
import { Box, HStack, Spinner } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import LocationView from "./LocationView.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

function LocationDetail({
  isOpened,
  onClosed,
  locationKey,
  refresh,
  setLocationKey,
}) {
  const [locationDetail, setLocationDetail] = useState([]);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setLocationDetail([]);
    setLocationKey(null);
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
  }, [locationKey]);

  function handleCheckClick() {
    axios
      .put(`/api/location/edit`, {
        locationKey,
        locationNote: locationDetail.locationNote,
        locationActive: locationDetail.locationActive,
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
  }, [isOpened, onClosed]);

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>로케이션 정보</Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            {locationDetail.shelf == null ? (
              <Spinner />
            ) : (
              <LocationView
                locationDetail={locationDetail}
                setLocationDetail={setLocationDetail}
                locationKey={locationKey}
              />
            )}
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
