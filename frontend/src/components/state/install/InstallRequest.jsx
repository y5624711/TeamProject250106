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
import Select from "react-select";
import { Tooltip } from "../../ui/tooltip.jsx";

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
  const [installRequest, setInstallRequest] = useState(initialInstallRequest);
  const [installItemList, setInstallItemList] = useState([]);
  const [franchiseList, setFranchiseList] = useState([]);
  // const [localFranchiseName, setLocalFranchiseName] = useState("");
  // const [localFranchiseCode, setLocalFranchiseCode] = useState("");
  // const [selectedFranchise, setSelectedFranchise] = useState(null);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setInstallRequest(initialInstallRequest);
    onClose();
  };

  // 입력 변경 핸들러
  const handleInputChange = (field) => (e) => {
    setInstallRequest((prev) => ({
      ...prev,
      [field]: e.target ? e.target.value : e.value,
    }));
  };

  // 가맹점 변경 시 주소 자동 설정
  const handleFranchiseChange = (selectedOption) => {
    setInstallRequest((prev) => ({
      ...prev,
      franchiseName: selectedOption.label,
      franchiseCode: selectedOption.value,
      franchiseAddress: selectedOption.address || "",
    }));
  };

  // 가맹점 조회 시
  const onFranchiseClick = () => {
    if (selectedFranchise) {
      setInstallRequest((prev) => ({
        ...prev,
        franchiseName: selectedFranchise.label,
        franchiseCode: selectedFranchise.value,
        franchiseAddress: selectedFranchise.address || "", // 선택된 가맹점의 주소 설정
      }));
    }
  };

  // 데이터 로딩 (가맹점 목록, 품목 목록)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [franchiseRes, itemRes] = await Promise.all([
          axios.get("/api/install/franchise"),
          axios.get("/api/install/commonCode"),
        ]);

        setFranchiseList(
          franchiseRes.data.map(
            ({ franchise_code, franchise_name, franchise_address }) => ({
              value: franchise_code,
              label: franchise_name,
              address: franchise_address,
            }),
          ),
        );

        setInstallItemList(itemRes.data);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      }
    };

    fetchData();
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
              <Field orientation="horizontal" label="가맹점">
                <Select
                  options={franchiseList}
                  value={franchiseList.find(
                    (opt) => opt.value === installRequest.franchiseName,
                  )}
                  onChange={handleFranchiseChange}
                  placeholder="가맹점 선택"
                  isSearchable
                  styles={{
                    control: (base) => ({
                      ...base,
                      width: "470px",
                      height: "40px",
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 100,
                      width: "470px",
                    }),
                  }}
                />
                <Button onClick={onFranchiseClick}>조회</Button>
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
                    {installRequest.itemCommonName || "품목 선택"}
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
                value={installRequest.franchiseAddress}
                onChange={handleInputChange("franchiseAddress")}
              />
            </Field>
            <HStack>
              <Field label="요청자" orientation="horizontal">
                <Input value={name} />
              </Field>
              <Field label="사번" orientation="horizontal">
                <Input value={id} />
              </Field>
            </HStack>
            <Field label="담당 업체" orientation="horizontal">
              <Input readOnly value={installRequest.customerName} />
            </Field>
            <Field label="비고" orientation="horizontal">
              <Textarea
                value={installRequest.installRequestNote}
                placeholder="최대 50자"
                onChange={handleInputChange("installRequestNote")}
                maxHeight={"100px"}
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
          <Tooltip
            content="입력을 완료해주세요."
            disabled={isValid}
            openDelay={100}
            closeDelay={100}
          >
            <Button onClick={handleRequestClick} disabled={!isValid}>
              요청
            </Button>
          </Tooltip>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
