import React, { useEffect, useState } from "react";
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
import { Button } from "../../ui/button.jsx";
import {
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

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
  const [installItemList, setInstallItemList] = useState([]);
  const [installRequest, setInstallRequest] = useState(initialInstallRequest);

  useEffect(() => {
    console.log(installItemList);
    console.log(installRequest);
  }, [installRequest]);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setInstallRequest(initialInstallRequest);
    onClose();
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setInstallRequest((prev) => ({ ...prev, [field]: value }));
  };

  // 사용중인 품목명, 품목 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/install/commonCode")
      .then((res) => setInstallItemList(res.data))
      .catch((error) => console.error("데이터 로딩 중 오류 발생:", error));
  }, []);

  // 설치 요청하기
  const handleRequsetClick = () => {
    axios
      .post("/api/install/request", installRequest)
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
          <SelectRoot
            onValueChange={(e) => {
              const selectedItem = installItemList.find(
                (item) => item.item_common_name === e.value[0],
              );
              console.log(selectedItem);
              if (selectedItem) {
                setInstallRequest((prev) => ({
                  ...prev,
                  itemCommonCode: selectedItem.item_common_code || "",
                  itemCommonName: selectedItem.item_common_name || "",
                  customerName: selectedItem.customer_name || "",
                  customerCode: selectedItem.customer_code || "",
                }));
              }
            }}
          >
            <SelectLabel>품목</SelectLabel>
            <SelectTrigger>
              <SelectValueText>
                {installRequest.itemCommonName || "품목 선택"}
              </SelectValueText>
            </SelectTrigger>
            <SelectContent>
              {installItemList
                .filter((item) => item.item_common_name) // 빈 데이터 필터링
                .map((item) => (
                  <SelectItem
                    key={item.item_common_code}
                    item={item.item_common_name} // item을 value로 변경
                  >
                    {item.item_common_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </SelectRoot>
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
          <Button onClick={handleRequsetClick}>출고 요청</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
