import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../ui/button.jsx";
import {
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { toaster } from "../../ui/toaster.jsx";
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
import { Tooltip } from "../../ui/tooltip.jsx";

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
  const [customerAddressDetails, setCustomerAddressDetails] = useState("");
  const [customerPost, setCustomerPost] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [customerActive, setCustomerActive] = useState("true");

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
    setCustomerAddressDetails("");
    setCustomerPost("");
    setCustomerNote("");
    setCustomerActive(true);
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
      customerAddressDetails,
      customerNote,
      customerActive,
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
    <DialogRoot open={isOpen} onOpenChange={onCancel} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>협력 업체 등록</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Field orientation="horizontal" label={"협력 업체"}>
            <Input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Field>
          <Field label={"취급 품목"} orientation={"horizontal"}>
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
              <SelectTrigger>
                <SelectValueText>{itemName || "품목 선택"}</SelectValueText>
              </SelectTrigger>
              <SelectContent
                style={{
                  position: "absolute",
                  zIndex: 100,
                  width: "87%",
                  top: "40px",
                }}
              >
                {myItems.items.map((item) => (
                  <SelectItem key={item.value} item={item.label}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Field>
          <HStack>
            <Field orientation="horizontal" label={"대표자"}>
              <Input
                value={customerRep}
                onChange={(e) => setCustomerRep(e.target.value)}
              />
            </Field>
            <Field orientation="horizontal" label={"사업자 번호"}>
              <Input
                value={customerNo}
                onChange={(e) => setCustomerNo(e.target.value)}
              />
            </Field>
          </HStack>
          <HStack>
            <Field orientation="horizontal" label={"전화 번호"}>
              <Input
                value={customerTel}
                onChange={(e) => setCustomerTel(e.target.value)}
              />
            </Field>
            <Field orientation="horizontal" label={"팩스 번호"}>
              <Input
                value={customerFax}
                onChange={(e) => setCustomerFax(e.target.value)}
              />
            </Field>
          </HStack>
          <Field orientation="horizontal" label={"우편 번호"}>
            <Input
              value={customerPost}
              onChange={(e) => setCustomerPost(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal" label={"주소"}>
            <Input
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal" label={"상세 주소"}>
            <Input
              value={customerAddressDetails}
              onChange={(e) => setCustomerAddressDetails(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal" label={"비고"}>
            <Textarea
              placeholder="최대 50자"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              maxHeight={"100px"}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            {/* 취소 버튼 */}
            <Button variant={"outline"} onClick={handleCancel}>
              취소
            </Button>
          </DialogActionTrigger>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={100}
            closeDelay={100}
            disabled={isValid}
          >
            <Button onClick={handleSaveClick} disabled={!isValid}>
              등록
            </Button>
          </Tooltip>
          <DialogCloseTrigger />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default CustomerAdd;
