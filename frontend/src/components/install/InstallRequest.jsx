import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";
import { HStack, Input } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";

export function InstallRequest({ isOpen, onClose }) {
  const initialInstallRequest = {
    franchiseName: "",
    itemCommonName: "",
    installRequestAmount: "",
    franchiseAddress: "",
    departmentName: "",
    employeeName: "",
    customerName: "",
    installRequestNote: "",
  };
  const [installRequest, setInstallRequest] = useState(initialInstallRequest);

  const handleClose = () => {
    setInstallRequest(initialInstallRequest);
    onClose();
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setInstallRequest((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출고 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field label="가맹점명">
            <Input
              placeholder="가맹점명"
              value={installRequest.franchiseName}
              onChange={handleInputChange("franchiseName")}
            />
          </Field>
          <Field label="품목명">
            <Input
              placeholder="품목명"
              value={installRequest.itemCommonName}
              onChange={handleInputChange("itemCommonName")}
            />
          </Field>
          <Field label="수량">
            <Input
              placeholder="수량"
              value={installRequest.installRequestAmount}
              onChange={handleInputChange("installRequestAmount")}
            />
          </Field>
          <Field label="가맹점 줏소">
            <Input
              placeholder="가맹점 주소"
              value={installRequest.franchiseAddress}
              onChange={handleInputChange("franchiseAddress")}
            />
          </Field>
          <HStack>
            <Field label="부서">
              <Input
                placeholder="부서"
                value={installRequest.departmentName}
                onChange={handleInputChange("departmentName")}
              />
            </Field>
            <Field label="신청자">
              <Input
                placeholder="신청자"
                value={installRequest.employeeName}
                onChange={handleInputChange("employeeName")}
              />
            </Field>
          </HStack>
          <Field label="협력업체">
            <Input
              placeholder="협력업체"
              value={installRequest.customerName}
              onChange={handleInputChange("customerName")}
            />
          </Field>
          <Field label="비고">
            <Input
              placeholder="비고"
              value={installRequest.installRequestNote}
              onChange={handleInputChange("installRequestNote")}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button>출고 요청</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
