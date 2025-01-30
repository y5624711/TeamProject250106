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
import WarehouseView from "./WarehouseView.jsx";
import { Button } from "../../ui/button.jsx";
import { DialogEditConfirmation } from "../../tool/DialogEditConfirmation.jsx";
import axios from "axios";

export function WarehouseDetail({ isOpened, onClosed, warehouseKey }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [warehouseDetail, setWarehouseDetail] = useState([]);

  useEffect(() => {
    if (warehouseKey) {
      axios
        .get(`/api/warehouse/view/${warehouseKey}`)
        .then((res) => {
          setWarehouseDetail(res.data);
        })
        .catch((error) => {
          console.error("창고 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [warehouseKey]);

  function handleCheckClick() {
    axios.put(`/api/warehouse/edit`, {
      warehouseKey,
      warehouseName: warehouseDetail.warehouseName,
      customerCode: warehouseDetail.customerCode,
      warehouseAddress: warehouseDetail.warehouseAddress,
      warehouseAddressDetail: warehouseDetail.warehouseAddressDetail,
      warehousePost: warehouseDetail.warehousePost,
      warehouseState: warehouseDetail.warehouseState,
      warehouseCity: warehouseDetail.warehouseCity,
      customerEmployeeNo: warehouseDetail.customerEmployeeNo,
      warehouseTel: warehouseDetail.warehouseTel,
      warehouseActive: warehouseDetail.warehouseActive,
      warehouseNote: warehouseDetail.warehouseNote,
    });
    onClosed();
  }

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              <Box>창고 상세</Box>
            </Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <WarehouseView
              warehouseDetail={warehouseDetail}
              setWarehouseDetail={setWarehouseDetail}
            />
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
          <HStack>
            <Button onClick={onClosed}>닫기</Button>
            <Button onClick={() => setIsDialogOpen(true)}>확인</Button>
          </HStack>
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
