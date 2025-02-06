import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { Field } from "../../ui/field.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { toaster } from "../../ui/toaster.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function MainWarehouseViewEndEdit({
  company,
  warehouseViewOpen,
  onCancel,
}) {
  const [warehouse, setWarehouse] = useState();
  const [savedWarehouse, setSavedWarehouse] = useState();
  const [updateCheck, setUpdateCheck] = useState(false);

  useEffect(() => {
    axios
      .get(`api/main/mainWarehouseView/${company}`)
      .then((res) => res.data)
      .then((data) => {
        setWarehouse(data);
        setSavedWarehouse(data);
      })
      .finally(() => setUpdateCheck(false));
  }, [updateCheck]);

  let disabled = false;
  if (warehouse != null) {
    disabled = !(
      warehouse.warehouseName.trim().length > 0 &&
      warehouse.warehouseTel.trim().length > 0 &&
      warehouse.warehouseAddress.trim().length > 0 &&
      warehouse.warehousePost.trim().length > 0 &&
      warehouse.warehouseState.trim().length > 0
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouse((prevWare) => ({
      ...prevWare,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setWarehouse(savedWarehouse);
    onCancel();
  };

  const handleUpdate = () => {
    axios
      .put("/api/main/mainWarehouseUpdate", {
        warehouseName: warehouse.warehouseName,
        customerCode: company,
        warehouseTel: warehouse.warehouseTel,
        warehousePost: warehouse.warehousePost,
        warehouseState: warehouse.warehouseState,
        warehouseCity: warehouse.warehouseCity,
        warehouseAddress: warehouse.warehouseAddress,
        warehouseAddressDetail: warehouse.warehouseAddressDetail,
        warehouseNote: warehouse.warehouseNote,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setUpdateCheck(true);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  return (
    <DialogRoot open={warehouseViewOpen} size="lg" onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>
              <Box>창고 정보</Box>
            </Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          css={{ "--field-label-width": "85px" }}
        >
          {warehouse ? (
            <>
              <Field
                label={<SpacedLabel text="창고" />}
                orientation="horizontal"
              >
                <Input
                  name={"warehouseName"}
                  value={warehouse.warehouseName || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field
                label={<SpacedLabel text="창고 코드" />}
                orientation="horizontal"
              >
                <Input
                  value={warehouse.warehouseCode || ""}
                  readOnly
                  variant={"subtle"}
                />
              </Field>
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="담당 업체" />}
                  orientation="horizontal"
                >
                  <Input
                    value={warehouse.customerName || ""}
                    readOnly
                    variant={"subtle"}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="업체 코드" />}
                  orientation="horizontal"
                >
                  <Input
                    value={warehouse.customerCode || ""}
                    variant={"subtle"}
                    readOnly
                  />
                </Field>
              </Box>
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="관리자" />}
                  orientation="horizontal"
                >
                  <Input
                    value={warehouse.employeeName || ""}
                    variant={"subtle"}
                    readOnly
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="사번" />}
                  orientation="horizontal"
                >
                  <Input
                    value={warehouse.customerEmployeeNo || ""}
                    variant={"subtle"}
                    readOnly
                  />
                </Field>
              </Box>

              <Field
                label={<SpacedLabel text="전화번호" />}
                orientation="horizontal"
              >
                <Input
                  name={"warehouseTel"}
                  value={warehouse.warehouseTel || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field
                label={<SpacedLabel text="우편번호" />}
                orientation="horizontal"
              >
                <Input
                  name={"warehousePost"}
                  value={warehouse.warehousePost || ""}
                  onChange={handleInputChange}
                />
              </Field>

              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="광역시도" />}
                  orientation="horizontal"
                >
                  <Input
                    name={"warehouseState"}
                    value={warehouse.warehouseState || ""}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field
                  label={<SpacedLabel text="시군" />}
                  orientation="horizontal"
                >
                  <Input
                    name={"warehouseCity"}
                    value={warehouse.warehouseCity || ""}
                    onChange={handleInputChange}
                  />
                </Field>
              </Box>
              <Field
                label={<SpacedLabel text="주소" />}
                orientation="horizontal"
              >
                <Input
                  name={"warehouseAddress"}
                  value={warehouse.warehouseAddress || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field
                label={<SpacedLabel text="상세주소" />}
                orientation="horizontal"
              >
                <Input
                  name={"warehouseAddressDetail"}
                  value={warehouse.warehouseAddressDetail || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field
                label={<SpacedLabel text="비고" />}
                orientation="horizontal"
              >
                <Textarea
                  style={{ maxHeight: "100px" }}
                  placeholder="최대 50자"
                  name="warehouseNote"
                  value={warehouse.warehouseNote || ""}
                  onChange={handleInputChange}
                />
              </Field>
            </>
          ) : (
            <Text>고객 정보를 불러오는 중입니다..</Text>
          )}
        </DialogBody>
        <DialogFooter>
          <HStack>
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
            </DialogActionTrigger>
            <Tooltip
              content="입력을 완료해 주세요."
              openDelay={500}
              closeDelay={100}
              disabled={!disabled}
            >
              <Button disabled={disabled} onClick={handleUpdate}>
                확인
              </Button>
            </Tooltip>
          </HStack>
          <DialogCloseTrigger />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
