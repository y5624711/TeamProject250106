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
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function WarehouseDetail({ isOpened, onClosed, warehouseKey, refresh }) {
  const [warehouseDetail, setWarehouseDetail] = useState([]);

  useEffect(() => {
    if (warehouseKey) {
      axios
        .get(`/api/warehouse/view/${warehouseKey}`)
        .then((res) => {
          console.log(res.data);
          setWarehouseDetail(res.data);
        })
        .catch((error) => {
          console.error("창고 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [warehouseKey, onClosed]);

  function handleCheckClick() {
    axios
      .put(`/api/warehouse/edit`, {
        warehouseKey,
        warehouseCode: warehouseDetail.warehouseCode,
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

  //유효성 검사
  const validate = () => {
    return (
      warehouseDetail.warehouseName != "" &&
      warehouseDetail.warehousePost != "" &&
      warehouseDetail.warehouseState != "" &&
      warehouseDetail.warehouseCity != "" &&
      warehouseDetail.warehouseAddress != "" &&
      warehouseDetail.warehouseTel != ""
    );
  };

  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              <Box>창고 정보</Box>
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
          <HStack>
            <Button variant="outline" onClick={onClosed}>
              취소
            </Button>
            <Tooltip
              content="입력을 완료해 주세요."
              openDelay={100}
              closeDelay={100}
              disabled={validate()}
            >
              <Button onClick={handleCheckClick} disabled={!validate()}>
                확인
              </Button>
            </Tooltip>
          </HStack>
        </DialogFooter>
        <DialogCloseTrigger onClick={onClosed} />
      </DialogContent>
    </DialogRoot>
  );
}
