import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../ui/button.jsx";
import {
  Box,
  createListCollection,
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
import { PhoneInput } from "../../tool/masking/PhoneInput.jsx";
import { CustomerNoInput } from "../../tool/masking/CustomerNoInput.jsx";
import { CorporateNoInput } from "../../tool/masking/CorporateNoInput.jsx";
import { SpacedLabel } from "../../tool/label/SpaceLabel.jsx";

function CustomerAdd({ isOpen, onCancel, onSave, customerList }) {
  const [customerName, setCustomerName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCodeList, setItemCodeList] = useState([]);
  const [customerRep, setCustomerRep] = useState("");
  const [industry, setIndustry] = useState("");
  const [corporateNo, setCorporateNo] = useState("");
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
      // console.log("호출", itemCodeList);
    });
  }, [customerList]);

  const resetState = () => {
    setCustomerName("");
    setItemCode("");
    setItemName("");
    setIndustry("");
    setCustomerRep("");
    setCorporateNo("");
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
      customerName,
      customerRep,
      itemCode,
      industry,
      corporateNo,
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

  const isValid =
    customerName &&
    customerRep &&
    itemCode &&
    customerNo &&
    customerTel &&
    customerPost &&
    customerAddress;

  return (
    <DialogRoot open={isOpen} onOpenChange={handleCancel} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>협력 업체 등록</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          css={{ "--field-label-width": "85px" }}
        >
          <Field
            orientation="horizontal"
            label={<SpacedLabel text="협력 업체" req />}
            required
          >
            <Input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Field>
          <Box display="flex" gap={5}>
            <Field
              label={<SpacedLabel text="취급 품목" req />}
              orientation={"horizontal"}
              required
            >
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
                    width: "70%",
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
            <Field
              orientation="horizontal"
              label={<SpacedLabel text="업종" req />}
              required
            >
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </Field>
          </Box>
          <Field
            orientation="horizontal"
            label={<SpacedLabel text="대표자" req />}
            required
          >
            <Input
              value={customerRep}
              onChange={(e) => setCustomerRep(e.target.value)}
            />
          </Field>
          <Box display={"flex"} gap={5}>
            <Field
              orientation="horizontal"
              label={<SpacedLabel text="사업자 번호" req />}
              required
            >
              <CustomerNoInput value={customerNo} onChange={setCustomerNo} />
            </Field>
            <Field
              orientation="horizontal"
              label={<SpacedLabel text="법인 번호" req />}
              required
            >
              <CorporateNoInput value={corporateNo} onChange={setCorporateNo} />
            </Field>
          </Box>
          <Box display="flex" gap={5}>
            <Field
              orientation="horizontal"
              label={<SpacedLabel text="전화번호" req />}
              required
            >
              <PhoneInput value={customerTel} onChange={setCustomerTel} />
            </Field>
            <Field orientation="horizontal" label={<SpacedLabel text="팩스" />}>
              <PhoneInput value={customerFax} onChange={setCustomerFax} />
            </Field>
          </Box>
          <Field
            orientation="horizontal"
            label={<SpacedLabel text="우편번호" req />}
            required
          >
            <Input
              value={customerPost}
              onChange={(e) => setCustomerPost(e.target.value)}
            />
          </Field>
          <Field
            orientation="horizontal"
            label={<SpacedLabel text="주소" req />}
            required
          >
            <Input
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </Field>
          <Field
            orientation="horizontal"
            label={<SpacedLabel text="상세 주소" />}
          >
            <Input
              value={customerAddressDetails}
              onChange={(e) => setCustomerAddressDetails(e.target.value)}
            />
          </Field>
          <Field orientation="horizontal" label={<SpacedLabel text="비고" />}>
            <Textarea
              placeholder="최대 50자"
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              style={{ maxHeight: "100px", overflowY: "auto" }}
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
