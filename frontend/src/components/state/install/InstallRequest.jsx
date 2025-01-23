import React, { useContext, useEffect, useState } from "react";
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
  Box,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { toaster } from "../../ui/toaster.jsx";

export function InstallRequest({ isOpen, onClose, setChange }) {
  const { id, name } = useContext(AuthenticationContext);
  const initialInstallRequest = {
    franchiseName: "",
    itemCommonName: "",
    installRequestAmount: "",
    franchiseAddress: "",
    customerName: "",
    installRequestNote: "",
  };
  const [installItemList, setInstallItemList] = useState([]);
  const [installFranchiseList, setInstallFranchiseList] = useState([]);
  const [installRequest, setInstallRequest] = useState(initialInstallRequest);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setInstallRequest(initialInstallRequest);
    onClose();
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setInstallRequest((prev) => ({ ...prev, [field]: value }));
  };

  // 협력업체 정보 가져오기
  useEffect(() => {
    axios
      .get("api/install/franchise")
      .then((res) => setInstallFranchiseList(res.data))
      .catch((error) => console.log("협력업체 정보 오류:", error));
  }, []);

  // 사용중인 품목명, 품목 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/install/commonCode")
      .then((res) => setInstallItemList(res.data))
      .catch((error) => console.error("데이터 로딩 중 오류 발생:", error));
  }, []);

  // 설치 요청하기
  const handleRequestClick = () => {
    axios
      .post("/api/install/request", installRequest)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setChange((prev) => !prev);
        handleClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
    console.log(installRequest);
  };

  // 유효성 검증
  const isValid =
    installRequest.franchiseName &&
    installRequest.itemCommonName &&
    installRequest.installRequestAmount &&
    installRequest.installRequestAmount <= installRequest.countItem;

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>설치 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={5}>
            <HStack>
              <Field label="가맹점" orientation="horizontal">
                <SelectRoot
                  onValueChange={(e) => {
                    const selectedFranchise = installFranchiseList.find(
                      (franchise) => franchise.franchise_name === e.value[0],
                    );
                    if (selectedFranchise) {
                      setInstallRequest((prev) => ({
                        ...prev,
                        franchiseCode: selectedFranchise.franchise_code || "",
                        franchiseName: selectedFranchise.franchise_name || "",
                        franchiseAddress:
                          selectedFranchise.franchise_address || "",
                      }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValueText>
                      {installRequest.franchiseName}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      width: "85%",
                      top: "40px",
                      position: "absolute",
                    }}
                  >
                    {installFranchiseList
                      .filter((franchise) => franchise.franchise_name) // 빈 데이터 필터링
                      .map((franchise) => (
                        <SelectItem
                          key={franchise.franchise_name}
                          item={franchise.franchise_name} // item을 value로 변경
                        >
                          {franchise.franchise_name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </HStack>

            <Field label="품목" orientation="horizontal">
              <SelectRoot
                onValueChange={(e) => {
                  const selectedItem = installItemList.find(
                    (item) => item.item_common_name === e.value[0],
                  );
                  if (selectedItem) {
                    setInstallRequest((prev) => ({
                      ...prev,
                      itemCommonCode: selectedItem.item_common_code || "",
                      itemCommonName: selectedItem.item_common_name || "",
                      customerName: selectedItem.customer_name || "",
                      customerCode: selectedItem.customer_code || "",
                      countItem: selectedItem.count_item,
                    }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValueText>
                    {installRequest.itemCommonName}
                  </SelectValueText>
                </SelectTrigger>
                <SelectContent
                  style={{
                    width: "85%",
                    top: "40px",
                    position: "absolute",
                  }}
                >
                  {installItemList
                    .filter((item) => item.item_common_name) // 빈 데이터 필터링
                    .map((item) => (
                      <SelectItem
                        key={item.item_common_code}
                        item={item.item_common_name}
                      >
                        {item.item_common_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </SelectRoot>
            </Field>
            <Box display="flex" justifyContent="flex-end">
              <Heading size="xs" color="gray.500" my={-3}>
                가능한 수량:{" "}
                {installRequest.countItem > 0 ? installRequest.countItem : 0}
              </Heading>
            </Box>
            <Field label="수량" orientation="horizontal">
              <Input
                type="number"
                value={installRequest.installRequestAmount}
                onChange={handleInputChange("installRequestAmount")}
                min="1"
                max={installRequest.countItem}
              />
            </Field>
            {installRequest.installRequestAmount > installRequest.countItem && (
              <Box display="flex">
                <Heading size="xs" color="red.500" my={-3} ml={"90px"}>
                  설치 요청 수량이 많습니다.{" "}
                </Heading>
              </Box>
            )}
            <Field label="가맹점 주소" orientation="horizontal">
              <Input
                placeholder="가맹점 주소"
                value={installRequest.franchiseAddress}
                onChange={handleInputChange("franchiseAddress")}
              />
            </Field>
            <HStack>
              <Field label="신청자" orientation="horizontal">
                <Input placeholder="신청자 사번" value={name} />
              </Field>
              <Field label="사번" orientation="horizontal">
                <Input placeholder="신청자" value={id} />
              </Field>
            </HStack>
            <Field label="담당 업체" orientation="horizontal">
              <Input
                readOnly
                value={installRequest.customerName}
                onChange={handleInputChange("customerName")}
              />
            </Field>
            <Field label="비고" orientation="horizontal">
              <Textarea
                value={installRequest.installRequestNote}
                placeholder="최대 50자"
                onChange={handleInputChange("installRequestNote")}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleRequestClick} disabled={!isValid}>
            요청
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
