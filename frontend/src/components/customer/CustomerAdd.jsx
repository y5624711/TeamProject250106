import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button.jsx";
import {
  createListCollection,
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import { toaster } from "../ui/toaster.jsx";

function CustomerAdd({ isOpen, onCancel, onSave }) {
  const [customerName, setCustomerName] = useState("");
  // const [customerCode, setCustomerCode] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCodeList, setItemCodeList] = useState([]);
  const [customerRep, setCustomerRep] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [customerTel, setCustomerTel] = useState("");
  const [customerFax, setCustomerFax] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [customerPost, setCustomerPost] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  // 물품 코드 불러오기
  useEffect(() => {
    axios.get("/api/customer/itemCode/list").then((res) => {
      setItemCodeList(res.data);
    });
  }, []);

  const resetState = () => {
    setCustomerName("");
    // setCustomerCode("");
    setItemCode("");
    setItemName("");
    setCustomerRep("");
    setCustomerNo("");
    setCustomerTel("");
    setCustomerFax("");
    setCustomerAddress("");
    setCustomerAddressDetail("");
    setCustomerPost("");
    setCustomerNote("");
  };

  const handleSaveClick = () => {
    if (!isValid) {
      toaster.create({
        description: "모든 필수 입력값을 입력해 주세요.",
        type: "error",
      });
      return;
    }
    const customerData = {
      // customerCode,
      customerName,
      customerRep,
      itemCode,
      customerNo,
      customerTel,
      customerFax,
      customerPost,
      customerAddress,
      customerAddressDetail,
      customerNote,
    };
    onSave(customerData);
    resetState();
  };

  const handleCancel = () => {
    resetState();
    onCancel();
  };
  // console.log("itemCodeList", itemCodeList);

  const myItems = createListCollection({
    items: itemCodeList.map((itemCode) => {
      return {
        label: itemCode.commonCodeName,
        value: itemCode.commonCode,
      };
    }),
  });
  // console.log("myItems", myItems);

  // const type = createListCollection({
  //   items: [
  //     { label: "업체명", value: "customerName" },
  //     { label: "취급 물품", value: "itemName" },
  //   ],
  // });

  const isValid =
    customerName &&
    customerRep &&
    itemCode &&
    customerNo &&
    customerTel &&
    customerPost &&
    customerAddress;

  return (
    <DialogRoot open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        maxW="600px" // 최대 너비 설정
        margin="auto" // 중앙 정렬
        style={{
          position: "absolute", // absolute로 변경하여 중앙에 고정되도록 설정
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // 정확히 중앙에 위치하도록 transform 사용
          zIndex: 9999, // 다른 콘텐츠 위에 표시
          maxHeight: "90vh", // 최대 높이 설정 (스크롤이 생기도록)
          overflowY: "auto", // 내용이 많을 경우 스크롤
        }}
      >
        <DialogHeader>
          <DialogTitle>협력 업체 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={5}>
            {/*<Field label={"협력 업체 코드(차후 자동생성)"}>*/}
            {/*  <Input*/}
            {/*    required*/}
            {/*    value={customerCode}*/}
            {/*    onChange={(e) => setCustomerCode(e.target.value)}*/}
            {/*  />*/}
            {/*</Field>*/}
            <Field label={"협력 업체"}>
              <Input
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Field>
            <Field label={"대표자"}>
              <Input
                value={customerRep}
                onChange={(e) => setCustomerRep(e.target.value)}
              />
            </Field>
            <SelectRoot
              onValueChange={(e) => {
                setItemName(e.value);
                const selectedItem = itemCodeList.find(
                  (item) => item.commonCodeName == e.value,
                );
                // console.log("내부", selectedItem);
                if (selectedItem) {
                  setItemCode(selectedItem.commonCode); // 선택된 품목 코드 설정
                }
              }}
            >
              <SelectLabel>취급 품목</SelectLabel>
              <SelectTrigger>
                <SelectValueText>{itemName || "품목 선택"}</SelectValueText>
              </SelectTrigger>
              <SelectContent>
                {myItems.items.map((item) => (
                  <SelectItem key={item.value} item={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Field label={"사업자 번호"}>
              <Input
                value={customerNo}
                onChange={(e) => setCustomerNo(e.target.value)}
              />
            </Field>
            <Field label={"전화 번호"}>
              <Input
                value={customerTel}
                onChange={(e) => setCustomerTel(e.target.value)}
              />
            </Field>
            <Field label={"팩스 번호"}>
              <Input
                value={customerFax}
                onChange={(e) => setCustomerFax(e.target.value)}
              />
            </Field>
            <Field label={"우편 번호"}>
              <Input
                value={customerPost}
                onChange={(e) => setCustomerPost(e.target.value)}
              />
            </Field>
            <Field label={"주소"}>
              <Input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
              />
            </Field>
            <Field label={"상세 주소"}>
              <Input
                value={customerAddressDetail}
                onChange={(e) => setCustomerAddressDetail(e.target.value)}
              />
            </Field>
            <Field label={"비고"}>
              <Input
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            {/* 취소 버튼 */}
            <Button variant={"outline"} onClick={handleCancel}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button onClick={handleSaveClick}>등록</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default CustomerAdd;
